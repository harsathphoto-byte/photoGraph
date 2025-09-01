const { body, query } = require('express-validator');

// Upload photo validation rules
const uploadPhotoValidation = [
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['wedding', 'baby-shower', 'fashion', 'newborn', 'traditional'])
    .withMessage('Invalid category'),
    
  body('locationName')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Location name cannot exceed 100 characters')
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
      return ['wedding', 'baby-shower', 'fashion', 'newborn', 'traditional'].includes(value);
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
