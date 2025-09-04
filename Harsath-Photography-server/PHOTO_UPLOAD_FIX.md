# Photo Upload Issue Fix

## Problem

CORS error when admin uploads photos from the Vercel-deployed frontend:

- Frontend URL: https://photo-graph-2pe6.vercel.app
- Backend URL: https://photo-graph-livid.vercel.app
- Error: Access to XMLHttpRequest blocked by CORS policy

## Solution Applied

### 1. Updated CORS Configuration

- Added both Vercel deployment URLs to allowed origins
- Implemented dynamic origin checking for all photo-graph Vercel deployments
- Added explicit preflight request handling

### 2. Enhanced Error Handling

- Added detailed logging to photo upload controller
- Improved CORS error messages
- Added multer-specific error handling

### 3. Environment Updates

- Updated CLIENT_URL in .env to production URL

## Files Modified

1. **server.js**

   - Enhanced CORS configuration with dynamic origin checking
   - Added preflight request handler
   - Improved error handling middleware

2. **controllers/photoController.js**

   - Added comprehensive logging for photo uploads
   - Better error messages and debugging info

3. **.env**
   - Updated CLIENT_URL to production frontend URL

## Deployment Steps

1. Deploy the updated server code to Vercel
2. Test photo upload from admin panel
3. Check server logs for any remaining issues

## Testing

After deployment, verify:

- [ ] Admin can access photo upload page
- [ ] Photo upload form submits without CORS errors
- [ ] Photos are successfully uploaded to Cloudinary
- [ ] Photos appear in the gallery

## Debugging Commands

If issues persist, check:

```bash
# Check server logs
vercel logs https://photo-graph-livid.vercel.app

# Test CORS manually
curl -H "Origin: https://photo-graph-2pe6.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     https://photo-graph-livid.vercel.app/api/photos/upload
```

## Additional Notes

The CORS configuration now allows:

- All localhost development ports
- Both current Vercel deployment URLs
- Any future photo-graph\*.vercel.app deployments
- Configured CLIENT_URL from environment variables
