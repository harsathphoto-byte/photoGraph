import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { photoAPI, videoAPI } from '../services/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

// Validation schema
const uploadSchema = yup.object({
  category: yup.string()
    .required('Category is required')
    .oneOf([
      'wedding', 'portrait', 'event', 'nature', 'street', 'fashion', 'commercial',
      'landscape', 'architecture', 'sports', 'travel', 'documentary', 'cinematic',
      'music-video', 'promotional', 'general'
    ], 'Invalid category'),
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
  { value: 'landscape', label: 'Landscape' },
  { value: 'architecture', label: 'Architecture' },
  { value: 'sports', label: 'Sports' },
  { value: 'travel', label: 'Travel' },
  { value: 'documentary', label: 'Documentary' },
  { value: 'cinematic', label: 'Cinematic' },
  { value: 'music-video', label: 'Music Video' },
  { value: 'promotional', label: 'Promotional' },
  { value: 'general', label: 'General' },
];

const MediaUpload = ({ isOpen, onClose, onUploadSuccess }) => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mediaType, setMediaType] = useState(null); // 'image' or 'video'
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
      category: 'general',
    },
  });

  // Get accepted file types based on media type
  const getAcceptedTypes = () => {
    return 'image/*,video/*';
  };

  // Get file size limit based on media type
  const getFileSizeLimit = (file) => {
    if (file.type.startsWith('image/')) {
      return 9 * 1024 * 1024; // 9MB for images
    } else if (file.type.startsWith('video/')) {
      return 50 * 1024 * 1024; // 50MB for videos (Cloudinary free plan limit)
    }
    return null;
  };

  // Helper function to format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        toast.error('Please select an image or video file');
        return;
      }

      // Validate file size
      const sizeLimit = getFileSizeLimit(file);
      if (sizeLimit && file.size > sizeLimit) {
        const limitMB = sizeLimit / (1024 * 1024);
        const fileType = file.type.startsWith('image/') ? 'image' : 'video';
        toast.error(`${fileType} size must be less than ${limitMB}MB. Current size: ${formatFileSize(file.size)}`);
        return;
      }

      setSelectedFile(file);
      setMediaType(file.type.startsWith('image/') ? 'image' : 'video');

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
      toast.error('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      
      // Append file with appropriate field name
      if (mediaType === 'image') {
        formData.append('photo', selectedFile);
      } else {
        formData.append('media', selectedFile);
      }
      
      formData.append('category', data.category);

      // Handle location
      if (data.locationName) {
        formData.append('location', JSON.stringify({ name: data.locationName }));
      }

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 300);

      let result;
      if (mediaType === 'image') {
        result = await photoAPI.uploadPhoto(formData);
      } else {
        result = await videoAPI.uploadMedia(formData);
      }
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      toast.success(`${mediaType === 'image' ? 'Photo' : 'Video'} uploaded successfully!`);
      
      // Reset form and close modal
      reset();
      setSelectedFile(null);
      setPreview(null);
      setMediaType(null);
      setUploadProgress(0);
      onUploadSuccess && onUploadSuccess(result.data);
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
      setMediaType(null);
      setUploadProgress(0);
      onClose();
    }
  };

  // Admin access check - after all hooks are defined
  if (!user || user.role !== 'admin') {
    return null;
  }

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-start justify-center p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isUploading) {
          handleClose();
        }
      }}
    >
      <div 
        className="bg-gray-900 rounded-lg shadow-2xl max-w-2xl w-full my-8 border-2 border-amber-400 min-h-fit relative z-[10000]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed */}
        <div className="flex justify-between items-center p-6 border-b border-amber-400 sticky top-0 bg-gray-900 z-[10001] rounded-t-lg">
          <h2 className="text-2xl font-bold text-amber-400">
            Upload {mediaType ? (mediaType === 'image' ? 'Photo' : 'Video') : 'Media'}
          </h2>
          <button
            onClick={handleClose}
            disabled={isUploading}
            className="text-amber-400 hover:text-amber-300 text-2xl disabled:cursor-not-allowed transition-colors"
          >
            ×
          </button>
        </div>

        {/* Body - Scrollable */}
        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          <form onSubmit={handleSubmit(handleUpload)} className="space-y-6 pb-20">
            {/* File Upload Area */}
            <div>
              <label className="block text-sm font-medium text-amber-400 mb-2">
                Media File {mediaType && `(${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)})`}
              </label>
              <div
                className="border-2 border-dashed border-amber-600 rounded-lg p-6 text-center hover:border-amber-400 transition-colors cursor-pointer bg-gray-900"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                {preview ? (
                  <div className="space-y-4">
                    {mediaType === 'image' ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="mx-auto max-h-48 rounded-lg shadow-lg border border-amber-600"
                      />
                    ) : (
                      <video
                        src={preview}
                        className="mx-auto max-h-48 rounded-lg shadow-lg border border-amber-600"
                        controls
                        muted
                      />
                    )}
                    <p className="text-sm text-gray-300">
                      {selectedFile?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Size: {(selectedFile?.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        setPreview(null);
                        setMediaType(null);
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
                    <div className="text-amber-400 text-4xl">🎬</div>
                    <p className="text-gray-300">
                      Click to select or drag and drop your media here
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports: Images (JPG, PNG, GIF, WebP) up to 9MB and Videos (MP4, MOV, AVI, etc.) up to 50MB
                    </p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept={getAcceptedTypes()}
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

            {/* Media Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            {/* Actions - Fixed at bottom */}
            <div className="sticky bottom-0 bg-gray-900 flex justify-end space-x-3 pt-4 border-t border-amber-400 -mx-6 px-6 pb-6 rounded-b-lg">
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
                {isUploading ? 'Uploading...' : `Upload ${mediaType ? (mediaType === 'image' ? 'Photo' : 'Video') : 'Media'}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MediaUpload;
