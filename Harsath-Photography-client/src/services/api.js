import axios from 'axios';
import { toast } from 'react-toastify';
import { config } from '../config/env';

// Create axios instance
const api = axios.create({
  baseURL: config.API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Photo API service
export const photoAPI = {
  // Upload photo
  uploadPhoto: async (formData) => {
    try {
      const response = await api.post('/photos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error uploading photo');
    }
  },

  // Get all photos
  getPhotos: async (params = {}) => {
    try {
      const response = await api.get('/photos', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching photos');
    }
  },

  // Get single photo
  getPhoto: async (id) => {
    try {
      const response = await api.get(`/photos/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching photo');
    }
  },

  // Update photo
  updatePhoto: async (id, updates) => {
    try {
      const response = await api.put(`/photos/${id}`, updates);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error updating photo');
    }
  },

  // Delete photo
  deletePhoto: async (id) => {
    try {
      const response = await api.delete(`/photos/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error deleting photo');
    }
  },

  // Like/unlike photo
  toggleLike: async (id) => {
    try {
      const response = await api.post(`/photos/${id}/like`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error updating like');
    }
  },

  // Add comment
  addComment: async (id, text) => {
    try {
      const response = await api.post(`/photos/${id}/comment`, { text });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error adding comment');
    }
  },
};

// User API service
export const userAPI = {
  // Get users (admin only)
  getUsers: async (params = {}) => {
    try {
      const response = await api.get('/users', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching users');
    }
  },

  // Get user by ID
  getUser: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching user');
    }
  },

  // Get user's photos
  getUserPhotos: async (id, params = {}) => {
    try {
      const response = await api.get(`/users/${id}/photos`, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching user photos');
    }
  },

  // Update user role (admin only)
  updateUserRole: async (id, role) => {
    try {
      const response = await api.put(`/users/${id}/role`, { role });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error updating user role');
    }
  },

  // Delete user (admin only)
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error deleting user');
    }
  },
};

// Video API service
export const videoAPI = {
  // Upload video
  uploadVideo: async (formData) => {
    try {
      const response = await api.post('/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error uploading video');
    }
  },

  // Upload media (image or video)
  uploadMedia: async (formData) => {
    try {
      const response = await api.post('/videos/upload-media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error uploading media');
    }
  },

  // Get all videos
  getVideos: async (params = {}) => {
    try {
      const response = await api.get('/videos', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching videos');
    }
  },

  // Get single video
  getVideo: async (id) => {
    try {
      const response = await api.get(`/videos/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching video');
    }
  },

  // Update video
  updateVideo: async (id, updates) => {
    try {
      const response = await api.put(`/videos/${id}`, updates);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error updating video');
    }
  },

  // Delete video
  deleteVideo: async (id) => {
    try {
      const response = await api.delete(`/videos/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error deleting video');
    }
  },

  // Toggle video privacy
  toggleVideoPrivacy: async (id) => {
    try {
      const response = await api.post(`/videos/${id}/toggle-privacy`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error toggling video privacy');
    }
  },

  // Get videos by category
  getVideosByCategory: async (category, params = {}) => {
    try {
      const response = await api.get(`/videos/category/${category}`, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching videos by category');
    }
  },
};

export default api;
