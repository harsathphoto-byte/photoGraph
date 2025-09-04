# Production URL Configuration Verification

## Frontend Production URL

✅ **Confirmed:** `https://photo-graph-2pe6.vercel.app/`

## Backend Production URL

✅ **Confirmed:** `https://photo-graph-livid.vercel.app/`

## Current Configuration Status

### 1. Client Configuration (`vercel.json`)

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://photo-graph-livid.vercel.app/api/:path*"
    }
  ],
  "env": {
    "VITE_API_BASE_URL": "https://photo-graph-livid.vercel.app/api"
  }
}
```

✅ **Status:** Correctly configured

### 2. Server CORS Configuration (`server.js`)

```javascript
const allowedOrigins = [
  "https://photo-graph-2pe6.vercel.app", // ✅ Frontend URL included
  "https://photo-graph-livid.vercel.app", // ✅ Backend URL included
  // ... other origins
];
```

✅ **Status:** Frontend URL properly included in CORS

### 3. Environment Variables (`.env`)

```bash
CLIENT_URL=https://photo-graph-2pe6.vercel.app
```

✅ **Status:** Correctly set

## URL Standardization

| Component | URL                                        | Status        |
| --------- | ------------------------------------------ | ------------- |
| Frontend  | `https://photo-graph-2pe6.vercel.app`      | ✅ Active     |
| Backend   | `https://photo-graph-livid.vercel.app`     | ✅ Active     |
| API Base  | `https://photo-graph-livid.vercel.app/api` | ✅ Configured |

## Testing Commands

### 1. Test Frontend Access

```bash
curl -I https://photo-graph-2pe6.vercel.app/
```

### 2. Test Backend Health

```bash
curl https://photo-graph-livid.vercel.app/api/health
```

### 3. Test CORS Configuration

```bash
curl -H "Origin: https://photo-graph-2pe6.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type, Authorization" \
     -X OPTIONS \
     https://photo-graph-livid.vercel.app/api/photos/upload
```

## Photo Upload Flow

1. **Frontend Form:** `https://photo-graph-2pe6.vercel.app/admin/upload`
2. **API Request:** `POST https://photo-graph-livid.vercel.app/api/photos/upload`
3. **CORS Check:** ✅ `photo-graph-2pe6.vercel.app` is in allowed origins
4. **Authentication:** Bearer token from localStorage
5. **File Upload:** Multer → Cloudinary
6. **Response:** Photo data returned to frontend

## Ready for Production ✅

All configurations are properly set for the production URLs:

- Frontend: `https://photo-graph-2pe6.vercel.app/`
- Backend: `https://photo-graph-livid.vercel.app/`

The photo upload CORS issue should be resolved with these configurations.
