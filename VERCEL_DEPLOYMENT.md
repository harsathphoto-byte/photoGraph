# Vercel Deployment Guide

## 📁 Project Structure
```
photoGraph/
├── Harsath Photography client/    # Frontend (React + Vite)
│   └── vercel.json
└── Harsath Photography server/    # Backend (Node.js + Express)
    └── vercel.json
```

## 🚀 Deployment Steps

### 1. Backend Deployment

1. **Connect Repository**: Connect your GitHub repository to Vercel
2. **Project Settings**:
   - Root Directory: `Harsath Photography server`
   - Framework Preset: `Other`
   - Build Command: Leave empty
   - Output Directory: Leave empty
   - Install Command: `npm install`

3. **Environment Variables** (Add these in Vercel Dashboard):
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   PORT=3001
   ```

4. **Deploy**: Click deploy and note the deployment URL

### 2. Frontend Deployment

1. **Create New Project** in Vercel
2. **Project Settings**:
   - Root Directory: `Harsath Photography client`
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables**:
   ```
   VITE_API_BASE_URL=https://your-backend-url.vercel.app
   VITE_APP_NAME=Harsath Photography
   ```

4. **Update API URL**: Replace `https://your-backend-url.vercel.app` in the frontend vercel.json with your actual backend URL

## 🔧 Post-Deployment Configuration

### Update Frontend API Configuration
After backend deployment, update the API base URL in your frontend:

1. Update `vercel.json` in frontend:
   ```json
   "routes": [
     {
       "src": "/api/(.*)",
       "dest": "https://your-actual-backend-url.vercel.app/api/$1"
     }
   ]
   ```

2. Update environment variables in Vercel dashboard

### Update CORS Settings
Make sure your backend CORS configuration allows your frontend domain:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-frontend-url.vercel.app'
  ]
}));
```

## 📋 Checklist

- [ ] Backend deployed with all environment variables
- [ ] Frontend deployed with correct API URL
- [ ] CORS configured properly
- [ ] MongoDB Atlas IP whitelist updated (allow all: 0.0.0.0/0)
- [ ] Cloudinary credentials working
- [ ] Test API endpoints
- [ ] Test file upload functionality
- [ ] Test authentication flow

## 🐛 Troubleshooting

### Common Issues:

1. **500 Internal Server Error**: Check environment variables and logs
2. **CORS Errors**: Update CORS configuration with frontend URL
3. **Database Connection**: Ensure MongoDB URI is correct and IP is whitelisted
4. **File Upload Issues**: Verify Cloudinary credentials
5. **API Not Found**: Check routing in vercel.json

### Vercel Logs:
```bash
vercel logs [deployment-url]
```

## 🔄 Continuous Deployment

Both projects will auto-deploy when you push to the main branch. Make sure to:
1. Test locally before pushing
2. Check deployment logs for any errors
3. Test production URLs after deployment
