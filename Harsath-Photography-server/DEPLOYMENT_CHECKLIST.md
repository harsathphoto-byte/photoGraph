# 🚀 DEPLOYMENT CHECKLIST - Photo Upload CORS Fix

## 📋 Pre-Deployment Checklist

### Server Changes ✅

- [x] Updated CORS configuration in `server.js`
- [x] Added dynamic origin checking for Vercel deployments
- [x] Enhanced error handling and logging
- [x] Added preflight request handler
- [x] Updated `.env` with production CLIENT_URL

### Client Changes ✅

- [x] Updated `vercel.json` with correct backend URL
- [x] Added environment variables to Vercel config
- [x] Verified API service configuration

## 🚀 Deployment Steps

### 1. Deploy Backend First

```bash
cd Harsath-Photography-server
git add .
git commit -m "Fix CORS for photo uploads"
git push
# Or redeploy on Vercel manually
```

### 2. Deploy Frontend

```bash
cd Harsath-Photography-client
git add .
git commit -m "Update API URLs for production"
git push
# Or redeploy on Vercel manually
```

## 🧪 Testing After Deployment

### 1. Basic CORS Test

- [ ] Open browser dev tools
- [ ] Navigate to: https://photo-graph-2pe6.vercel.app
- [ ] Run this in console:

```javascript
fetch("https://photo-graph-livid.vercel.app/api/health", {
  headers: { Origin: "https://photo-graph-2pe6.vercel.app" },
})
  .then((r) => r.json())
  .then(console.log);
```

### 2. Admin Photo Upload Test

- [ ] Login as admin at: https://photo-graph-2pe6.vercel.app/login
- [ ] Navigate to admin panel
- [ ] Try uploading a photo
- [ ] Check browser network tab for errors
- [ ] Verify photo appears in gallery

### 3. Error Monitoring

- [ ] Check Vercel server logs: `vercel logs photo-graph-livid`
- [ ] Monitor console for any remaining CORS errors
- [ ] Test with different image formats (jpg, png, webp)

## 🐛 Troubleshooting

### If CORS errors persist:

1. Check if both deployments are using latest code
2. Verify environment variables in Vercel dashboard
3. Check server logs for origin detection
4. Try hard refresh (Ctrl+Shift+R) on frontend

### If uploads fail after CORS fix:

1. Check Cloudinary configuration
2. Verify authentication token is being sent
3. Check file size limits
4. Review server logs for detailed error messages

## 📊 Success Criteria

✅ **Deployment Successful When:**

- [ ] No CORS errors in browser console
- [ ] Admin can upload photos without errors
- [ ] Photos appear correctly in gallery
- [ ] Cloudinary receives uploaded images
- [ ] Server logs show successful upload flow

## 🔧 Quick Fixes

### If origin still blocked:

Add to server CORS config:

```javascript
origin: "*"; // Temporary - for testing only
```

### If client can't reach server:

Check client `config/env.js` API_BASE_URL matches deployed backend.

## 📞 Support Commands

```bash
# Check server status
curl https://photo-graph-livid.vercel.app/api/health

# Test CORS manually
curl -H "Origin: https://photo-graph-2pe6.vercel.app" \
     -X OPTIONS \
     https://photo-graph-livid.vercel.app/api/photos/upload

# View server logs
vercel logs photo-graph-livid

# View client logs
vercel logs photo-graph-2pe6
```

---

**Last Updated:** September 4, 2025
**Issue:** CORS blocking photo uploads from admin panel
**Status:** Ready for deployment
