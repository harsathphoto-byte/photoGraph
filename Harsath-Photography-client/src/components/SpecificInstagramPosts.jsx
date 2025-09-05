import { useState } from 'react';
import { HiHeart } from "@react-icons/all-files/hi/HiHeart";
import { HiChatAlt } from "@react-icons/all-files/hi/HiChatAlt";
import { HiExternalLink } from "@react-icons/all-files/hi/HiExternalLink";

const SpecificInstagramPosts = () => {
  const [loadedImages, setLoadedImages] = useState({});

  // Specific Instagram posts provided by the user
  const instagramPosts = [
    {
      id: 'DN6GOtKgVv3',
      url: 'https://www.instagram.com/p/DN6GOtKgVv3/',
      image: 'https://images.unsplash.com/photo-1632474095425-03b2a146cdc9?w=400&h=400&fit=crop',
      caption: 'Our love story just got an upgrade ❤️ Beautiful traditional engagement moments',
      likes: 100648,
      comments: 89
    },
    {
      id: 'DMdLu1hSCu6',
      url: 'https://www.instagram.com/p/DMdLu1hSCu6/?img_index=1',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
      caption: 'Stunning bridal portrait captured perfectly 💍',
      likes: 203,
      comments: 18
    },
    {
      id: 'DLoqaIMp-IT',
      url: 'https://www.instagram.com/p/DLoqaIMp-IT/?img_index=1',
      image: 'https://images.unsplash.com/photo-1631593823493-3b5b5b4e2e59?w=400&h=400&fit=crop',
      caption: 'Traditional wedding celebrations 🎉',
      likes: 189,
      comments: 15
    },
    {
      id: 'DLfQhKrJB6d',
      url: 'https://www.instagram.com/p/DLfQhKrJB6d/',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=400&fit=crop',
      caption: 'Candid moments that tell a story 📸',
      likes: 142,
      comments: 9
    },
    {
      id: 'DLZLl0HJERM',
      url: 'https://www.instagram.com/p/DLZLl0HJERM/?img_index=1',
      image: 'https://images.unsplash.com/photo-1585552404893-8e1c9c5e5baa?w=400&h=400&fit=crop',
      caption: 'Love in every frame 💕',
      likes: 167,
      comments: 21
    },
    {
      id: 'DLXyto3Seph',
      url: 'https://www.instagram.com/p/DLXyto3Seph/?img_index=1',
      image: 'https://images.unsplash.com/photo-1594736797933-d0d6d5de1e8d?w=400&h=400&fit=crop',
      caption: 'Precious family moments 👨‍👩‍👧‍👦',
      likes: 134,
      comments: 7
    },
    {
      id: 'DLO4YmTJwl4',
      url: 'https://www.instagram.com/p/DLO4YmTJwl4/',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=400&fit=crop',
      caption: 'Reception celebrations in full swing 🎊',
      likes: 178,
      comments: 13
    },
    {
      id: 'DLMhPfcp8zi',
      url: 'https://www.instagram.com/p/DLMhPfcp8zi/',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=400&fit=crop',
      caption: 'Golden hour magic ✨',
      likes: 245,
      comments: 19
    },
    {
      id: 'DLAOMwEJH51',
      url: 'https://www.instagram.com/p/DLAOMwEJH51/',
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop',
      caption: 'Traditional ceremonies captured beautifully 🙏',
      likes: 156,
      comments: 11
    },
    {
      id: 'DK8yElXJHtx',
      url: 'https://www.instagram.com/p/DK8yElXJHtx/?img_index=1',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
      caption: 'Sweet baby photoshoot moments 👶',
      likes: 198,
      comments: 16
    },
    {
      id: 'DK7DdG0S6S2',
      url: 'https://www.instagram.com/p/DK7DdG0S6S2/',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c3434db2?w=400&h=400&fit=crop',
      caption: 'Portrait perfection 📷',
      likes: 167,
      comments: 8
    },
    {
      id: 'DK6cWChpzYr',
      url: 'https://www.instagram.com/p/DK6cWChpzYr/',
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop',
      caption: 'Behind the scenes magic ✨',
      likes: 123,
      comments: 6
    },
    {
      id: 'DK4YufvpFHd',
      url: 'https://www.instagram.com/p/DK4YufvpFHd/',
      image: 'https://images.unsplash.com/photo-1525258735679-12f69f7fbdea?w=400&h=400&fit=crop',
      caption: 'Elegant couple portraits 💑',
      likes: 187,
      comments: 14
    },
    {
      id: 'DK3Zj4MJgPN',
      url: 'https://www.instagram.com/p/DK3Zj4MJgPN/',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      caption: 'Creative photography sessions 🎨',
      likes: 164,
      comments: 10
    },
    {
      id: 'DJ817lhpj9i',
      url: 'https://www.instagram.com/p/DJ817lhpj9i/?img_index=1',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      caption: 'Artistic wedding photography 🎭',
      likes: 215,
      comments: 22
    }
  ];

  const handleImageLoad = (postId) => {
    setLoadedImages(prev => ({ ...prev, [postId]: true }));
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
      {instagramPosts.map((post) => (
        <div key={post.id} className="group relative">
          <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden glass-dark hover-lift border border-[#B8860B]/20">
            {/* Loading placeholder */}
            {!loadedImages[post.id] && (
              <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-[#B8860B] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            {/* Post Image */}
            <img
              src={post.url}
              alt={post.caption}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                loadedImages[post.id] ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => handleImageLoad(post.id)}
              loading="lazy"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-center text-white p-2 lg:p-3">
                <div className="flex items-center justify-center space-x-3 mb-2 lg:mb-3">
                  <div className="flex items-center space-x-1">
                    <HiHeart className="w-3 h-3 lg:w-4 lg:h-4" />
                    <span className="text-xs lg:text-sm">{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <HiChatAlt className="w-3 h-3 lg:w-4 lg:h-4" />
                    <span className="text-xs lg:text-sm">{post.comments}</span>
                  </div>
                </div>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 lg:space-x-2 bg-[#B8860B] text-[#111111] px-2 py-1 lg:px-3 lg:py-2 rounded-full text-xs lg:text-sm font-medium hover:bg-[#DAA520] transition-colors"
                >
                  <HiExternalLink className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">View</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Caption (visible on larger screens) */}
          <div className="hidden xl:block mt-2">
            <p className="text-gray-400 text-xs line-clamp-2">
              {post.caption}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpecificInstagramPosts;
