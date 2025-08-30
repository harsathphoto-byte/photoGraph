require('dotenv').config();
const express = require('express');
const { upload } = require('./config/cloudinary');
const { authenticateToken } = require('./middleware/auth');

const app = express();

// Basic middleware
app.use(express.json());

// Debug upload endpoint
app.post('/debug-upload', authenticateToken, upload.single('photo'), (req, res) => {
  try {
    console.log('=== DEBUG UPLOAD ===');
    console.log('User:', req.user);
    console.log('Body:', req.body);
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
      file: req.file
    });
  } catch (error) {
    console.error('Debug upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Debug server running on port ${PORT}`);
});
