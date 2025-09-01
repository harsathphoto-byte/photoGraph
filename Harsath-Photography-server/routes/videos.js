const express = require('express');
const { authenticateToken, requireAdmin, optionalAuth } = require('../middleware/auth');
const { uploadVideo, uploadMedia } = require('../config/cloudinary');
const VideoController = require('../controllers/videoController');
const { 
  uploadVideoValidation, 
  getVideosValidation, 
  updateVideoValidation 
} = require('../validators/videoValidator');

const router = express.Router();

// @route   POST /api/videos/upload
// @desc    Upload a new video
// @access  Private (Admin only)
router.post('/upload', 
  authenticateToken, 
  requireAdmin, 
  uploadVideo.single('video'), 
  uploadVideoValidation,
  VideoController.uploadVideo
);

// @route   POST /api/videos/upload-media
// @desc    Upload media (image or video)
// @access  Private (Admin only)
router.post('/upload-media', 
  authenticateToken, 
  requireAdmin, 
  uploadMedia.single('media'), 
  VideoController.uploadMedia
);

// @route   GET /api/videos
// @desc    Get all videos with filtering and pagination
// @access  Public
router.get('/', 
  optionalAuth, 
  getVideosValidation,
  VideoController.getVideos
);

// @route   GET /api/videos/:id
// @desc    Get single video by ID
// @access  Public
router.get('/:id', 
  optionalAuth,
  VideoController.getVideoById
);

// @route   PUT /api/videos/:id
// @desc    Update video information
// @access  Private (Admin only)
router.put('/:id', 
  authenticateToken, 
  requireAdmin, 
  updateVideoValidation,
  VideoController.updateVideo
);

// @route   DELETE /api/videos/:id
// @desc    Delete video
// @access  Private (Admin only)
router.delete('/:id', 
  authenticateToken, 
  requireAdmin,
  VideoController.deleteVideo
);

// @route   POST /api/videos/:id/toggle-privacy
// @desc    Toggle video privacy status
// @access  Private (Admin only)
router.post('/:id/toggle-privacy', 
  authenticateToken, 
  requireAdmin,
  VideoController.toggleVideoPrivacy
);

// @route   GET /api/videos/category/:category
// @desc    Get videos by category
// @access  Public
router.get('/category/:category', 
  optionalAuth,
  VideoController.getVideosByCategory
);

module.exports = router;
