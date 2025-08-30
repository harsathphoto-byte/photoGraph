const express = require('express');
const { query } = require('express-validator');
const User = require('../models/User');
const Photo = require('../models/Photo');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users (Admin only)
// @access  Private (Admin)
router.get('/', authenticateToken, requireAdmin, [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
  query('role')
    .optional()
    .isIn(['admin', 'photographer', 'client'])
    .withMessage('Invalid role')
], async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      role,
      search,
      sort = 'newest'
    } = req.query;

    // Build filter
    const filter = {};
    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort
    let sortOption = {};
    switch (sort) {
      case 'oldest':
        sortOption = { createdAt: 1 };
        break;
      case 'name':
        sortOption = { firstName: 1, lastName: 1 };
        break;
      case 'lastLogin':
        sortOption = { lastLogin: -1 };
        break;
      default: // newest
        sortOption = { createdAt: -1 };
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const [users, total] = await Promise.all([
      User.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit))
        .select('-password'),
      User.countDocuments(filter)
    ]);

    res.json({
      success: true,
      users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalUsers: total,
        hasNext: skip + users.length < total,
        hasPrev: parseInt(page) > 1
      }
    });

  } catch (error) {
    console.error('Users fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users'
    });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private (Admin or self)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    // Check if user can access this profile
    if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user's photo statistics
    const photoStats = await Photo.aggregate([
      { $match: { uploadedBy: user._id } },
      {
        $group: {
          _id: null,
          totalPhotos: { $sum: 1 },
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: { $size: '$likes' } },
          totalComments: { $sum: { $size: '$comments' } }
        }
      }
    ]);

    const stats = photoStats.length > 0 ? photoStats[0] : {
      totalPhotos: 0,
      totalViews: 0,
      totalLikes: 0,
      totalComments: 0
    };

    res.json({
      success: true,
      user: {
        ...user.toJSON(),
        stats
      }
    });

  } catch (error) {
    console.error('User fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user'
    });
  }
});

// @route   PUT /api/users/:id/role
// @desc    Update user role (Admin only)
// @access  Private (Admin)
router.put('/:id/role', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { role } = req.body;

    if (!['admin', 'photographer', 'client'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role'
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent admin from changing their own role
    if (req.user._id.toString() === user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot change your own role'
      });
    }

    user.role = role;
    await user.save();

    res.json({
      success: true,
      message: 'User role updated successfully',
      user: user.toJSON()
    });

  } catch (error) {
    console.error('Role update error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user role'
    });
  }
});

// @route   DELETE /api/users/:id
// @desc    Delete user (Admin only)
// @access  Private (Admin)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent admin from deleting themselves
    if (req.user._id.toString() === user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own account'
      });
    }

    // Get user's photos to delete from Cloudinary
    const userPhotos = await Photo.find({ uploadedBy: user._id });

    // Delete user's photos from Cloudinary
    const { deleteImage } = require('../config/cloudinary');
    for (const photo of userPhotos) {
      try {
        await deleteImage(photo.cloudinaryPublicId);
      } catch (error) {
        console.error(`Error deleting photo ${photo._id}:`, error);
      }
    }

    // Delete user's photos from database
    await Photo.deleteMany({ uploadedBy: user._id });

    // Delete user
    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'User and all associated data deleted successfully'
    });

  } catch (error) {
    console.error('User delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting user'
    });
  }
});

// @route   GET /api/users/:id/photos
// @desc    Get user's photos
// @access  Public
router.get('/:id/photos', [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50')
], async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      sort = 'newest'
    } = req.query;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Build filter
    const filter = { uploadedBy: user._id, isPublic: true };
    if (category) filter.category = category;

    // Build sort
    let sortOption = {};
    switch (sort) {
      case 'oldest':
        sortOption = { createdAt: 1 };
        break;
      case 'popular':
        sortOption = { views: -1, 'likes.length': -1 };
        break;
      case 'title':
        sortOption = { title: 1 };
        break;
      default: // newest
        sortOption = { createdAt: -1 };
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const [photos, total] = await Promise.all([
      Photo.find(filter)
        .populate('uploadedBy', 'username firstName lastName')
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Photo.countDocuments(filter)
    ]);

    // Add transformations to each photo
    const { generateTransformations } = require('../config/cloudinary');
    const photosWithTransformations = photos.map(photo => ({
      ...photo,
      transformations: generateTransformations(photo.cloudinaryPublicId)
    }));

    res.json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
      },
      photos: photosWithTransformations,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalPhotos: total,
        hasNext: skip + photos.length < total,
        hasPrev: parseInt(page) > 1
      }
    });

  } catch (error) {
    console.error('User photos fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user photos'
    });
  }
});

module.exports = router;
