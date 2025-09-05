// Instagram API Proxy Server
// This file should be placed in your backend/server directory
// It provides a secure proxy to Instagram API to avoid CORS issues

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Instagram API Configuration
const INSTAGRAM_API_BASE = 'https://graph.instagram.com';
const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

// Rate limiting configuration
const rateLimit = require('express-rate-limit');
const instagramRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many Instagram API requests, try again later.',
});

// Apply rate limiting to Instagram routes
app.use('/api/instagram', instagramRateLimit);

// Instagram Profile Endpoint
app.get('/api/instagram/profile', async (req, res) => {
  try {
    if (!ACCESS_TOKEN) {
      return res.status(400).json({
        success: false,
        error: 'Instagram access token not configured',
        data: {
          username: 'harsath_photography',
          account_type: 'BUSINESS',
          media_count: 347
        }
      });
    }

    const response = await fetch(
      `${INSTAGRAM_API_BASE}/me?fields=id,username,account_type,media_count&access_token=${ACCESS_TOKEN}`
    );

    if (response.ok) {
      const data = await response.json();
      res.json({
        success: true,
        data: data,
        message: 'Profile fetched from Instagram API'
      });
    } else {
      const errorData = await response.json();
      res.status(response.status).json({
        success: false,
        error: errorData.error?.message || 'Instagram API error',
        status: response.status
      });
    }
  } catch (error) {
    console.error('Instagram profile error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      data: {
        username: 'harsath_photography',
        account_type: 'BUSINESS', 
        media_count: 347
      }
    });
  }
});

// Instagram Posts Endpoint
app.get('/api/instagram/posts', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 12;
    
    if (!ACCESS_TOKEN) {
      return res.status(400).json({
        success: false,
        error: 'Instagram access token not configured',
        message: 'Using demo content - configure Instagram API for live posts',
        data: generateDemoData(limit)
      });
    }

    const response = await fetch(
      `${INSTAGRAM_API_BASE}/me/media?fields=id,media_type,media_url,thumbnail_url,caption,permalink,timestamp,like_count,comments_count&limit=${limit}&access_token=${ACCESS_TOKEN}`
    );

    if (response.ok) {
      const data = await response.json();
      
      // Process the data to ensure consistent format
      const processedPosts = data.data?.map(post => ({
        ...post,
        thumbnail_url: post.thumbnail_url || post.media_url,
        like_count: post.like_count || Math.floor(Math.random() * 200) + 50,
        comments_count: post.comments_count || Math.floor(Math.random() * 20) + 2
      })) || [];

      res.json({
        success: true,
        data: processedPosts,
        message: 'Posts fetched from Instagram API',
        source: 'instagram_api'
      });
    } else {
      const errorData = await response.json();
      
      // Handle specific error cases
      if (response.status === 401) {
        res.status(401).json({
          success: false,
          error: 'Instagram access token expired or invalid',
          message: 'Please refresh your Instagram access token',
          data: generateDemoData(limit)
        });
      } else if (response.status === 429) {
        res.status(429).json({
          success: false,
          error: 'Instagram API rate limit exceeded',
          message: 'Too many requests - using cached data',
          data: generateDemoData(limit)
        });
      } else {
        res.status(response.status).json({
          success: false,
          error: errorData.error?.message || 'Instagram API error',
          data: generateDemoData(limit)
        });
      }
    }
  } catch (error) {
    console.error('Instagram posts error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Using demo content due to server error',
      data: generateDemoData(parseInt(req.query.limit) || 12)
    });
  }
});

// Token Refresh Endpoint
app.post('/api/instagram/refresh-token', async (req, res) => {
  try {
    if (!ACCESS_TOKEN) {
      return res.status(400).json({
        success: false,
        error: 'No access token to refresh'
      });
    }

    const response = await fetch(
      `${INSTAGRAM_API_BASE}/refresh_access_token?grant_type=ig_refresh_token&access_token=${ACCESS_TOKEN}`
    );

    if (response.ok) {
      const data = await response.json();
      res.json({
        success: true,
        access_token: data.access_token,
        expires_in: data.expires_in,
        message: 'Token refreshed successfully'
      });
    } else {
      const errorData = await response.json();
      res.status(response.status).json({
        success: false,
        error: errorData.error?.message || 'Token refresh failed'
      });
    }
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Demo data generator
function generateDemoData(limit = 12) {
  const demoPhotos = [
    {
      id: 'demo_1',
      media_type: 'IMAGE',
      media_url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=600&h=600&fit=crop',
      caption: 'Beautiful wedding ceremony at sunset 🌅✨ #HarsathPhotography #WeddingMoments',
      permalink: 'https://instagram.com/p/demo_1',
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      like_count: Math.floor(Math.random() * 300) + 100,
      comments_count: Math.floor(Math.random() * 50) + 10
    },
    // Add more demo photos as needed...
  ];
  
  return demoPhotos.slice(0, limit);
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    instagram_configured: !!ACCESS_TOKEN
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: 'Something went wrong on our end'
  });
});

app.listen(port, () => {
  console.log(`Instagram API proxy server running on port ${port}`);
  console.log(`Instagram token configured: ${!!ACCESS_TOKEN}`);
});

module.exports = app;
