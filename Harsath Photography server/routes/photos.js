const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Photo = require('../models/Photo');
const { authenticateToken, requireAdmin, optionalAuth } = require('../middleware/auth');
const { upload, deleteImage, generateTransformations } = require('../config/cloudinary');

const router = express.Router();

// @route   POST /api/photos/upload
// @desc    Upload a new photo
// @access  Private (Admin only)
router.post('/upload', authenticateToken, requireAdmin, upload.single('photo'), [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('category')
    .isIn(['wedding', 'portrait', 'event', 'nature', 'street', 'fashion', 'commercial', 'other'])
    .withMessage('Invalid category'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('isPublic')
    .optional()
    .isBoolean()
    .withMessage('isPublic must be a boolean'),
  body('location.name')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Location name cannot exceed 100 characters')
], async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No photo file provided'
      });
    }

    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Delete uploaded file if validation fails
      await deleteImage(req.file.public_id);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      title,
      description,
      category,
      tags,
      isPublic,
      location,
      capturedAt
    } = req.body;

    // Create photo document
    const photo = new Photo({
      title,
      description,
      cloudinaryUrl: req.file.secure_url,
      cloudinaryPublicId: req.file.public_id,
      category,
      tags: tags || [],
      uploadedBy: req.user._id,
      isPublic: isPublic !== undefined ? isPublic : true,
      metadata: {
        width: req.file.width,
        height: req.file.height,
        format: req.file.format,
        size: req.file.bytes
      },
      location: location || {},
      capturedAt: capturedAt ? new Date(capturedAt) : new Date()
    });

    await photo.save();

    // Populate user data
    await photo.populate('uploadedBy', 'username firstName lastName');

    // Generate transformation URLs
    const transformations = generateTransformations(req.file.public_id);

    res.status(201).json({
      success: true,
      message: 'Photo uploaded successfully',
      photo: {
        ...photo.toJSON(),
        transformations
      }
    });

  } catch (error) {
    // Delete uploaded file if there's an error
    if (req.file) {
      await deleteImage(req.file.public_id);
    }

    console.error('Photo upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading photo',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   GET /api/photos
// @desc    Get all photos with filtering and pagination
// @access  Public
router.get('/', optionalAuth, [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
  query('category')
    .optional()
    .custom((value) => {
      if (value === '' || value === undefined || value === null) return true;
      return ['wedding', 'portrait', 'event', 'nature', 'street', 'fashion', 'commercial', 'other'].includes(value);
    })
    .withMessage('Invalid category'),
  query('sort')
    .optional()
    .isIn(['newest', 'oldest', 'popular', 'title'])
    .withMessage('Invalid sort option')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      page = 1,
      limit = 12,
      category,
      tags,
      search,
      sort = 'newest',
      featured,
      uploadedBy
    } = req.query;

    // Build filter
    const filter = {};

    // Only show public photos unless user is authenticated and owns them
    if (!req.user) {
      filter.isPublic = true;
    } else if (req.user.role !== 'admin') {
      filter.$or = [
        { isPublic: true },
        { uploadedBy: req.user._id }
      ];
    }

    if (category) filter.category = category;
    if (tags) filter.tags = { $in: tags.split(',') };
    if (featured !== undefined) filter.isFeatured = featured === 'true';
    if (uploadedBy) filter.uploadedBy = uploadedBy;

    if (search) {
      filter.$text = { $search: search };
    }

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
    const photosWithTransformations = photos.map(photo => ({
      ...photo,
      transformations: generateTransformations(photo.cloudinaryPublicId)
    }));

    res.json({
      success: true,
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
    console.error('Photos fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching photos'
    });
  }
});

// @route   GET /api/photos/:id
// @desc    Get a single photo by ID
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id)
      .populate('uploadedBy', 'username firstName lastName')
      .populate('comments.user', 'username firstName lastName')
      .populate('likes.user', 'username firstName lastName');

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: 'Photo not found'
      });
    }

    // Check if user can view this photo
    if (!photo.isPublic && (!req.user || (req.user._id.toString() !== photo.uploadedBy._id.toString() && req.user.role !== 'admin'))) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Increment view count (only if not the owner)
    if (!req.user || req.user._id.toString() !== photo.uploadedBy._id.toString()) {
      photo.views += 1;
      await photo.save();
    }

    // Generate transformations
    const transformations = generateTransformations(photo.cloudinaryPublicId);

    res.json({
      success: true,
      photo: {
        ...photo.toJSON(),
        transformations
      }
    });

  } catch (error) {
    console.error('Photo fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching photo'
    });
  }
});

