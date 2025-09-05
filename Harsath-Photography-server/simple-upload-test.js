const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path = require('path');
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();

// Simple memory storage for testing
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    console.log('File filter check:', {
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype
    });
    
    if (file.mimetype.startsWith('video/') || file.mimetype.startsWith('image/')) {
      console.log('✅ File type accepted:', file.mimetype);
      cb(null, true);
    } else {
      console.log('❌ File type rejected:', file.mimetype);
      cb(new Error(`File type not allowed: ${file.mimetype}. Only video and image files allowed`), false);
    }
  }
});

// Test upload endpoint
app.post('/test-video-upload', upload.single('media'), async (req, res) => {
  try {
    console.log('=== SIMPLE UPLOAD TEST ===');
    console.log('File received:', {
      originalname: req.file?.originalname,
      mimetype: req.file?.mimetype,
      size: req.file?.size
    });

    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Simple Cloudinary upload using buffer
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'test-uploads',
          public_id: `test_${Date.now()}`
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            console.log('Cloudinary upload success:', result.public_id);
            resolve(result);
          }
        }
      );
      
      uploadStream.end(req.file.buffer);
    });

    res.json({
      success: true,
      message: 'Upload successful',
      data: {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
        size: req.file.size,
        format: uploadResult.format
      }
    });

  } catch (error) {
    console.error('Upload error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Simple test server running on port ${PORT}`);
  console.log('Test upload endpoint: POST /test-video-upload');
});
