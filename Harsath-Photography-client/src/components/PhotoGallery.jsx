import React, { useState, useEffect, useRef } from 'react';
import { photoAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Masonry from 'masonry-layout';

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
  const masonryRef = useRef(null);
  const masonryInstance = useRef(null);
  const [screenSize, setScreenSize] = useState('md');

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
        
        // Update masonry layout after photos are set
        setTimeout(() => {
          updateMasonryLayout();
        }, 200);
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

  // Update masonry layout after new photos are added
  const updateMasonryLayout = () => {
    if (masonryInstance.current) {
      setTimeout(() => {
        masonryInstance.current.reloadItems();
        masonryInstance.current.layout();
      }, 100);
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

  // Function to get dynamic item size for Instagram-like layout
  const getMasonryItemClass = (index) => {
    // Enhanced mobile masonry pattern - same variety as large screens
    if (screenSize === 'xs') {
      const mobileSizes = [
        'masonry-item grid-w1 grid-h1', // square
        'masonry-item grid-w1 grid-h2', // portrait rectangle
        'masonry-item grid-w1 grid-h1', // square
        'masonry-item grid-w1 grid-h1', // square
        'masonry-item grid-w1 grid-h2', // portrait rectangle
        'masonry-item grid-w1 grid-h1', // square
        'masonry-item grid-w1 grid-h3', // tall portrait
        'masonry-item grid-w1 grid-h1', // square
        'masonry-item grid-w1 grid-h1', // square
        'masonry-item grid-w1 grid-h2', // portrait rectangle
        'masonry-item grid-w1 grid-h1', // square
        'masonry-item grid-w1 grid-h1', // square
      ];
      return mobileSizes[index % mobileSizes.length];
    }
    
    // Enhanced small screen masonry pattern - more varied like larger screens
    if (screenSize === 'sm') {
      const smallSizes = [
        'masonry-item grid-w1 grid-h1', // square
        'masonry-item grid-w1 grid-h1', // square
        'masonry-item grid-w1 grid-h2', // portrait
        'masonry-item grid-w2 grid-h1', // landscape
        'masonry-item grid-w1 grid-h1', // square
        'masonry-item grid-w1 grid-h2', // portrait
        'masonry-item grid-w1 grid-h1', // square
        'masonry-item grid-w1 grid-h1', // square
        'masonry-item grid-w2 grid-h2', // large square
        'masonry-item grid-w1 grid-h1', // square
        'masonry-item grid-w1 grid-h3', // tall portrait
        'masonry-item grid-w1 grid-h1', // square
      ];
      return smallSizes[index % smallSizes.length];
    }
    
    // Medium screens - more variety like Instagram feed
    if (screenSize === 'md') {
      const mediumSizes = [
        'masonry-item grid-w1 grid-h1', // square
        'masonry-item grid-w1 grid-h1', // square
        'masonry-item grid-w1 grid-h2', // portrait
        'masonry-item grid-w2 grid-h1', // landscape
        'masonry-item grid-w1 grid-h1', // square
        'masonry-item grid-w1 grid-h1', // square
        'masonry-item grid-w2 grid-h2', // large square
        'masonry-item grid-w1 grid-h1', // square
        'masonry-item grid-w1 grid-h2', // portrait
        'masonry-item grid-w1 grid-h1', // square
      ];
      return mediumSizes[index % mediumSizes.length];
    }
    
    // Large screens - professional Instagram-style layout
    const professionalSizes = [
      'masonry-item grid-w1 grid-h1', // square
      'masonry-item grid-w1 grid-h1', // square
      'masonry-item grid-w1 grid-h2', // portrait
      'masonry-item grid-w1 grid-h1', // square
      'masonry-item grid-w2 grid-h1', // landscape
      'masonry-item grid-w1 grid-h1', // square
      'masonry-item grid-w1 grid-h1', // square
      'masonry-item grid-w1 grid-h2', // portrait
      'masonry-item grid-w2 grid-h2', // featured large
      'masonry-item grid-w1 grid-h1', // square
      'masonry-item grid-w1 grid-h1', // square
      'masonry-item grid-w1 grid-h1', // square
    ];
    return professionalSizes[index % professionalSizes.length];
  };

  // Initialize masonry
  const initMasonry = () => {
    if (masonryRef.current && photos.length > 0) {
      if (masonryInstance.current) {
        masonryInstance.current.destroy();
      }
      
      masonryInstance.current = new Masonry(masonryRef.current, {
        itemSelector: '.masonry-item',
        columnWidth: '.masonry-sizer',
        gutter: '.masonry-gutter',
        percentPosition: true,
        fitWidth: true,
        transitionDuration: '0.3s',
        stagger: 30,
        resize: true,
      });
    }
  };

  // Handle window resize for responsive behavior
  useEffect(() => {
    const getScreenSize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 480) return 'xs';
        if (window.innerWidth < 768) return 'sm';
        if (window.innerWidth < 1024) return 'md';
        if (window.innerWidth < 1280) return 'lg';
        return 'xl';
      }
      return 'md';
    };

    const handleResize = () => {
      const newScreenSize = getScreenSize();
      if (newScreenSize !== screenSize) {
        setScreenSize(newScreenSize);
      }
      
      if (masonryInstance.current) {
        setTimeout(() => {
          masonryInstance.current.layout();
        }, 100);
      }
    };

    // Set initial screen size
    setScreenSize(getScreenSize());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [screenSize]);

  // Effect to reinitialize masonry when photos or screen size changes
  useEffect(() => {
    if (photos.length > 0) {
      // Wait for images to load before initializing masonry
      const timer = setTimeout(() => {
        initMasonry();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [photos, screenSize]);

  // Cleanup masonry on unmount
  useEffect(() => {
    return () => {
      if (masonryInstance.current) {
        masonryInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="w-full">
      {/* Photos Grid */}
      {loading && photos.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D6A33E]"></div>
        </div>
      ) : photos.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-[#D6A33E] text-6xl mb-4">📷</div>
          <h3 className="text-xl font-medium text-white mb-2">No photos found</h3>
          <p className="text-gray-400">No photos available in this category.</p>
        </div>
      ) : (
        <>
          <div className="w-full mx-auto" style={{ maxWidth: '100%' }}>
            <div className="masonry-grid" ref={masonryRef}>
              {/* Masonry sizer for column width */}
              <div className="masonry-sizer"></div>
              <div className="masonry-gutter"></div>
              
              {photos.map((photo, index) => (
                <div
                  key={photo._id}
                  className={`${getMasonryItemClass(index)} group relative bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-800`}
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
                <div className="w-full h-full overflow-hidden">
                  <img
                    src={photo.transformations?.medium || photo.cloudinaryUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onLoad={() => {
                      // Reinitialize masonry when image loads
                      if (masonryInstance.current) {
                        masonryInstance.current.layout();
                      }
                    }}
                  />
                </div>

                {/* Overlay - Instagram style */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-end">
                  <div className="w-full p-3 text-white">
                    <h3 className="font-medium text-sm truncate mb-1">{photo.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-[#D6A33E] text-black px-2 py-1 rounded-full font-medium">
                        {photo.category}
                      </span>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="flex items-center space-x-1 text-gray-200">
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                            className={`h-3 w-3 ${photo.isLiked ? 'fill-current text-[#D6A33E]' : 'stroke-current text-gray-200'}`} 
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
          </div>
        </>
      )}
    </div>
  );
};

export default PhotoGallery;
