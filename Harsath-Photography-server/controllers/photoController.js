const { validationResult } = require('express-validator');
const PhotoService = require('../services/photoService');
const { deleteImage } = require('../config/cloudinary');

class PhotoController {
  
  /**
   * Upload a new photo
   */
  static async uploadPhoto(req, res) {
    try {
      // Validate authentication
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not authenticated'
        });
      }

      // Check admin role
      if (req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Admin access required'
        });
      }

      // Validate file upload
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
        const publicId = req.file.public_id || req.file.filename;
        if (publicId) {
          await deleteImage(publicId);
        }
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      // Create photo using service
      const photo = await PhotoService.createPhoto(req.body, req.file, req.user._id);

      res.status(201).json({
        success: true,
        message: 'Photo uploaded successfully',
        photo
      });

    } catch (error) {
      // Delete uploaded file if there's an error
      if (req.file) {
        const publicId = req.file.public_id || req.file.filename;
        if (publicId) {
          try {
            await deleteImage(publicId);
          } catch (deleteError) {
            console.error('Failed to delete file:', deleteError.message);
          }
        }
      }

      console.error('Photo upload error:', error);

      res.status(500).json({
        success: false,
        message: 'Error uploading photo',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }

  /**
   * Get all photos with filtering and pagination
   */
  static async getPhotos(req, res) {
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

      const result = await PhotoService.getPhotos(req.query, req.user);

      res.json({
        success: true,
        ...result
      });

    } catch (error) {
      console.error('Get photos error:', error);

      res.status(500).json({
        success: false,
        message: 'Error fetching photos',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }

  /**
   * Get a single photo by ID
   */
  static async getPhotoById(req, res) {
    try {
      const { id } = req.params;
      const photo = await PhotoService.getPhotoById(id, req.user);

      res.json({
        success: true,
        photo
      });

    } catch (error) {
      console.error('Get photo by ID error:', error);

      if (error.message === 'Photo not found') {
        return res.status(404).json({
          success: false,
          message: 'Photo not found'
        });
      }

      if (error.message === 'Access denied') {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error fetching photo',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }

  /**
   * Update a photo
   */
  static async updatePhoto(req, res) {
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

      const { id } = req.params;
      const photo = await PhotoService.updatePhoto(id, req.body, req.user);

      res.json({
        success: true,
        message: 'Photo updated successfully',
        photo
      });

    } catch (error) {
      console.error('Update photo error:', error);

      if (error.message === 'Photo not found') {
        return res.status(404).json({
          success: false,
          message: 'Photo not found'
        });
      }

      if (error.message === 'Access denied') {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error updating photo',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }

  /**
   * Delete a photo
   */
  static async deletePhoto(req, res) {
    try {
      const { id } = req.params;
      const result = await PhotoService.deletePhoto(id, req.user);

      res.json({
        success: true,
        ...result
      });

    } catch (error) {
      console.error('Delete photo error:', error);

      if (error.message === 'Photo not found') {
        return res.status(404).json({
          success: false,
          message: 'Photo not found'
        });
      }

      if (error.message === 'Access denied') {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error deleting photo',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }

  /**
   * Toggle photo like
   */
  static async toggleLike(req, res) {
    try {
      const { id } = req.params;
      const result = await PhotoService.toggleLike(id, req.user._id);

      res.json({
        success: true,
        ...result
      });

    } catch (error) {
      console.error('Toggle like error:', error);

      if (error.message === 'Photo not found') {
        return res.status(404).json({
          success: false,
          message: 'Photo not found'
        });
      }

      if (error.message === 'Cannot like private photos') {
        return res.status(403).json({
          success: false,
          message: 'Cannot like private photos'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error toggling like',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }
}

module.exports = PhotoController;
