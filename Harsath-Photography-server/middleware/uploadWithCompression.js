const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const ImageCompression = require('./imageCompression');

// Memory storage for processing before Cloudinary
const memoryStorage = multer.memoryStorage();

// Custom multer instance for compression
const compressUpload = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit (before compression)
  },
  fileFilter: (req, file, cb) => {
    // Check if file is an image
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Please upload an image file.'), false);
    }
  }
});

// Middleware to compress and upload to Cloudinary
const compressAndUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }

    console.log('🔧 Processing image upload with compression...');
    
    // Check if compression is needed
    const needsCompression = ImageCompression.needsCompression(req.file);
    let finalBuffer = req.file.buffer;

    if (needsCompression) {
      const compressionOptions = ImageCompression.getCompressionOptions(req.file);
      finalBuffer = await ImageCompression.compressImage(req.file.buffer, compressionOptions);
    } else {
      console.log('ℹ️ File size is acceptable, skipping compression');
    }

    // Upload compressed image to Cloudinary
    console.log('☁️ Uploading to Cloudinary...');
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'harsath-photography/images',
          allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
          transformation: [
            {
              quality: 'auto',
              fetch_format: 'auto'
            }
          ],
          public_id: `photo_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
        },
        (error, result) => {
          if (error) {
            console.error('❌ Cloudinary upload error:', error);
            reject(error);
          } else {
            console.log('✅ Cloudinary upload successful:', result.public_id);
            resolve(result);
          }
        }
      );

      // Write the buffer to the upload stream
      uploadStream.end(finalBuffer);
    });

    // Attach Cloudinary result to request file object
    req.file = {
      ...req.file,
      path: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      secure_url: uploadResult.secure_url,
      url: uploadResult.url,
      bytes: uploadResult.bytes,
      width: uploadResult.width,
      height: uploadResult.height,
      format: uploadResult.format
    };

    console.log('✅ Image processing complete');
    next();

  } catch (error) {
    console.error('❌ Error in compressAndUpload middleware:', error);
    next(error);
  }
};

module.exports = {
  compressUpload,
  compressAndUpload
};
