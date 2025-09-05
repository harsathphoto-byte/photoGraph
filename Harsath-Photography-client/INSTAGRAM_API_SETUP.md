# Instagram Graph API Integration Guide

This guide explains how to integrate the Instagram Basic Display API with your Harsath Photography website to display real Instagram posts.

## Overview

The current implementation supports both **demo mode** (with realistic mock data) and **live Instagram API** integration. When no valid Instagram access token is provided, the system automatically falls back to demo content.

## Quick Setup

1. **Copy Environment File**
   ```bash
   cp .env.example .env.local
   ```

2. **Add Your Instagram Access Token**
   ```bash
   # In .env.local
   REACT_APP_INSTAGRAM_ACCESS_TOKEN=your_actual_access_token_here
   ```

3. **Restart Development Server**
   ```bash
   npm run dev
   ```

## Instagram Basic Display API Setup

### Step 1: Create Instagram App

1. Go to [Facebook Developers](https://developers.facebook.com/apps/)
2. Click "Create App" → Choose "Consumer" → Fill app details
3. Add "Instagram Basic Display" product to your app

### Step 2: Configure Instagram Basic Display

1. In your app dashboard, go to "Instagram Basic Display" → "Basic Display"
2. Add Instagram Test Users (your Instagram account)
3. Set up Redirect URIs:
   - Development: `http://localhost:3000/auth/instagram`
   - Production: `https://yourdomain.com/auth/instagram`

### Step 3: Get Access Token

1. **Generate User Access Token** (for testing):
   ```
   https://api.instagram.com/oauth/authorize
     ?client_id={app-id}
     &redirect_uri={redirect-uri}
     &scope=user_profile,user_media
     &response_type=code
   ```

2. **Exchange Code for Token**:
   ```bash
   curl -X POST \
     https://api.instagram.com/oauth/access_token \
     -F client_id={app-id} \
     -F client_secret={app-secret} \
     -F grant_type=authorization_code \
     -F redirect_uri={redirect-uri} \
     -F code={code}
   ```

3. **Get Long-Lived Token** (60 days):
   ```bash
   curl -i -X GET "https://graph.instagram.com/access_token
     ?grant_type=ig_exchange_token
     &client_secret={app-secret}
     &access_token={short-lived-access-token}"
   ```

## API Features

### Available Endpoints

1. **User Profile**: `fetchInstagramProfile()`
   - Returns: username, account_type, media_count

2. **Media Posts**: `fetchInstagramPosts(limit)`
   - Returns: posts with images, captions, timestamps, engagement

3. **Token Refresh**: `refreshInstagramToken()`
   - Refreshes long-lived tokens (extends for another 60 days)

### Data Structure

```javascript
// Post object structure
{
  id: "post_id",
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM",
  media_url: "https://...",
  thumbnail_url: "https://...", // for videos
  caption: "Post caption text",
  permalink: "https://instagram.com/p/...",
  timestamp: "2024-01-01T00:00:00+0000",
  like_count: 123, // may not be available
  comments_count: 45 // may not be available
}
```

## Implementation Details

### Error Handling

The system gracefully handles various scenarios:

- **No Access Token**: Falls back to demo content
- **Expired Token**: Shows error message with refresh option
- **Rate Limiting**: Implements retry logic with exponential backoff
- **Network Errors**: Displays user-friendly error messages

### Token Management

```javascript
// Environment variables
REACT_APP_INSTAGRAM_ACCESS_TOKEN=your_token_here

// Automatic token refresh (call periodically)
const refreshResult = await refreshInstagramToken();
if (refreshResult.success) {
  // Update stored token
  console.log('New token:', refreshResult.access_token);
}
```

### Component Usage

```jsx
// Basic usage with live API
<InstagramPosts 
  postsToShow={12}
  showStats={true}
  showCaptions={false}
  gridCols="grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
/>

// Profile information
const profile = await fetchInstagramProfile();
console.log(`@${profile.data.username} has ${profile.data.media_count} posts`);
```

## Limitations & Considerations

### Instagram Basic Display API Limitations

- **Personal Use Only**: Can't be used for business/commercial purposes
- **Limited Data**: No insights, hashtags, or detailed engagement metrics
- **Test Users Only**: Can only access test users' data in development
- **Token Expiry**: Long-lived tokens expire after 60 days

### Instagram Graph API (Business Alternative)

For production/business use, consider Instagram Graph API:
- Requires Instagram Business/Creator account
- More features: insights, hashtags, mentions
- Better for commercial websites
- More complex setup with webhook verification

## Troubleshooting

### Common Issues

1. **"Access token expired"**
   - Solution: Refresh token using `refreshInstagramToken()`

2. **"Invalid access token"**
   - Check token format and permissions
   - Ensure app is in "Live" mode for production

3. **CORS errors**
   - Instagram API calls must be made from server-side
   - Consider implementing a backend proxy

4. **Rate limiting**
   - Implement caching to reduce API calls
   - Use the built-in retry mechanism

### Debug Mode

Enable debug logging:
```javascript
// In browser console
localStorage.setItem('instagram_debug', 'true');
```

## Production Deployment

1. **Environment Variables**:
   ```bash
   # Production .env
   REACT_APP_INSTAGRAM_ACCESS_TOKEN=prod_token_here
   REACT_APP_ENVIRONMENT=production
   ```

2. **Token Security**:
   - Store tokens securely (server-side preferred)
   - Implement token rotation
   - Monitor token expiration

3. **Caching Strategy**:
   - Cache Instagram posts to reduce API calls
   - Implement background refresh
   - Use CDN for media assets

## Support

For Instagram API issues:
- [Instagram Basic Display Documentation](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Instagram Graph API Documentation](https://developers.facebook.com/docs/instagram-api)
- [Facebook Developers Community](https://developers.facebook.com/community/)

For implementation help:
- Check browser console for detailed error messages
- Review network tab for API call responses
- Enable debug mode for verbose logging
