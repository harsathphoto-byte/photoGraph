// Environment configuration helper
// This file centralizes all environment variable usage

export const config = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  
  // Application Information
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Harsath Photography',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  APP_DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION || 'Professional Photography Portfolio & Gallery',
  
  // Environment
  NODE_ENV: import.meta.env.VITE_NODE_ENV || 'development',
  IS_PRODUCTION: import.meta.env.VITE_NODE_ENV === 'production',
  IS_DEVELOPMENT: import.meta.env.VITE_NODE_ENV === 'development',
  
  // Application Settings
  DEFAULT_PAGE_SIZE: parseInt(import.meta.env.VITE_DEFAULT_PAGE_SIZE) || 12,
  MAX_UPLOAD_RETRIES: parseInt(import.meta.env.VITE_MAX_UPLOAD_RETRIES) || 3,
  
  // Utility functions
  getApiUrl: (endpoint = '') => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
    return `${baseUrl}${endpoint}`;
  },
  
  // Debug function (only works in development)
  debug: (...args) => {
    if (import.meta.env.VITE_NODE_ENV === 'development') {
      console.log('[DEBUG]', ...args);
    }
  }
};

export default config;
