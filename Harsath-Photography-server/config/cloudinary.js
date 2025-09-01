const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary storage for multer (Images)
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'harsath-photography/images',
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

// Configure Cloudinary storage for multer (Videos)
const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'harsath-photography/videos',
    resource_type: 'video',
    allowed_formats: ['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv', 'm4v', '3gp'],
    transformation: [
      {
        quality: 'auto',
        video_codec: 'auto'
      }
    ],
    public_id: (req, file) => {
      // Generate unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      return `video_${timestamp}_${randomString}`;
    }
  }
});

// Configure multer for images
const uploadImage = multer({
  storage: imageStorage,
  fileFilter: (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
  // No file size limit for images
});

// Configure multer for videos
const uploadVideo = multer({
  storage: videoStorage,
  fileFilter: (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed!'), false);
    }
  }
  // No file size limit for videos
});

// Configure multer for both images and videos
const uploadMedia = multer({
  storage: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
          folder: 'harsath-photography/images',
          allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'tiff'],
          transformation: [
            {
              quality: 'auto',
              fetch_format: 'auto'
            }
          ],
          public_id: (req, file) => {
            const timestamp = Date.now();
            const randomString = Math.random().toString(36).substring(2, 15);
            return `photo_${timestamp}_${randomString}`;
          }
        }
      });
      cb(null, storage);
    } else if (file.mimetype.startsWith('video/')) {
      const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
          folder: 'harsath-photography/videos',
          resource_type: 'video',
          allowed_formats: ['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv', 'm4v', '3gp'],
          transformation: [
            {
              quality: 'auto',
              video_codec: 'auto'
            }
          ],
          public_id: (req, file) => {
            const timestamp = Date.now();
            const randomString = Math.random().toString(36).substring(2, 15);
            return `video_${timestamp}_${randomString}`;
          }
        }
      });
      cb(null, storage);
    } else {
      cb(new Error('Only image and video files are allowed!'));
    }
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed!'), false);
    }
  }
  // No file size limit - allows unlimited video uploads from cameras
});

// For backward compatibility
const upload = uploadImage;

// Helper function to delete media from Cloudinary
const deleteMedia = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, { 
      resource_type: resourceType 
    });
    return result;
  } catch (error) {
    console.error('Error deleting media from Cloudinary:', error);
    throw error;
  }
};

// For backward compatibility
const deleteImage = async (publicId) => {
  return deleteMedia(publicId, 'image');
};

// Helper function to delete video from Cloudinary
const deleteVideo = async (publicId) => {
  return deleteMedia(publicId, 'video');
};

// Helper function to get media details
const getMediaDetails = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.api.resource(publicId, {
      resource_type: resourceType
    });
    return result;
  } catch (error) {
    console.error('Error fetching media details:', error);
    throw error;
  }
};

// For backward compatibility
const getImageDetails = async (publicId) => {
  return getMediaDetails(publicId, 'image');
};

// Helper function to get video details
const getVideoDetails = async (publicId) => {
  return getMediaDetails(publicId, 'video');
};

// Helper function to generate image transformation URLs
const generateImageTransformations = (publicId) => {
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

// Helper function to generate video transformation URLs
const generateVideoTransformations = (publicId) => {
  return {
    thumbnail: cloudinary.url(publicId, {
      resource_type: 'video',
      width: 300,
      height: 300,
      crop: 'fill',
      quality: 'auto',
      format: 'jpg'
    }),
    preview: cloudinary.url(publicId, {
      resource_type: 'video',
      width: 640,
      height: 480,
      crop: 'limit',
      quality: 'auto',
      video_codec: 'auto',
      format: 'mp4'
    }),
    hd: cloudinary.url(publicId, {
      resource_type: 'video',
      width: 1280,
      height: 720,
      crop: 'limit',
      quality: 'auto',
      video_codec: 'auto',
      format: 'mp4'
    }),
    watermarked: cloudinary.url(publicId, {
      resource_type: 'video',
      overlay: 'text:Arial_30:© Harsath Photography',
      gravity: 'south_east',
      x: 20,
      y: 20,
      opacity: 70,
      quality: 'auto',
      video_codec: 'auto',
      format: 'mp4'
    })
  };
};

// For backward compatibility
const generateTransformations = generateImageTransformations;

module.exports = {
  cloudinary,
  upload,
  uploadImage,
  uploadVideo,
  uploadMedia,
  deleteImage,
  deleteVideo,
  deleteMedia,
  getImageDetails,
  getVideoDetails,
  getMediaDetails,
  generateTransformations,
  generateImageTransformations,
  generateVideoTransformations
};
