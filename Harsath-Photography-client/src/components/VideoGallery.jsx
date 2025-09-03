import React, { useState, useEffect } from 'react';
import { videoAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const VideoGallery = ({ category, userId, featured, onVideoClick }) => {
  const { user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch videos
  const fetchVideos = async (page = 1) => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 12,
        sort: 'newest'
      };

      // Add specific filters
      if (category) params.category = category;
      if (userId) params.uploadedBy = userId;
      if (featured !== undefined) params.featured = featured;

      // Clean up undefined and empty values
      Object.keys(params).forEach(key => {
        if (params[key] === undefined || params[key] === null || params[key] === '') {
          delete params[key];
        }
      });

      const response = await videoAPI.getVideos(params);
      
      if (response && response.data && response.data.videos) {
        if (page === 1) {
          setVideos(response.data.videos);
        } else {
          setVideos(prev => [...prev, ...response.data.videos]);
        }
        
        setPagination(response.data.pagination || {});
      } else {
        setVideos([]);
        setPagination({});
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
      toast.error(error.message || 'Failed to load videos');
      setVideos([]);
      setPagination({});
    } finally {
      setLoading(false);
    }
  };

  // Load more videos
  const loadMore = () => {
    if (pagination.hasNextPage && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchVideos(nextPage);
    }
  };

  // Handle delete (admin only)
  const handleDelete = async (videoId, videoTitle) => {
    if (!user || user.role !== 'admin') {
      toast.error('Admin access required');
      return;
    }

    if (!window.confirm(`Are you sure you want to delete "${videoTitle}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await videoAPI.deleteVideo(videoId);
      setVideos(prev => prev.filter(video => video._id !== videoId));
      toast.success('Video deleted successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Initial load and when category changes
  useEffect(() => {
    setCurrentPage(1);
    fetchVideos(1);
  }, [category, userId, featured]);

  // Format duration from seconds to MM:SS
  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Videos Grid */}
      {loading && videos.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8860B]"></div>
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-[#B8860B] text-6xl mb-4">🎬</div>
          <h3 className="text-xl font-medium text-white mb-2">No videos found</h3>
          <p className="text-gray-400">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <div
                key={video._id}
                className="group relative bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-800"
                onClick={() => onVideoClick && onVideoClick(video)}
              >
                {/* Admin Delete Button */}
                {user && user.role === 'admin' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(video._id, video.title);
                    }}
                    className="absolute top-2 right-2 z-10 w-8 h-8 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center hover:bg-red-700"
                    title="Delete Video"
                  >
                    ×
                  </button>
                )}

                {/* Video Thumbnail */}
                <div className="aspect-video overflow-hidden relative">
                  {video.transformations?.thumbnail ? (
                    <img
                      src={video.transformations.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <div className="text-[#B8860B] text-4xl">🎬</div>
                    </div>
                  )}
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#B8860B] rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Duration Badge */}
                  {video.duration && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {formatDuration(video.duration)}
                    </div>
                  )}
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <div className="flex items-center justify-center">
                    <span className="text-xs bg-[#B8860B] text-black px-2 py-1 rounded font-medium">
                      {video.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {pagination.hasNextPage && (
            <div className="text-center">
              <button
                onClick={loadMore}
                disabled={loading}
                className="px-8 py-3 bg-[#B8860B] text-black font-medium rounded-lg hover:bg-[#DAA520] focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {loading ? 'Loading...' : 'Load More Videos'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VideoGallery;
