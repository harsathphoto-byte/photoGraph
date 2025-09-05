const sharp = require('sharp');
const path = require('path');

class ImageCompression {
  /**
   * Compress image before upload
   * @param {Buffer} buffer - Image buffer
   * @param {Object} options - Compression options
   * @returns {Promise<Buffer>} - Compressed image buffer
   */
  static async compressImage(buffer, options = {}) {
    const {
      maxWidth = 1920,
      maxHeight = 1080,
      quality = 85,
      format = 'jpeg'
    } = options;

    try {
      console.log('🔧 Starting image compression...');
      console.log('📊 Original size:', (buffer.length / 1024 / 1024).toFixed(2), 'MB');

      let sharpImage = sharp(buffer);
      
      // Get image metadata
      const metadata = await sharpImage.metadata();
      console.log('📏 Original dimensions:', metadata.width, 'x', metadata.height);
      console.log('🎨 Original format:', metadata.format);

      // Resize if image is too large
      if (metadata.width > maxWidth || metadata.height > maxHeight) {
        console.log(`🔄 Resizing to max ${maxWidth}x${maxHeight}`);
        sharpImage = sharpImage.resize(maxWidth, maxHeight, {
          fit: 'inside',
          withoutEnlargement: true
        });
      }

      // Convert and compress based on format
      let compressedBuffer;
      
      if (format === 'jpeg' || metadata.format === 'jpg' || metadata.format === 'jpeg') {
        compressedBuffer = await sharpImage
          .jpeg({ 
            quality,
            progressive: true,
            mozjpeg: true // Better compression
          })
          .toBuffer();
      } else if (format === 'png' || metadata.format === 'png') {
        compressedBuffer = await sharpImage
          .png({ 
            quality,
            compressionLevel: 9,
            palette: true // Reduce colors for smaller size
          })
          .toBuffer();
      } else if (format === 'webp' || metadata.format === 'webp') {
        compressedBuffer = await sharpImage
          .webp({ 
            quality,
            effort: 6 // Higher effort for better compression
          })
          .toBuffer();
      } else {
        // Default to JPEG for other formats
        compressedBuffer = await sharpImage
          .jpeg({ 
            quality,
            progressive: true,
            mozjpeg: true
          })
          .toBuffer();
      }

      const originalSizeMB = (buffer.length / 1024 / 1024);
      const compressedSizeMB = (compressedBuffer.length / 1024 / 1024);
      const compressionRatio = ((originalSizeMB - compressedSizeMB) / originalSizeMB * 100);

      console.log('✅ Compression complete:');
      console.log('📊 Compressed size:', compressedSizeMB.toFixed(2), 'MB');
      console.log('📉 Reduction:', compressionRatio.toFixed(1) + '%');

      return compressedBuffer;
    } catch (error) {
      console.error('❌ Image compression failed:', error);
      throw new Error('Failed to compress image: ' + error.message);
    }
  }

  /**
   * Determine if image needs compression
   * @param {Object} file - Multer file object
   * @returns {boolean} - Whether compression is needed
   */
  static needsCompression(file) {
    const maxSizeBytes = 5 * 1024 * 1024; // 5MB threshold
    const sizeExceeded = file.size > maxSizeBytes;
    
    console.log('🔍 Checking if compression needed:');
    console.log('📁 File size:', (file.size / 1024 / 1024).toFixed(2), 'MB');
    console.log('⚖️ Threshold: 5MB');
    console.log('🎯 Needs compression:', sizeExceeded);
    
    return sizeExceeded;
  }

  /**
   * Get compression options based on file size and type
   * @param {Object} file - Multer file object
   * @returns {Object} - Compression options
   */
  static getCompressionOptions(file) {
    const fileSizeMB = file.size / 1024 / 1024;
    
    if (fileSizeMB > 10) {
      // Heavy compression for very large files
      return {
        maxWidth: 1600,
        maxHeight: 900,
        quality: 75,
        format: 'jpeg'
      };
    } else if (fileSizeMB > 5) {
      // Medium compression for large files
      return {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 80,
        format: 'jpeg'
      };
    } else {
      // Light compression for smaller files
      return {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 85,
        format: 'jpeg'
      };
    }
  }
}

module.exports = ImageCompression;
