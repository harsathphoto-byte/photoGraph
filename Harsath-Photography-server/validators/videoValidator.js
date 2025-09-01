const { body, query, param } = require('express-validator');

// Video categories
const VIDEO_CATEGORIES = [
  'wedding',
  'portrait', 
  'landscape',
  'event',
  'commercial',
  'fashion',
  'street',
  'nature',
  'architecture',
  'sports',
  'travel',
  'documentary',
  'cinematic',
  'music-video',
  'promotional',
  'general'
];

// Upload video validation
const uploadVideoValidation = [
  body('title')
    .optional()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters')
    .trim(),
  
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters')
    .trim(),
  
  body('category')
    .optional()
    .isIn(VIDEO_CATEGORIES)
    .withMessage(`Category must be one of: ${VIDEO_CATEGORIES.join(', ')}`),
  
  body('tags')
    .optional()
    .custom((value) => {
      if (typeof value === 'string') {
        try {
          const parsed = JSON.parse(value);
          if (!Array.isArray(parsed)) {
            throw new Error('Tags must be an array');
          }
          if (parsed.length > 20) {
            throw new Error('Maximum 20 tags allowed');
          }
          parsed.forEach(tag => {
            if (typeof tag !== 'string' || tag.length > 50) {
              throw new Error('Each tag must be a string with maximum 50 characters');
            }
          });
          return true;
        } catch (error) {
          throw new Error('Invalid tags format');
        }
      }
      if (Array.isArray(value)) {
        if (value.length > 20) {
          throw new Error('Maximum 20 tags allowed');
        }
        value.forEach(tag => {
          if (typeof tag !== 'string' || tag.length > 50) {
            throw new Error('Each tag must be a string with maximum 50 characters');
          }
        });
        return true;
      }
      throw new Error('Tags must be an array or JSON string');
    }),
  
  body('isPrivate')
    .optional()
    .isBoolean()
    .withMessage('isPrivate must be a boolean value')
];

// Get videos validation
const getVideosValidation = [
  query('category')
    .optional()
    .custom((value) => {
      if (value === 'all') return true;
      return VIDEO_CATEGORIES.includes(value);
    })
    .withMessage(`Category must be one of: ${VIDEO_CATEGORIES.join(', ')}, or 'all'`),
  
  query('tags')
    .optional()
    .isString()
    .withMessage('Tags must be a comma-separated string'),
  
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('sortBy')
    .optional()
    .isIn(['createdAt', 'updatedAt', 'title', 'views', 'likes'])
    .withMessage('SortBy must be one of: createdAt, updatedAt, title, views, likes'),
  
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('SortOrder must be either asc or desc'),
  
  query('search')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters')
    .trim()
];

// Update video validation
const updateVideoValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid video ID'),
  
  body('title')
    .optional()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters')
    .trim(),
  
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters')
    .trim(),
  
  body('category')
    .optional()
    .isIn(VIDEO_CATEGORIES)
    .withMessage(`Category must be one of: ${VIDEO_CATEGORIES.join(', ')}`),
  
  body('tags')
    .optional()
    .isArray({ max: 20 })
    .withMessage('Tags must be an array with maximum 20 items'),
  
  body('tags.*')
    .optional()
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage('Each tag must be a string between 1 and 50 characters')
    .trim(),
  
  body('isPrivate')
    .optional()
    .isBoolean()
    .withMessage('isPrivate must be a boolean value')
];

// Delete video validation
const deleteVideoValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid video ID')
];

// Get video by ID validation
const getVideoByIdValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid video ID')
];

// Toggle privacy validation
const togglePrivacyValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid video ID')
];

// Get videos by category validation
const getVideosByCategoryValidation = [
  param('category')
    .isIn(VIDEO_CATEGORIES)
    .withMessage(`Category must be one of: ${VIDEO_CATEGORIES.join(', ')}`),
  
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
];

// Add comment validation
const addCommentValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid video ID'),
  
  body('text')
    .isLength({ min: 1, max: 500 })
    .withMessage('Comment text must be between 1 and 500 characters')
    .trim()
];

// Delete comment validation
const deleteCommentValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid video ID'),
  
  param('commentId')
    .isMongoId()
    .withMessage('Invalid comment ID')
];

// Like/unlike video validation
const likeVideoValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid video ID')
];

module.exports = {
  uploadVideoValidation,
  getVideosValidation,
  updateVideoValidation,
  deleteVideoValidation,
  getVideoByIdValidation,
  togglePrivacyValidation,
  getVideosByCategoryValidation,
  addCommentValidation,
  deleteCommentValidation,
  likeVideoValidation,
  VIDEO_CATEGORIES
};
