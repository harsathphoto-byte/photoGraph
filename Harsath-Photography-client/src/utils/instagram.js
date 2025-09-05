// Instagram utility functions
// For production use with real Instagram API, set up Instagram Basic Display API
// Get access token from: https://developers.facebook.com/docs/instagram-basic-display-api

const INSTAGRAM_USERNAME = 'harsath_photography';

// Real photography-themed mock data
const generateRealisticInstagramPosts = () => {
  const photographyData = [
    {
      id: 'post_wedding_1',
      media_type: 'IMAGE',
      media_url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400&h=400&fit=crop',
      caption: 'Magical moments from yesterday\'s wedding ceremony ✨💕 The love between these two souls was absolutely beautiful to capture! #WeddingPhotography #CoimbatoreWedding #LoveStory #HarsathPhotography #WeddingMoments',
      permalink: 'https://www.instagram.com/p/wedding_post_1/',
      timestamp: new Date(Date.now() - (1 * 24 * 60 * 60 * 1000)).toISOString(),
      like_count: 245,
      comments_count: 18
    },
    {
      id: 'post_baby_1',
      media_type: 'IMAGE',
      media_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
      caption: 'Sweet little angel during today\'s newborn session 👶✨ Those tiny fingers and peaceful expressions never fail to melt my heart! #NewbornPhotography #BabyPhotoshoot #CoimbatorePhotographer #PreciousMoments',
      permalink: 'https://www.instagram.com/p/baby_post_1/',
      timestamp: new Date(Date.now() - (2 * 24 * 60 * 60 * 1000)).toISOString(),
      like_count: 189,
      comments_count: 12
    },
    {
      id: 'post_traditional_1',
      media_type: 'IMAGE',
      media_url: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop',
      caption: 'Celebrating traditions and timeless beauty 🌺 Traditional photoshoot showcasing the rich cultural heritage of South India. #TraditionalPhotography #CulturalPortrait #SouthIndianTradition #HarsathPhotography',
      permalink: 'https://www.instagram.com/p/traditional_post_1/',
      timestamp: new Date(Date.now() - (3 * 24 * 60 * 60 * 1000)).toISOString(),
      like_count: 167,
      comments_count: 9
    },
    {
      id: 'post_fashion_1',
      media_type: 'IMAGE',
      media_url: 'https://images.unsplash.com/photo-1494790108755-2616c3434db2?w=400&h=400&fit=crop',
      caption: 'Fashion meets artistry 📸✨ Behind the scenes from our latest fashion photoshoot. Every frame tells a story of elegance and style! #FashionPhotography #PortraitPhotography #CoimbatorePhotographer #ArtisticVision',
      permalink: 'https://www.instagram.com/p/fashion_post_1/',
      timestamp: new Date(Date.now() - (4 * 24 * 60 * 60 * 1000)).toISOString(),
      like_count: 134,
      comments_count: 7
    },
    {
      id: 'post_couple_1',
      media_type: 'IMAGE',
      media_url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=400&fit=crop',
      caption: 'Pre-wedding magic captured! 💑 The chemistry between these two is absolutely incredible. Can\'t wait to capture their big day! #PreWeddingShoot #CouplePortrait #LoveInTheAir #WeddingPhotographer',
      permalink: 'https://www.instagram.com/p/couple_post_1/',
      timestamp: new Date(Date.now() - (5 * 24 * 60 * 60 * 1000)).toISOString(),
      like_count: 201,
      comments_count: 15
    },
    {
      id: 'post_portrait_2',
      media_type: 'IMAGE',
      media_url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=400&fit=crop',
      caption: 'Portrait session vibes ✨ Every face tells a unique story, and I love capturing the essence of each individual. #PortraitPhotography #PersonalBranding #Photography #CreativePortraits',
      permalink: 'https://www.instagram.com/p/portrait_post_2/',
      timestamp: new Date(Date.now() - (6 * 24 * 60 * 60 * 1000)).toISOString(),
      like_count: 156,
      comments_count: 11
    },
    {
      id: 'post_family_1',
      media_type: 'IMAGE',
      media_url: 'https://images.unsplash.com/photo-1511895426328-dc8714eba2d6?w=400&h=400&fit=crop',
      caption: 'Beautiful family moments captured 👨‍👩‍👧‍👦💕 Three generations of love and laughter in one frame. Family portraits that tell beautiful stories! #FamilyPortrait #GenerationsOfLove #FamilyPhotography #MemoriesMade',
      permalink: 'https://www.instagram.com/p/family_post_1/',
      timestamp: new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)).toISOString(),
      like_count: 178,
      comments_count: 13
    },
    {
      id: 'post_outdoor_1',
      media_type: 'IMAGE',
      media_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      caption: 'Golden hour magic in nature 🌅✨ Outdoor portrait session with this amazing couple. The natural lighting was absolutely perfect! #GoldenHour #OutdoorPhotography #NaturalLight #PortraitSession',
      permalink: 'https://www.instagram.com/p/outdoor_post_1/',
      timestamp: new Date(Date.now() - (8 * 24 * 60 * 60 * 1000)).toISOString(),
      like_count: 142,
      comments_count: 8
    },
    {
      id: 'post_studio_1',
      media_type: 'IMAGE',
      media_url: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=400&fit=crop',
      caption: 'Studio perfection ✨📸 Professional headshots with dramatic lighting. Every detail matters in creating the perfect portrait! #StudioPhotography #ProfessionalHeadshots #PortraitArt #LightingDesign',
      permalink: 'https://www.instagram.com/p/studio_post_1/',
      timestamp: new Date(Date.now() - (9 * 24 * 60 * 60 * 1000)).toISOString(),
      like_count: 119,
      comments_count: 6
    },
    {
      id: 'post_event_1',
      media_type: 'IMAGE',
      media_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop',
      caption: 'Corporate event coverage 🎉📷 Capturing professional moments and networking magic at today\'s business conference. #EventPhotography #CorporateEvents #BusinessPhotography #ProfessionalMoments',
      permalink: 'https://www.instagram.com/p/event_post_1/',
      timestamp: new Date(Date.now() - (10 * 24 * 60 * 60 * 1000)).toISOString(),
      like_count: 95,
      comments_count: 4
    },
    {
      id: 'post_maternity_1',
      media_type: 'IMAGE',
      media_url: 'https://images.unsplash.com/photo-1521503862198-2ae9a997bbc9?w=400&h=400&fit=crop',
      caption: 'Celebrating new life 🤱✨ Beautiful maternity session capturing the glow and excitement of expecting parents. Such a special time to document! #MaternityPhotography #ExpectingParents #NewLife #MomToBe',
      permalink: 'https://www.instagram.com/p/maternity_post_1/',
      timestamp: new Date(Date.now() - (11 * 24 * 60 * 60 * 1000)).toISOString(),
      like_count: 187,
      comments_count: 14
    },
    {
      id: 'post_artistic_1',
      media_type: 'IMAGE',
      media_url: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=400&h=400&fit=crop',
      caption: 'Artistic vision meets photography 🎨📸 Creative portrait session exploring light, shadow, and emotion. Art in every frame! #ArtisticPhotography #CreativePortrait #PhotographyAsArt #VisualStorytelling',
      permalink: 'https://www.instagram.com/p/artistic_post_1/',
      timestamp: new Date(Date.now() - (12 * 24 * 60 * 60 * 1000)).toISOString(),
      like_count: 213,
      comments_count: 16
    }
  ];

  return photographyData;
};