// @route   PUT /api/photos/:id
// @desc    Update a photo
// @access  Private (Owner/Admin)
router.put('/:id', authenticateToken, [
  body('title')
    .optional()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('category')
    .optional()
    .isIn(['wedding', 'portrait', 'event', 'nature', 'street', 'fashion', 'commercial', 'other'])
    .withMessage('Invalid category'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const photo = await Photo.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: 'Photo not found'
      });
    }

    // Check if user can edit this photo
    if (req.user._id.toString() !== photo.uploadedBy.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const {
      title,
      description,
      category,
      tags,
      isPublic,
      isFeatured,
      location
    } = req.body;

    // Update fields
    if (title !== undefined) photo.title = title;
    if (description !== undefined) photo.description = description;
    if (category !== undefined) photo.category = category;
    if (tags !== undefined) photo.tags = tags;
    if (isPublic !== undefined) photo.isPublic = isPublic;
    if (location !== undefined) photo.location = location;

    // Only admin can set featured
    if (isFeatured !== undefined && req.user.role === 'admin') {
      photo.isFeatured = isFeatured;
    }

    await photo.save();

    // Populate user data
    await photo.populate('uploadedBy', 'username firstName lastName');

    // Generate transformations
    const transformations = generateTransformations(photo.cloudinaryPublicId);

    res.json({
      success: true,
      message: 'Photo updated successfully',
      photo: {
        ...photo.toJSON(),
        transformations
      }
    });

  } catch (error) {
    console.error('Photo update error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating photo'
    });
  }
});

// @route   DELETE /api/photos/:id
// @desc    Delete a photo
// @access  Private (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: 'Photo not found'
      });
    }

    // Delete from Cloudinary
    await deleteImage(photo.cloudinaryPublicId);

    // Delete from database
    await Photo.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Photo deleted successfully'
    });

  } catch (error) {
    console.error('Photo delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting photo'
    });
  }
});

// @route   POST /api/photos/:id/like
// @desc    Like/unlike a photo
// @access  Private
router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: 'Photo not found'
      });
    }

    const existingLike = photo.likes.find(
      like => like.user.toString() === req.user._id.toString()
    );

    if (existingLike) {
      // Unlike
      photo.likes = photo.likes.filter(
        like => like.user.toString() !== req.user._id.toString()
      );
    } else {
      // Like
      photo.likes.push({ user: req.user._id });
    }

    await photo.save();

    res.json({
      success: true,
      message: existingLike ? 'Photo unliked' : 'Photo liked',
      isLiked: !existingLike,
      likeCount: photo.likes.length
    });

  } catch (error) {
    console.error('Photo like error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating like'
    });
  }
});

// @route   POST /api/photos/:id/comment
// @desc    Add a comment to a photo
// @access  Private
router.post('/:id/comment', authenticateToken, [
  body('text')
    .notEmpty()
    .withMessage('Comment text is required')
    .isLength({ max: 300 })
    .withMessage('Comment cannot exceed 300 characters')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const photo = await Photo.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: 'Photo not found'
      });
    }

    const { text } = req.body;

    photo.comments.push({
      user: req.user._id,
      text
    });

    await photo.save();

    // Populate the new comment
    await photo.populate('comments.user', 'username firstName lastName');

    const newComment = photo.comments[photo.comments.length - 1];

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      comment: newComment
    });

  } catch (error) {
    console.error('Comment add error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding comment'
    });
  }
});

module.exports = router;
