import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { photoAPI } from '../services/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

// Validation schema
const uploadSchema = yup.object({
  title: yup.string().required('Title is required').max(100, 'Title cannot exceed 100 characters'),
  description: yup.string().max(500, 'Description cannot exceed 500 characters'),
  category: yup.string()
    .required('Category is required')
    .oneOf(['wedding', 'portrait', 'event', 'nature', 'street', 'fashion', 'commercial', 'other'], 'Invalid category'),
  tags: yup.string(),
  isPublic: yup.boolean(),
  locationName: yup.string().max(100, 'Location name cannot exceed 100 characters'),
});

const categories = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'portrait', label: 'Portrait' },
  { value: 'event', label: 'Event' },
  { value: 'nature', label: 'Nature' },
  { value: 'street', label: 'Street Photography' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'other', label: 'Other' },
];

const PhotoUpload = ({ isOpen, onClose, onUploadSuccess }) => {
  const { user } = useAuth();
  
  // Admin access check
  if (!user || user.role !== 'admin') {
    return null;
  }
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(uploadSchema),
    defaultValues: {
      category: 'other',
      isPublic: true,
    },
  });

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }

      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle drag and drop
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const syntheticEvent = { target: { files: [file] } };
      handleFileSelect(syntheticEvent);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Handle form submission
  const handleUpload = async (data) => {
    if (!selectedFile) {
      toast.error('Please select a photo to upload');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('photo', selectedFile);
      formData.append('title', data.title);
      formData.append('description', data.description || '');
      formData.append('category', data.category);
      formData.append('isPublic', data.isPublic);

      // Handle tags
      if (data.tags) {
        const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        formData.append('tags', JSON.stringify(tagsArray));
      }

      // Handle location
      if (data.locationName) {
        formData.append('location', JSON.stringify({ name: data.locationName }));
      }

      // Simulate upload progress (you can implement real progress tracking with axios)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      const result = await photoAPI.uploadPhoto(formData);
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      toast.success('Photo uploaded successfully!');
      
      // Reset form and close modal
      reset();
      setSelectedFile(null);
      setPreview(null);
      setUploadProgress(0);
      onUploadSuccess && onUploadSuccess(result.photo);
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    if (!isUploading) {
      reset();
      setSelectedFile(null);
      setPreview(null);
      setUploadProgress(0);
      onClose();
    }
  };

  // Check if user can upload (photographer or admin)
  if (!user || !['photographer', 'admin'].includes(user.role)) {
    return null;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-black rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-amber-400">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-amber-400">
          <h2 className="text-2xl font-bold text-amber-400">Upload Photo</h2>
          <button
            onClick={handleClose}
            disabled={isUploading}
            className="text-amber-400 hover:text-amber-300 text-2xl disabled:cursor-not-allowed transition-colors"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit(handleUpload)} className="space-y-6">
            {/* File Upload Area */}
            <div>
              <label className="block text-sm font-medium text-amber-400 mb-2">
                Photo
              </label>
              <div
                className="border-2 border-dashed border-amber-600 rounded-lg p-6 text-center hover:border-amber-400 transition-colors cursor-pointer bg-gray-900"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                {preview ? (
                  <div className="space-y-4">
                    <img
                      src={preview}
                      alt="Preview"
                      className="mx-auto max-h-48 rounded-lg shadow-lg border border-amber-600"
                    />
                    <p className="text-sm text-gray-300">
                      {selectedFile?.name}
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        setPreview(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      className="text-red-400 hover:text-red-300 text-sm transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-amber-400 text-4xl">�</div>
                    <p className="text-gray-300">
                      Click to select or drag and drop your photo here
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports: JPG, PNG, GIF, WebP (Max 10MB)
                    </p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3 border border-amber-600">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-yellow-500 h-3 rounded-full transition-all duration-300 shadow-lg"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Photo Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-amber-400 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  {...register('title')}
                  className="w-full px-3 py-2 border border-amber-600 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400"
                  placeholder="Enter photo title"
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-amber-400 mb-1">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="w-full px-3 py-2 border border-amber-600 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400"
                  placeholder="Describe your photo..."
                />
                {errors.description && (
                  <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-400 mb-1">
                  Category *
                </label>
                <select
                  {...register('category')}
                  className="w-full px-3 py-2 border border-amber-600 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value} className="bg-gray-900">
                      {category.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-400 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  {...register('locationName')}
                  className="w-full px-3 py-2 border border-amber-600 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400"
                  placeholder="Where was this taken?"
                />
                {errors.locationName && (
                  <p className="text-red-400 text-sm mt-1">{errors.locationName.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-amber-400 mb-1">
                  Tags
                </label>
                <input
                  type="text"
                  {...register('tags')}
                  className="w-full px-3 py-2 border border-amber-600 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400"
                  placeholder="Enter tags separated by commas (e.g., landscape, sunset, beach)"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Separate tags with commas
                </p>
                {errors.tags && (
                  <p className="text-red-400 text-sm mt-1">{errors.tags.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('isPublic')}
                    className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-amber-600 rounded bg-gray-900"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-300">
                    Make this photo public
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Public photos will be visible to all visitors
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-amber-400">
              <button
                type="button"
                onClick={handleClose}
                disabled={isUploading}
                className="px-4 py-2 text-gray-300 bg-gray-800 border border-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading || !selectedFile}
                className="px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-semibold rounded-md hover:from-amber-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
              >
                {isUploading ? 'Uploading...' : 'Upload Photo'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;