// Instagram Graph API configuration
const INSTAGRAM_API_BASE = 'https://graph.instagram.com';
const INSTAGRAM_BASIC_DISPLAY_BASE = 'https://graph.instagram.com';

// Check if we should use server proxy (recommended for production)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
const USE_SERVER_PROXY = import.meta.env.VITE_USE_INSTAGRAM_PROXY === 'true';

// Function to get Instagram access token from environment
const getAccessToken = () => {
  return import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
};

// Function to make API calls (with proxy support)
const makeInstagramApiCall = async (endpoint, params = {}) => {
  if (USE_SERVER_PROXY) {
    // Use server proxy (recommended for production)
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/api/instagram/${endpoint}${queryString ? '?' + queryString : ''}`;
    
    const response = await fetch(url);
    return await response.json();
  } else {
    // Direct client-side API call (development only)
    const accessToken = getAccessToken();
    if (!accessToken) throw new Error('No access token available');
    
    const queryParams = new URLSearchParams({
      ...params,
      access_token: accessToken
    }).toString();
    
    const response = await fetch(`${INSTAGRAM_API_BASE}/${endpoint}?${queryParams}`);
    
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Instagram API Error: ${response.status}`);
    }
  }
};

// Function to refresh Instagram access token
export const refreshInstagramToken = async () => {
  try {
    if (USE_SERVER_PROXY) {
      // Use server proxy
      const response = await fetch(`${API_BASE_URL}/api/instagram/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return await response.json();
    } else {
      // Direct API call
      const accessToken = getAccessToken();
      if (!accessToken) throw new Error('No access token available');

      const response = await fetch(
        `${INSTAGRAM_API_BASE}/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`
      );

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          access_token: data.access_token,
          expires_in: data.expires_in
        };
      } else {
        throw new Error(`Token refresh failed: ${response.status}`);
      }
    }
  } catch (error) {
    console.error('Error refreshing Instagram token:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Function to get Instagram user profile info
export const fetchInstagramProfile = async () => {
  try {
    if (USE_SERVER_PROXY) {
      // Use server proxy
      const result = await makeInstagramApiCall('profile');
      return result;
    } else {
      // Direct API call
      const data = await makeInstagramApiCall('me', {
        fields: 'id,username,account_type,media_count'
      });
      
      return {
        success: true,
        data: data,
        message: 'Profile fetched from Instagram API'
      };
    }
  } catch (error) {
    console.error('Error fetching Instagram profile:', error);
    return {
      success: false,
      data: {
        username: 'harsath_photography',
        account_type: 'BUSINESS',
        media_count: 347
      },
      message: 'Using demo profile data',
      error: error.message
    };
  }
};

// Function to fetch Instagram posts with enhanced error handling
export const fetchInstagramPosts = async (limit = 12) => {
  try {
    if (USE_SERVER_PROXY) {
      // Use server proxy (recommended)
      const result = await makeInstagramApiCall('posts', { limit });
      return result;
    } else {
      // Direct API call (development only)
      const accessToken = getAccessToken();
      
      // Check if we have a real Instagram access token
      if (accessToken && accessToken !== 'your_access_token_here' && accessToken.length > 20) {
        console.log('Using Instagram Graph API...');
        
        const data = await makeInstagramApiCall('me/media', {
          fields: 'id,media_type,media_url,thumbnail_url,caption,permalink,timestamp,like_count,comments_count',
          limit: limit
        });
        
        // Process the data to ensure consistent format
        const processedPosts = data.data?.map(post => ({
          ...post,
          thumbnail_url: post.thumbnail_url || post.media_url,
          like_count: post.like_count || Math.floor(Math.random() * 200) + 50,
          comments_count: post.comments_count || Math.floor(Math.random() * 20) + 2
        })) || [];

        return {
          success: true,
          data: processedPosts,
          message: 'Posts fetched from Instagram Graph API',
          source: 'instagram_api'
        };
      } else {
        console.log('Using demo content - Instagram API not configured');
        
        // Use realistic mock data
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
        
        const mockPosts = generateRealisticInstagramPosts();
        
        return {
          success: true,
          data: mockPosts.slice(0, limit),
          message: 'Using demo content (connect Instagram API for live posts)',
          source: 'demo_data'
        };
      }
    }
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    
    // Fallback to mock data on any error
    const mockPosts = generateRealisticInstagramPosts();
    
    return {
      success: false,
      data: mockPosts.slice(0, limit),
      message: 'Using demo content due to API error',
      source: 'fallback_data',
      error: error.message
    };
  }
};

// Function to fetch Instagram media insights (for business accounts)
export const fetchInstagramInsights = async (mediaId) => {
  try {
    const accessToken = getAccessToken();
    if (!accessToken) throw new Error('No access token available');

    const response = await fetch(
      `${INSTAGRAM_API_BASE}/${mediaId}/insights?metric=impressions,reach,likes,comments,saves&access_token=${accessToken}`
    );

    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        data: data.data,
        message: 'Insights fetched from Instagram API'
      };
    } else {
      throw new Error(`Instagram Insights API Error: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching Instagram insights:', error);
    return {
      success: false,
      data: [],
      message: 'Insights not available',
      error: error.message
    };
  }
};

// Function to get Instagram profile URL
export const getInstagramProfileUrl = () => {
  return `https://www.instagram.com/${INSTAGRAM_USERNAME}`;
};

// Function to format Instagram post date
export const formatInstagramDate = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
  return `${Math.floor(diffInHours / 168)}w ago`;
};

// Function to truncate caption
export const truncateCaption = (caption, maxLength = 100) => {
  if (!caption) return '';
  if (caption.length <= maxLength) return caption;
  return caption.substring(0, maxLength).trim() + '...';
};
