const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'harsath-photography',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'tiff'],
    transformation: [
      {
        quality: 'auto',
        fetch_format: 'auto'
      }
    ],
    public_id: (req, file) => {
      // Generate unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      return `photo_${timestamp}_${randomString}`;
    }
  }
});

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Helper function to delete image from Cloudinary
const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw error;
  }
};

// Helper function to get image details
const getImageDetails = async (publicId) => {
  try {
    const result = await cloudinary.api.resource(publicId);
    return result;
  } catch (error) {
    console.error('Error fetching image details:', error);
    throw error;
  }
};

// Helper function to generate transformation URLs
const generateTransformations = (publicId) => {
  return {
    thumbnail: cloudinary.url(publicId, {
      width: 300,
      height: 300,
      crop: 'fill',
      quality: 'auto',
      fetch_format: 'auto'
    }),
    medium: cloudinary.url(publicId, {
      width: 800,
      height: 600,
      crop: 'limit',
      quality: 'auto',
      fetch_format: 'auto'
    }),
    large: cloudinary.url(publicId, {
      width: 1920,
      height: 1080,
      crop: 'limit',
      quality: 'auto',
      fetch_format: 'auto'
    }),
    watermarked: cloudinary.url(publicId, {
      overlay: 'text:Arial_30:© Harsath Photography',
      gravity: 'south_east',
      x: 20,
      y: 20,
      opacity: 70,
      quality: 'auto',
      fetch_format: 'auto'
    })
  };
};

module.exports = {
  cloudinary,
  upload,
  deleteImage,
  getImageDetails,
  generateTransformations
};
