import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { photoAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const PhotoGallery = forwardRef(({ category, userId, featured, onPhotoClick }, ref) => {
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

  // Update filters when props change (without triggering additional fetch)
  useEffect(() => {
    console.log('🔄 Category prop changed:', category);
    setFilters(prev => ({
      ...prev,
      category: category || ''
    }));
  }, [category]);

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'baby-shower', label: 'Baby Shower' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'newborn', label: 'New Born' },
    { value: 'traditional', label: 'Traditional' },
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
      console.log('🔍 Fetching photos with params:', { page, filters, category, userId, featured });
      setLoading(true);
      const params = {
        page,
        limit: 12,
        ...filters,
        // Use the category prop directly to avoid timing issues
        category: category || filters.category || '',
      };

      // Add specific filters
      if (userId) params.uploadedBy = userId;
      if (featured !== undefined) params.featured = featured;

      // Clean up undefined and null values, but preserve empty strings for category filter
      Object.keys(params).forEach(key => {
        if (params[key] === undefined || params[key] === null) {
          delete params[key];
        }
        // Only delete empty strings for non-category fields
        if (key !== 'category' && params[key] === '') {
          delete params[key];
        }
      });

      console.log('📤 Final API params:', params);
      console.log('🎯 Category being sent to API:', params.category);
      const response = await photoAPI.getPhotos(params);
      console.log('📥 API Response:', response);
      
      if (response && response.photos) {
        console.log(`✅ Found ${response.photos.length} photos`);
        if (page === 1) {
          setPhotos(response.photos);
        } else {
          setPhotos(prev => [...prev, ...response.photos]);
        }
        
        setPagination(response.pagination || {});
      } else {
        console.log('⚠️ No photos in response');
        setPhotos([]);
        setPagination({});
      }
    } catch (error) {
      console.error('❌ Error fetching photos:', error);
      console.error('❌ Error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url
      });
      toast.error(error.message || 'Failed to load photos');
      setPhotos([]);
      setPagination({});
    } finally {
      setLoading(false);
    }
  };

  // Expose refresh function to parent components
  useImperativeHandle(ref, () => ({
    refresh: () => {
      console.log('🔄 PhotoGallery refresh called');
      setCurrentPage(1);
      fetchPhotos(1);
    }
  }));

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

  // Initial load and when dependencies change - wait for category to be available
  useEffect(() => {
    // Only fetch if we have a category or it's explicitly empty (all categories)
    if (category !== undefined) {
      console.log('🔄 Dependencies changed, fetching photos...', { category, filters, userId, featured });
      setCurrentPage(1);
      fetchPhotos(1);
    }
  }, [category, filters.sort, userId, featured]);

  // Listen for gallery refresh events
  useEffect(() => {
    const handleGalleryRefresh = (event) => {
      console.log('🔄 Gallery refresh event received:', event.detail);
      if (event.detail.type === 'image') {
        setCurrentPage(1);
        fetchPhotos(1);
      }
    };

    window.addEventListener('galleryRefresh', handleGalleryRefresh);
    return () => {
      window.removeEventListener('galleryRefresh', handleGalleryRefresh);
    };
  }, []);

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

  // Function to get random height classes for Pinterest-style masonry effect
  const getMasonryItemClass = (index) => {
    // Pinterest-style varied heights - mobile first approach
    const heightClasses = [
      'h-48 sm:h-56 md:h-64',    // Short
      'h-64 sm:h-72 md:h-80',    // Medium
      'h-80 sm:h-96 md:h-112',   // Tall
      'h-56 sm:h-64 md:h-72',    // Medium-short
      'h-72 sm:h-80 md:h-96',    // Medium-tall
      'h-60 sm:h-68 md:h-76',    // Varied
      'h-96 sm:h-112 md:h-128',  // Very tall
      'h-52 sm:h-60 md:h-68',    // Short-medium
    ];
    return heightClasses[index % heightClasses.length];
  };

  return (
    <div className="w-full">
      {/* Photos Grid */}
      {loading && photos.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8860B]"></div>
        </div>
      ) : photos.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-[#B8860B] text-6xl mb-4">📷</div>
          <h3 className="text-xl font-medium text-white mb-2">No photos found</h3>
          <p className="text-gray-400">No photos available in this category.</p>
        </div>
      ) : (
        <>
          {/* Pinterest-style Masonry Layout - Mobile Optimized */}
          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-1 sm:gap-2 md:gap-3 lg:gap-4">
            {photos.map((photo, index) => (
              <div
                key={photo._id}
                className={`${getMasonryItemClass(index)} masonry-container group relative bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-800 break-inside-avoid mb-1 sm:mb-2 md:mb-3 lg:mb-4`}
                onClick={() => onPhotoClick && onPhotoClick(photo)}
                style={{ breakInside: 'avoid' }}
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
                <div className="w-full h-full overflow-hidden">
                  <img
                    src={photo.transformations?.medium || photo.cloudinaryUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Optional: Photo Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white text-sm font-medium truncate">
                    {photo.title}
                  </h3>
                  {photo.locationName && (
                    <p className="text-gray-300 text-xs truncate">
                      📍 {photo.locationName}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {pagination.hasNext && (
            <div className="text-center mt-8">
              <button
                onClick={() => {
                  if (pagination.hasNext && !loading) {
                    const nextPage = currentPage + 1;
                    setCurrentPage(nextPage);
                    fetchPhotos(nextPage);
                  }
                }}
                disabled={loading}
                className="px-8 py-3 bg-[#B8860B] text-black font-medium rounded-lg hover:bg-[#DAA520] focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {loading ? 'Loading...' : 'Load More Photos'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
});

export default PhotoGallery;
