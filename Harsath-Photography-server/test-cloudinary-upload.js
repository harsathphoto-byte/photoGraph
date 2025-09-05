const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Initialize Express
const app = express();

// Configure Cloudinary - test with real credentials
cloudinary.config({
  cloud_name: 'dh5yavxhu',
  api_key: '119598142698881',
  api_secret: 'S8VBGdPXV9Y8lGV9oZG47sptBUU',
  secure: true
});

// Test cloudinary connection
async function testCloudinaryConnection() {
  try {
    const result = await cloudinary.api.ping();
    console.log('✅ Cloudinary connection successful:', result);
  } catch (error) {
    console.error('❌ Cloudinary connection failed:', error);
  }
}

// Configure multer with Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    console.log('=== CLOUDINARY STORAGE PARAMS ===');
    console.log('File:', file);
    
    const isVideo = file.mimetype.startsWith('video/');
    
    return {
      folder: isVideo ? 'harsath_photography/videos' : 'harsath_photography/photos',
      resource_type: isVideo ? 'video' : 'image',
      public_id: `${Date.now()}_${file.originalname.replace(/[^a-zA-Z0-9]/g, '_')}`,
      transformation: isVideo ? [
        { quality: 'auto', format: 'mp4' }
      ] : [
        { quality: 'auto', format: 'auto' }
      ]
    };
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  console.log('File filter check:', {
    fieldname: file.fieldname,
    originalname: file.originalname,
    mimetype: file.mimetype
  });
  
  // Check file type by MIME type or file extension
  const isVideo = file.mimetype.startsWith('video/') || 
                 (file.mimetype === 'application/octet-stream' && 
                  /\.(mp4|mov|avi|mkv|webm|flv|m4v|3gp|wmv)$/i.test(file.originalname));
  
  const isImage = file.mimetype.startsWith('image/') ||
                 (file.mimetype === 'application/octet-stream' && 
                  /\.(jpg|jpeg|png|gif|webp|bmp|tiff)$/i.test(file.originalname));
  
  if (isVideo || isImage) {
    console.log('✅ File accepted:', file.originalname, file.mimetype);
    cb(null, true);
  } else {
    console.log('❌ File rejected:', file.originalname, file.mimetype);
    cb(new Error('Only image and video files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  },
  fileFilter: fileFilter
});

// Test upload endpoint
app.post('/test-upload', upload.single('media'), async (req, res) => {
  try {
    console.log('=== TEST UPLOAD START ===');
    console.log('File:', req.file);
    console.log('Body:', req.body);

    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No file uploaded' 
      });
    }

    // Test Cloudinary upload result
    console.log('✅ Cloudinary upload successful!');
    console.log('Cloudinary ID:', req.file.filename);
    console.log('URL:', req.file.path);
    console.log('Size:', req.file.size);
    
    res.json({
      success: true,
      message: 'File uploaded successfully to Cloudinary',
      data: {
        cloudinaryId: req.file.filename,
        url: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype,
        originalname: req.file.originalname
      }
    });

  } catch (error) {
    console.error('=== TEST UPLOAD ERROR ===');
    console.error('Error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Upload failed',
      error: error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Test upload server running' });
});

// Start server
const PORT = 3003;
app.listen(PORT, async () => {
  console.log(`Test upload server running on port ${PORT}`);
  await testCloudinaryConnection();
  console.log('Ready to test Cloudinary uploads!');
});

module.exports = app;
