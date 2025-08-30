const express = require('express');
const { authenticateToken, requireAdmin, optionalAuth } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');
const PhotoController = require('../controllers/photoController');
const { 
  uploadPhotoValidation, 
  getPhotosValidation, 
  updatePhotoValidation 
} = require('../validators/photoValidator');

const router = express.Router();

// @route   POST /api/photos/upload
// @desc    Upload a new photo
// @access  Private (Admin only)
router.post('/upload', 
  authenticateToken, 
  requireAdmin, 
  upload.single('photo'), 
  uploadPhotoValidation,
  PhotoController.uploadPhoto
);

// @route   GET /api/photos
// @desc    Get all photos with filtering and pagination
// @access  Public
router.get('/', 
  optionalAuth, 
  getPhotosValidation,
  PhotoController.getPhotos
);

// @route   GET /api/photos/:id
// @desc    Get a single photo by ID
// @access  Public (respects privacy settings)
router.get('/:id', 
  optionalAuth, 
  PhotoController.getPhotoById
);

// @route   PUT /api/photos/:id
// @desc    Update a photo
// @access  Private (Admin or photo owner)
router.put('/:id', 
  authenticateToken, 
  updatePhotoValidation,
  PhotoController.updatePhoto
);

// @route   DELETE /api/photos/:id
// @desc    Delete a photo
// @access  Private (Admin or photo owner)
router.delete('/:id', 
  authenticateToken, 
  PhotoController.deletePhoto
);

// @route   POST /api/photos/:id/like
// @desc    Toggle like on a photo
// @access  Private
router.post('/:id/like', 
  authenticateToken, 
  PhotoController.toggleLike
);

module.exports = router;
