import { useState, useEffect } from 'react';
import { HiHeart } from "@react-icons/all-files/hi/HiHeart";
import { HiChatAlt } from "@react-icons/all-files/hi/HiChatAlt";
import { HiExternalLink } from "@react-icons/all-files/hi/HiExternalLink";
import { HiPhotograph } from "@react-icons/all-files/hi/HiPhotograph";
import { fetchInstagramPosts, getInstagramProfileUrl, formatInstagramDate, truncateCaption } from '../utils/instagram';

const InstagramPosts = ({ 
  postsToShow = 12, 
  showCaptions = false, 
  showStats = true,
  gridCols = "grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const loadInstagramPosts = async (isRetry = false) => {
    try {
      if (!isRetry) setLoading(true);
      setError(null);
      
      const response = await fetchInstagramPosts(postsToShow);
      
      if (response.success) {
        setPosts(response.data);
        setRetryCount(0);
        
        // Show info message based on data source
        if (response.source === 'demo_data' || response.source === 'fallback_data') {
          setError({ type: 'info', message: response.message });
        }
      } else {
        setError({ type: 'warning', message: response.message });
        setPosts(response.data || []); // Still show fallback data
      }
    } catch (err) {
      setError({ type: 'error', message: 'Failed to load Instagram posts' });
      console.error('Instagram posts error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      loadInstagramPosts(true);
    }
  };

  useEffect(() => {
    loadInstagramPosts();
  }, [postsToShow]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B8860B]"></div>
          <span className="text-gray-300 font-light">Loading Instagram posts...</span>
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className="w-2 h-2 bg-[#B8860B] rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className={`rounded-lg p-4 text-center ${
          error.type === 'info' 
            ? 'bg-blue-900/20 border border-blue-600/30' 
            : error.type === 'warning'
            ? 'bg-yellow-900/20 border border-yellow-600/30'
            : 'bg-red-900/20 border border-red-600/30'
        }`}>
          <p className={`text-sm ${
            error.type === 'info' 
              ? 'text-blue-400' 
              : error.type === 'warning'
              ? 'text-yellow-400'
              : 'text-red-400'
          }`}>
            {error.message}
          </p>
          {error.type === 'error' && retryCount < maxRetries && (
            <button 
              onClick={handleRetry}
              className="mt-2 text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
            >
              Retry ({retryCount + 1}/{maxRetries})
            </button>
          )}
        </div>
      )}
      
      <div className={`grid ${gridCols} gap-4`}>
        {posts.map((post, index) => (
          <div 
            key={post.id} 
            className={`group relative aspect-square overflow-hidden rounded-lg hover-lift animate-fadeInUp3D animate-delay-${(index + 1) * 50} bg-gray-800 border border-gray-700/50 hover:border-[#B8860B]/50 transition-all duration-300`}
          >
            {/* Media */}
            <div className="relative w-full h-full">
              <img 
                src={post.media_url || post.thumbnail_url}
                alt={truncateCaption(post.caption, 50)}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  e.target.src = `https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=400&h=400&fit=crop&auto=format`;
                }}
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4">
                {/* Stats at top */}
                {showStats && (
                  <div className="flex items-center justify-between text-white text-sm">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <HiHeart className="w-4 h-4 text-red-400" />
                        <span>{post.like_count || 0}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <HiChatAlt className="w-4 h-4 text-blue-400" />
                        <span>{post.comments_count || 0}</span>
                      </div>
                    </div>
                    {post.timestamp && (
                      <span className="text-xs text-gray-300">
                        {formatInstagramDate(post.timestamp)}
                      </span>
                    )}
                  </div>
                )}
                
                {/* Action button at bottom */}
                <div className="text-center">
                  {post.permalink && (
                    <a 
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-[#B8860B] text-[#111111] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#DAA520] transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      <HiExternalLink className="w-4 h-4" />
                      <span>View Post</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            {/* Caption overlay (if enabled) */}
            {showCaptions && post.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 to-transparent p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-xs leading-relaxed line-clamp-2">
                  {truncateCaption(post.caption, 100)}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* View More Button */}
      <div className="text-center pt-4">
        <a 
          href={getInstagramProfileUrl()} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#111111] px-8 py-3 rounded-full font-medium tracking-wide hover:scale-105 transition-all duration-300 hover-lift shadow-lg shadow-[#B8860B]/30 border border-[#B8860B]/30"
          style={{
            boxShadow: `
              0 4px 15px rgba(184, 134, 11, 0.3),
              0 2px 10px rgba(184, 134, 11, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `
          }}
        >
          <HiPhotograph className="w-5 h-5" />
          <span>Follow @harsath_photography</span>
          <HiExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default InstagramPosts;
