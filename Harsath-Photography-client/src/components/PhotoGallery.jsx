import React, { useState, useEffect } from 'react';
import { photoAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const PhotoGallery = ({ category, userId, featured, onPhotoClick }) => {
  const { user } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    sort: 'newest',
    search: '',
  });

  // Update filters when props change
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      category: category || ''
    }));
  }, [category]);

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'portrait', label: 'Portrait' },
    { value: 'event', label: 'Event' },
    { value: 'nature', label: 'Nature' },
    { value: 'street', label: 'Street Photography' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'other', label: 'Other' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'title', label: 'Title A-Z' },
  ];

  // Fetch photos
  const fetchPhotos = async (page = 1) => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 12,
        ...filters,
      };

      // Add specific filters
      if (userId) params.uploadedBy = userId;
      if (featured !== undefined) params.featured = featured;

      // Clean up undefined and empty values
      Object.keys(params).forEach(key => {
        if (params[key] === undefined || params[key] === null || params[key] === '') {
          delete params[key];
        }
      });

      const response = await photoAPI.getPhotos(params);
      
      if (response && response.photos) {
        if (page === 1) {
          setPhotos(response.photos);
        } else {
          setPhotos(prev => [...prev, ...response.photos]);
        }
        
        setPagination(response.pagination || {});
      } else {
        setPhotos([]);
        setPagination({});
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
      toast.error(error.message || 'Failed to load photos');
      setPhotos([]);
      setPagination({});
    } finally {
      setLoading(false);
    }
  };

  // Load more photos
  const loadMore = () => {
    if (pagination.hasNext && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchPhotos(nextPage);
    }
  };

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPhotos(1);
  };

  // Handle like toggle
  const handleLike = async (photoId) => {
    if (!user) {
      toast.error('Please login to like photos');
      return;
    }

    try {
      const response = await photoAPI.toggleLike(photoId);
      
      // Update local state
      setPhotos(prev => prev.map(photo => 
        photo._id === photoId 
          ? { ...photo, isLiked: response.isLiked, likeCount: response.likeCount }
          : photo
      ));
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle delete (admin only)
  const handleDelete = async (photoId, photoTitle) => {
    if (!user || user.role !== 'admin') {
      toast.error('Admin access required');
      return;
    }

    if (!window.confirm(`Are you sure you want to delete "${photoTitle}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await photoAPI.deletePhoto(photoId);
      setPhotos(prev => prev.filter(photo => photo._id !== photoId));
      toast.success('Photo deleted successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Initial load and when filters change
  useEffect(() => {
    setCurrentPage(1);
    fetchPhotos(1);
  }, [filters.category, filters.sort, userId, featured]);

  // Handle search separately to avoid excessive API calls
  useEffect(() => {
    if (filters.search !== '') {
      const timeoutId = setTimeout(() => {
        setCurrentPage(1);
        fetchPhotos(1);
      }, 500); // Debounce search

      return () => clearTimeout(timeoutId);
    }
  }, [filters.search]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="mb-8 p-6 bg-gray-900 rounded-lg border border-gray-800">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search photos..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D6A33E] focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </form>

          {/* Category Filter */}
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#D6A33E] focus:border-transparent"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value} className="bg-gray-800">
                {cat.label}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={filters.sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#D6A33E] focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-gray-800">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Photos Grid */}
      {loading && photos.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D6A33E]"></div>
        </div>
      ) : photos.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-[#D6A33E] text-6xl mb-4">📷</div>
          <h3 className="text-xl font-medium text-white mb-2">No photos found</h3>
          <p className="text-gray-400">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <div
                key={photo._id}
                className="group relative bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-800"
                onClick={() => onPhotoClick && onPhotoClick(photo)}
              >
                {/* Admin Delete Button */}
                {user && user.role === 'admin' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(photo._id, photo.title);
                    }}
                    className="absolute top-2 right-2 z-10 w-8 h-8 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center hover:bg-red-700"
                    title="Delete Photo"
                  >
                    ×
                  </button>
                )}

                {/* Photo */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={photo.transformations?.medium || photo.cloudinaryUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                  <div className="w-full p-4 text-white">
                    <h3 className="font-semibold text-lg truncate mb-1">{photo.title}</h3>
                    <p className="text-sm text-gray-300 mb-2">
                      by {photo.uploadedBy?.firstName} {photo.uploadedBy?.lastName}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-[#D6A33E] text-black px-2 py-1 rounded font-medium">
                        {photo.category}
                      </span>
                      <div className="flex items-center space-x-3 text-sm">
                        <span className="flex items-center space-x-1 text-gray-300">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>{photo.views || 0}</span>
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(photo._id);
                          }}
                          className="flex items-center space-x-1 hover:text-[#D6A33E] transition-colors"
                        >
                          <svg 
                            className={`h-4 w-4 ${photo.isLiked ? 'fill-current text-[#D6A33E]' : 'stroke-current text-gray-300'}`} 
                            viewBox="0 0 24 24" 
                            fill={photo.isLiked ? 'currentColor' : 'none'}
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span>{photo.likeCount || 0}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {pagination.hasNext && (
            <div className="text-center">
              <button
                onClick={loadMore}
                disabled={loading}
                className="px-8 py-3 bg-[#D6A33E] text-black font-medium rounded-lg hover:bg-[#c1922f] focus:outline-none focus:ring-2 focus:ring-[#D6A33E] focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {loading ? 'Loading...' : 'Load More Photos'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PhotoGallery;
