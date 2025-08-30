const { body, query } = require('express-validator');

// Upload photo validation rules
const uploadPhotoValidation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
    
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
    
  body('category')
    .isIn(['wedding', 'portrait', 'event', 'nature', 'street', 'fashion', 'commercial', 'other'])
    .withMessage('Invalid category'),
    
  body('tags')
    .optional()
    .custom((value) => {
      if (!value) return true; // Optional field
      
      // If it's already an array, that's fine
      if (Array.isArray(value)) return true;
      
      // If it's a string, try to parse it as JSON
      if (typeof value === 'string') {
        try {
          const parsed = JSON.parse(value);
          return Array.isArray(parsed);
        } catch (error) {
          throw new Error('Tags must be a valid JSON array');
        }
      }
      
      throw new Error('Tags must be an array or valid JSON array string');
    }),
    
  body('isPublic')
    .optional()
    .custom((value) => {
      if (value === undefined || value === null) return true;
      if (typeof value === 'boolean') return true;
      if (typeof value === 'string' && (value === 'true' || value === 'false')) return true;
      throw new Error('isPublic must be a boolean or string "true"/"false"');
    }),
    
  body('location')
    .optional()
    .custom((value) => {
      if (!value) return true; // Optional field
      
      let locationObj;
      if (typeof value === 'string') {
        try {
          locationObj = JSON.parse(value);
        } catch (error) {
          throw new Error('Location must be a valid JSON object');
        }
      } else {
        locationObj = value;
      }
      
      if (locationObj.name && locationObj.name.length > 100) {
        throw new Error('Location name cannot exceed 100 characters');
      }
      
      return true;
    })
];

// Get photos validation rules
const getPhotosValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
    
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
    
  query('category')
    .optional()
    .custom((value) => {
      if (value === '' || value === undefined || value === null) return true;
      return ['wedding', 'portrait', 'event', 'nature', 'street', 'fashion', 'commercial', 'other'].includes(value);
    })
    .withMessage('Invalid category'),
    
  query('tags')
    .optional()
    .isString()
    .withMessage('Tags must be a string'),
    
  query('search')
    .optional()
    .isString()
    .withMessage('Search must be a string'),
    
  query('sortBy')
    .optional()
    .isIn(['createdAt', 'title', 'views', 'likes'])
    .withMessage('Invalid sort field'),
    
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
    
  query('isPublic')
    .optional()
    .isBoolean()
    .withMessage('isPublic must be a boolean')
];

// Update photo validation rules
const updatePhotoValidation = [
  body('title')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
    
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
    
  body('category')
    .optional()
    .isIn(['wedding', 'portrait', 'event', 'nature', 'street', 'fashion', 'commercial', 'other'])
    .withMessage('Invalid category'),
    
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
    
  body('isPublic')
    .optional()
    .isBoolean()
    .withMessage('isPublic must be a boolean'),
    
  body('location.name')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Location name cannot exceed 100 characters')
];

module.exports = {
  uploadPhotoValidation,
  getPhotosValidation,
  updatePhotoValidation
};
