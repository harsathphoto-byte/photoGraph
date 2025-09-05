# Instagram Integration Setup

This document explains how to set up real Instagram API integration for the Harsath Photography website.

## Current Status
- ✅ **Demo Mode**: Currently using realistic mock data for demonstration
- 🔄 **Ready for Instagram API**: Code is prepared for real Instagram integration
- 📸 **Photography-focused Content**: Mock data showcases relevant photography content

## Demo Content
The current implementation displays:
- Wedding photography posts
- Baby/newborn sessions
- Traditional/cultural photography
- Fashion portraits
- Family photos
- Pre-wedding shoots
- Behind-the-scenes content
- Professional headshots
- Event photography
- Maternity sessions
- Artistic portraits

## Setting Up Real Instagram Integration

### Step 1: Instagram Basic Display API Setup

1. **Create Facebook App**
   - Go to [Facebook for Developers](https://developers.facebook.com/)
   - Click "My Apps" → "Create App"
   - Choose "Consumer" app type
   - Fill in app details

2. **Add Instagram Basic Display Product**
   - In your app dashboard, click "Add Product"
   - Select "Instagram Basic Display"
   - Click "Set Up"

3. **Configure Instagram App**
   - Go to Instagram Basic Display → Basic Display
   - Add your website domain
   - Add redirect URIs (for OAuth)
   - Save changes

### Step 2: Get Access Token

1. **Instagram Test User**
   - Go to Instagram Basic Display → Basic Display
   - Scroll to "User Token Generator"
   - Click "Add or Remove Instagram Testers"
   - Add the Instagram account (@harsath_photography)

2. **Generate Access Token**
   - Use the User Token Generator
   - Follow Instagram OAuth flow
   - Copy the generated access token

### Step 3: Configure Environment Variables

Create a `.env` file in your project root:

```env
# Instagram API Configuration
REACT_APP_INSTAGRAM_ACCESS_TOKEN=your_long_lived_access_token_here
REACT_APP_INSTAGRAM_APP_ID=your_app_id_here
REACT_APP_INSTAGRAM_APP_SECRET=your_app_secret_here
```

### Step 4: Token Refresh (Important!)

Instagram access tokens expire. Set up automatic refresh:

```javascript
// Add to your Instagram utility
export const refreshInstagramToken = async () => {
  const response = await fetch(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`
  );
  // Handle token refresh logic
};
```

## API Endpoints Used

The integration uses these Instagram Graph API endpoints:

1. **Get Media** (currently implemented)
   ```
   GET https://graph.instagram.com/me/media
   ?fields=id,media_type,media_url,thumbnail_url,caption,permalink,timestamp
   &access_token={access-token}
   ```

2. **Get Media Details** (can be added)
   ```
   GET https://graph.instagram.com/{media-id}
   ?fields=id,media_type,media_url,caption,permalink,timestamp,like_count,comments_count
   &access_token={access-token}
   ```

## Features Included

### Current Features
- ✅ Grid display of Instagram posts
- ✅ Image and video post support
- ✅ Like and comment counts
- ✅ Post captions with truncation
- ✅ Direct links to Instagram posts
- ✅ Loading states and error handling
- ✅ Responsive design
- ✅ Hover effects and animations
- ✅ Follow button with correct Instagram link

### Ready to Enable
- ✅ Real Instagram API integration
- ✅ Automatic token refresh
- ✅ Error fallback to demo content
- ✅ Rate limiting handling

## Customization Options

The `InstagramPosts` component accepts these props:

```jsx
<InstagramPosts 
  postsToShow={12}          // Number of posts to display
  showStats={true}          // Show likes/comments on hover
  showCaptions={false}      // Show captions below images
  gridCols="grid-cols-2 md:grid-cols-4 lg:grid-cols-6"  // Grid layout
/>
```

## Rate Limits & Best Practices

### Instagram API Limits
- **Basic Display API**: 200 requests per hour per user
- **Media refresh**: Once per hour recommended
- **Token lifespan**: 60 days (refresh before expiry)

### Best Practices
1. **Cache posts locally** for better performance
2. **Refresh tokens automatically** before expiry
3. **Handle API errors gracefully** with fallback content
4. **Respect rate limits** with appropriate delays
5. **Optimize images** for faster loading

## Testing

### Demo Mode Testing
- Posts load with realistic photography content
- All interactive features work (hover, links, etc.)
- Responsive design across devices
- Loading states and animations

### API Mode Testing
When real Instagram API is connected:
- Verify posts load from actual Instagram account
- Test error handling when API is unavailable
- Confirm token refresh mechanism works
- Validate rate limiting behavior

## Troubleshooting

### Common Issues
1. **No posts loading**: Check access token validity
2. **API errors**: Verify app permissions and user approval
3. **Rate limit errors**: Implement proper caching and delays
4. **Token expiry**: Set up automatic refresh system

### Debug Mode
Add this to your environment for debugging:
```env
REACT_APP_DEBUG_INSTAGRAM=true
```

## Production Deployment

### Environment Variables
Ensure these are set in production:
- `REACT_APP_INSTAGRAM_ACCESS_TOKEN`
- `REACT_APP_INSTAGRAM_APP_ID`

### Security Notes
- Never expose app secret in frontend code
- Use environment variables for sensitive data
- Implement proper CORS policies
- Regular token rotation recommended

## Support

For Instagram API issues:
- [Instagram Basic Display API Documentation](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Facebook Developer Community](https://developers.facebook.com/community/)

For implementation questions:
- Check the `src/utils/instagram.js` file for API integration
- Review `src/components/InstagramPosts.jsx` for UI components
- Test with demo data first before connecting real API
