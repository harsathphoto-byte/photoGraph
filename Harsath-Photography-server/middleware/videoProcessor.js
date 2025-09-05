const ffprobe = require('node-ffprobe');
const path = require('path');
const fs = require('fs').promises;

class VideoProcessor {
  
  /**
   * Validate and process video file
   * @param {Object} file - Uploaded file object
   * @param {Object} options - Processing options
   */
  static async processVideo(file, options = {}) {
    try {
      console.log('🎬 Processing video:', file.originalname);
      
      const {
        maxSizeInMB = 100, // Default 100MB max size
        allowedFormats = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv'],
        maxDurationInSeconds = 300 // Default 5 minutes max duration
      } = options;

      // Validate file extension
      const fileExtension = path.extname(file.originalname).toLowerCase().slice(1);
      if (!allowedFormats.includes(fileExtension)) {
        throw new Error(`Invalid video format. Allowed formats: ${allowedFormats.join(', ')}`);
      }

      // Validate file size
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > maxSizeInMB) {
        throw new Error(`File size (${fileSizeInMB.toFixed(2)}MB) exceeds maximum allowed size (${maxSizeInMB}MB)`);
      }

      let videoMetadata = null;
      
      // Try to extract video metadata if file path is available
      if (file.path) {
        try {
          videoMetadata = await ffprobe(file.path);
          
          // Validate duration
          if (videoMetadata.format && videoMetadata.format.duration) {
            const duration = parseFloat(videoMetadata.format.duration);
            if (duration > maxDurationInSeconds) {
              throw new Error(`Video duration (${Math.round(duration)}s) exceeds maximum allowed duration (${maxDurationInSeconds}s)`);
            }
          }

          console.log('✅ Video metadata extracted:', {
            duration: videoMetadata.format?.duration,
            size: videoMetadata.format?.size,
            bitrate: videoMetadata.format?.bit_rate,
            format: videoMetadata.format?.format_name
          });
          
        } catch (metadataError) {
          console.warn('⚠️ Could not extract video metadata:', metadataError.message);
          // Continue without metadata if extraction fails
        }
      }

      // Prepare processed file info
      const processedFile = {
        ...file,
        processed: true,
        metadata: videoMetadata ? {
          duration: videoMetadata.format?.duration,
          bitrate: videoMetadata.format?.bit_rate,
          format_name: videoMetadata.format?.format_name,
          width: videoMetadata.streams?.[0]?.width,
          height: videoMetadata.streams?.[0]?.height,
          fps: videoMetadata.streams?.[0]?.r_frame_rate
        } : null,
        validation: {
          sizeValid: true,
          formatValid: true,
          durationValid: true,
          maxSize: maxSizeInMB,
          actualSize: fileSizeInMB
        }
      };

      console.log('✅ Video processing completed:', {
        size: `${fileSizeInMB.toFixed(2)}MB`,
        format: fileExtension,
        duration: videoMetadata?.format?.duration ? `${Math.round(videoMetadata.format.duration)}s` : 'unknown'
      });

      return processedFile;

    } catch (error) {
      console.error('❌ Video processing failed:', error.message);
      throw error;
    }
  }

  /**
   * Validate video file before upload
   * @param {Object} file - File to validate
   * @param {Object} options - Validation options
   */
  static validateVideo(file, options = {}) {
    const {
      maxSizeInMB = 100,
      allowedFormats = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv']
    } = options;

    const errors = [];

    // Check file extension
    const fileExtension = path.extname(file.originalname).toLowerCase().slice(1);
    if (!allowedFormats.includes(fileExtension)) {
      errors.push(`Invalid format: ${fileExtension}. Allowed: ${allowedFormats.join(', ')}`);
    }

    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxSizeInMB) {
      errors.push(`File too large: ${fileSizeInMB.toFixed(2)}MB (max: ${maxSizeInMB}MB)`);
    }

    return {
      valid: errors.length === 0,
      errors,
      metadata: {
        size: fileSizeInMB,
        format: fileExtension,
        originalName: file.originalname
      }
    };
  }

  /**
   * Get video processing recommendations
   * @param {Object} file - Video file
   */
  static getCompressionRecommendations(file) {
    const fileSizeInMB = file.size / (1024 * 1024);
    const recommendations = [];

    if (fileSizeInMB > 50) {
      recommendations.push('Consider reducing video resolution to 1080p or lower');
      recommendations.push('Use a lower bitrate for compression');
      recommendations.push('Convert to MP4 format for better compression');
    }

    if (fileSizeInMB > 25) {
      recommendations.push('Consider trimming video length if possible');
    }

    return recommendations;
  }
}

module.exports = VideoProcessor;
