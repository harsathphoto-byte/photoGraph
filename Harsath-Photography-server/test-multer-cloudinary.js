require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log('Testing CloudinaryStorage with Multer...');

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'harsath-photography-test',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'tiff'],
    public_id: (req, file) => {
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      return `test_${timestamp}_${randomString}`;
    }
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log('File filter called:', file.originalname, file.mimetype);
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

const app = express();

app.post('/test-upload', (req, res, next) => {
  console.log('=== Test upload route hit ===');
  next();
}, upload.single('photo'), (req, res) => {
  try {
    console.log('=== Upload middleware completed ===');
    console.log('File:', req.file);
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }
    
    res.json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        originalname: req.file.originalname,
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  } catch (error) {
    console.error('Test upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('=== Multer Error ===');
  console.error('Error name:', err.name);
  console.error('Error message:', err.message);
  console.error('Error code:', err.code);
  console.error('Error stack:', err.stack);
  
  res.status(500).json({
    success: false,
    message: err.message || 'Upload error'
  });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Test upload server running on port ${PORT}`);
});
