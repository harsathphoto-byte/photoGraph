const Video = require('../models/Video');
const { 
  deleteVideo, 
  getVideoDetails, 
  generateVideoTransformations 
} = require('../config/cloudinary');
const { validationResult } = require('express-validator');

class VideoController {
  // Upload a new video
  static async uploadVideo(req, res) {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No video file provided'
        });
      }

      const { title, description, category, tags, isPrivate } = req.body;

      // Parse tags if it's a string
      let parsedTags = [];
      if (tags) {
        parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
      }

      // Create video document
      const video = new Video({
        title: title || `Video ${Date.now()}`,
        description: description || '',
        category: category || 'general',
        tags: parsedTags,
        cloudinaryId: req.file.filename,
        url: req.file.path,
        fileSize: req.file.size,
        format: req.file.format,
        uploadedBy: req.user.userId,
        isPrivate: isPrivate === 'true' || isPrivate === true
      });

      await video.save();

      // Generate transformation URLs
      const transformations = generateVideoTransformations(req.file.filename);

      res.status(201).json({
        success: true,
        message: 'Video uploaded successfully',
        data: {
          video: {
            ...video.toObject(),
            transformations
          }
        }
      });

    } catch (error) {
      console.error('Video upload error:', error);
      
      // If video was uploaded to Cloudinary but DB save failed, clean up
      if (req.file && req.file.filename) {
        try {
          await deleteVideo(req.file.filename);
        } catch (cleanupError) {
          console.error('Failed to cleanup video after error:', cleanupError);
        }
      }

      res.status(500).json({
        success: false,
        message: 'Failed to upload video',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }

  // Upload media (image or video)
  static async uploadMedia(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No media file provided'
        });
      }

      const { title, description, category, tags, isPrivate } = req.body;
      const isVideo = req.file.mimetype.startsWith('video/');

      // Parse tags if it's a string
      let parsedTags = [];
      if (tags) {
        parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
      }

      let mediaDocument;

      if (isVideo) {
        // Create video document
        const Video = require('../models/Video');
        mediaDocument = new Video({
          title: title || `Video ${Date.now()}`,
          description: description || '',
          category: category || 'general',
          tags: parsedTags,
          cloudinaryId: req.file.filename,
          url: req.file.path,
          fileSize: req.file.size,
          format: req.file.format,
          uploadedBy: req.user.userId,
          isPrivate: isPrivate === 'true' || isPrivate === true
        });
      } else {
        // Create photo document
        const Photo = require('../models/Photo');
        mediaDocument = new Photo({
          title: title || `Photo ${Date.now()}`,
          description: description || '',
          category: category || 'general',
          tags: parsedTags,
          cloudinaryId: req.file.filename,
          url: req.file.path,
          fileSize: req.file.size,
          format: req.file.format,
          uploadedBy: req.user.userId,
          isPrivate: isPrivate === 'true' || isPrivate === true
        });
      }

      await mediaDocument.save();

      // Generate transformation URLs
      const transformations = isVideo 
        ? generateVideoTransformations(req.file.filename)
        : require('../config/cloudinary').generateImageTransformations(req.file.filename);

      res.status(201).json({
        success: true,
        message: `${isVideo ? 'Video' : 'Photo'} uploaded successfully`,
        data: {
          [isVideo ? 'video' : 'photo']: {
            ...mediaDocument.toObject(),
            transformations
          },
          type: isVideo ? 'video' : 'photo'
        }
      });

    } catch (error) {
      console.error('Media upload error:', error);
      
      // If media was uploaded to Cloudinary but DB save failed, clean up
      if (req.file && req.file.filename) {
        try {
          const isVideo = req.file.mimetype.startsWith('video/');
          if (isVideo) {
            await deleteVideo(req.file.filename);
          } else {
            await require('../config/cloudinary').deleteImage(req.file.filename);
          }
        } catch (cleanupError) {
          console.error('Failed to cleanup media after error:', cleanupError);
        }
      }

      res.status(500).json({
        success: false,
        message: 'Failed to upload media',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }

  // Get all videos with filtering and pagination
  static async getVideos(req, res) {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { 
        category, 
        tags, 
        page = 1, 
        limit = 12, 
        sortBy = 'createdAt', 
        sortOrder = 'desc',
        search 
      } = req.query;

      // Build filter object
      const filter = {};

      // Only show public videos unless user is admin
      if (!req.user || req.user.role !== 'admin') {
        filter.isPrivate = false;
      }

      if (category && category !== 'all') {
        filter.category = category;
      }

      if (tags) {
        filter.tags = { $in: tags.split(',') };
      }

      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { tags: { $regex: search, $options: 'i' } }
        ];
      }

      // Calculate pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);

      // Sort object
      const sort = {};
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

      // Execute query with pagination
      const [videos, totalCount] = await Promise.all([
        Video.find(filter)
          .sort(sort)
          .skip(skip)
          .limit(parseInt(limit))
          .populate('uploadedBy', 'username email')
          .lean(),
        Video.countDocuments(filter)
      ]);

      // Add transformation URLs to each video
      const videosWithTransformations = videos.map(video => ({
        ...video,
        transformations: generateVideoTransformations(video.cloudinaryId)
      }));

      const totalPages = Math.ceil(totalCount / parseInt(limit));

      res.json({
        success: true,
        data: {
          videos: videosWithTransformations,
          pagination: {
            currentPage: parseInt(page),
            totalPages,
            totalCount,
            hasNextPage: parseInt(page) < totalPages,
            hasPrevPage: parseInt(page) > 1
          }
        }
      });

    } catch (error) {
      console.error('Get videos error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch videos',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }

  // Get single video by ID
  static async getVideoById(req, res) {
    try {
      const video = await Video.findById(req.params.id)
        .populate('uploadedBy', 'username email');

      if (!video) {
        return res.status(404).json({
          success: false,
          message: 'Video not found'
        });
      }

      // Check if video is private and user is not admin
      if (video.isPrivate && (!req.user || req.user.role !== 'admin')) {
        return res.status(403).json({
          success: false,
          message: 'Access denied to private video'
        });
      }

      // Add transformation URLs
      const transformations = generateVideoTransformations(video.cloudinaryId);

      res.json({
        success: true,
        data: {
          video: {
            ...video.toObject(),
            transformations
          }
        }
      });

    } catch (error) {
      console.error('Get video by ID error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch video',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }

  // Update video information
  static async updateVideo(req, res) {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { title, description, category, tags, isPrivate } = req.body;

      const video = await Video.findById(req.params.id);

      if (!video) {
        return res.status(404).json({
          success: false,
          message: 'Video not found'
        });
      }

      // Update fields
      if (title !== undefined) video.title = title;
      if (description !== undefined) video.description = description;
      if (category !== undefined) video.category = category;
      if (tags !== undefined) video.tags = tags;
      if (isPrivate !== undefined) video.isPrivate = isPrivate;

      video.updatedAt = new Date();

      await video.save();

      // Add transformation URLs
      const transformations = generateVideoTransformations(video.cloudinaryId);

      res.json({
        success: true,
        message: 'Video updated successfully',
        data: {
          video: {
            ...video.toObject(),
            transformations
          }
        }
      });

    } catch (error) {
      console.error('Update video error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update video',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }

  // Delete video
  static async deleteVideo(req, res) {
    try {
      const video = await Video.findById(req.params.id);

      if (!video) {
        return res.status(404).json({
          success: false,
          message: 'Video not found'
        });
      }

      // Delete from Cloudinary
      await deleteVideo(video.cloudinaryId);

      // Delete from database
      await Video.findByIdAndDelete(req.params.id);

      res.json({
        success: true,
        message: 'Video deleted successfully'
      });

    } catch (error) {
      console.error('Delete video error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete video',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }

  // Toggle video privacy status
  static async toggleVideoPrivacy(req, res) {
    try {
      const video = await Video.findById(req.params.id);

      if (!video) {
        return res.status(404).json({
          success: false,
          message: 'Video not found'
        });
      }

      video.isPrivate = !video.isPrivate;
      video.updatedAt = new Date();

      await video.save();

      res.json({
        success: true,
        message: `Video ${video.isPrivate ? 'made private' : 'made public'} successfully`,
        data: {
          video: {
            ...video.toObject(),
            transformations: generateVideoTransformations(video.cloudinaryId)
          }
        }
      });

    } catch (error) {
      console.error('Toggle video privacy error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to toggle video privacy',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }

  // Get videos by category
  static async getVideosByCategory(req, res) {
    try {
      const { category } = req.params;
      const { page = 1, limit = 12 } = req.query;

      const filter = { category };

      // Only show public videos unless user is admin
      if (!req.user || req.user.role !== 'admin') {
        filter.isPrivate = false;
      }

      const skip = (parseInt(page) - 1) * parseInt(limit);

      const [videos, totalCount] = await Promise.all([
        Video.find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(parseInt(limit))
          .populate('uploadedBy', 'username email')
          .lean(),
        Video.countDocuments(filter)
      ]);

      // Add transformation URLs to each video
      const videosWithTransformations = videos.map(video => ({
        ...video,
        transformations: generateVideoTransformations(video.cloudinaryId)
      }));

      const totalPages = Math.ceil(totalCount / parseInt(limit));

      res.json({
        success: true,
        data: {
          videos: videosWithTransformations,
          category,
          pagination: {
            currentPage: parseInt(page),
            totalPages,
            totalCount,
            hasNextPage: parseInt(page) < totalPages,
            hasPrevPage: parseInt(page) > 1
          }
        }
      });

    } catch (error) {
      console.error('Get videos by category error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch videos by category',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }
}

module.exports = VideoController;
