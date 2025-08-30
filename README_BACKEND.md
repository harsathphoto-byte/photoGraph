# Harsath Photography - Full Stack Application

A complete photography portfolio website with backend authentication and Cloudinary integration for image storage and management.

## Features

### Backend Features
- **User Authentication**: Register, login, logout with JWT tokens
- **Role-based Access**: Admin, Photographer, and Client roles
- **Photo Management**: Upload, view, edit, delete photos
- **Cloudinary Integration**: Automatic image optimization and transformations
- **Photo Interactions**: Like, comment, and view tracking
- **RESTful API**: Clean API endpoints for all operations

### Frontend Features
- **Modern UI**: Beautiful, responsive design with dark theme
- **Authentication**: Login/Register modals with form validation
- **Photo Upload**: Drag-and-drop photo upload for photographers/admins
- **Photo Gallery**: Filterable, searchable photo gallery with pagination
- **Interactive Features**: Like photos, view full-size images
- **Real-time Updates**: Toast notifications for user feedback

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd photoGraph
```

### 2. Backend Setup

```bash
cd "Harsath Photography server"
npm install
```

#### Configure Environment Variables
Update the `.env` file with your credentials:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/harsath_photography

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRES_IN=7d

# Cloudinary Configuration (Your credentials are already set)
CLOUDINARY_CLOUD_NAME=dhihqq9t4
CLOUDINARY_API_KEY=342889115573689
CLOUDINARY_API_SECRET=SOs22lI4WgZPdu9WKrMk0KbbIMg

# CORS Configuration
CLIENT_URL=http://localhost:5173
```

#### Start the Backend Server
```bash
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd "../Harsath Photography client"
npm install
```

#### Start the Frontend Development Server
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/change-password` - Change password
- `POST /api/auth/logout` - Logout user

### Photos
- `GET /api/photos` - Get all photos (with filtering/pagination)
- `GET /api/photos/:id` - Get single photo
- `POST /api/photos/upload` - Upload new photo (Photographer/Admin only)
- `PUT /api/photos/:id` - Update photo (Owner/Admin only)
- `DELETE /api/photos/:id` - Delete photo (Owner/Admin only)
- `POST /api/photos/:id/like` - Like/unlike photo
- `POST /api/photos/:id/comment` - Add comment to photo

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/:id/photos` - Get user's photos
- `PUT /api/users/:id/role` - Update user role (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

## User Roles

### Client (Default)
- View public photos
- Like and comment on photos
- View their own profile

### Photographer
- All client permissions
- Upload new photos
- Manage their own photos
- View upload analytics

### Admin
- All photographer permissions
- Manage all photos
- Manage users and roles
- Set featured photos
- Access admin dashboard

## Default Admin Setup

To create an admin user, you can either:

1. **Register normally** and manually update the role in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@example.com" }, 
  { $set: { role: "admin" } }
)
```

2. **Or modify the registration API** temporarily to create an admin account

## Photo Upload Features

### Supported Formats
- JPG, JPEG, PNG, GIF, WebP, BMP, TIFF
- Maximum file size: 10MB

### Automatic Optimizations
- Quality optimization
- Format conversion (WebP when supported)
- Multiple size variants (thumbnail, medium, large)
- Watermarking option

### Photo Metadata
- Title and description
- Category classification
- Tags for searchability
- Location information
- Privacy settings (public/private)

## Development Notes

### Environment Setup
- Backend runs on port 5000
- Frontend runs on port 5173
- CORS is configured to allow cross-origin requests

### Database Schema
- Users collection with authentication and profile data
- Photos collection with metadata and Cloudinary references
- Indexes for performance optimization

### Security Features
- JWT token authentication
- Password hashing with bcrypt
- Input validation with express-validator
- File type and size validation
- CORS protection

## Deployment Recommendations

### Backend
- Use MongoDB Atlas for production database
- Set strong JWT_SECRET in production
- Configure proper CORS origins
- Use PM2 for process management
- Set up SSL/HTTPS

### Frontend
- Build for production: `npm run build`
- Deploy to Vercel, Netlify, or similar
- Update API base URL for production

### Cloudinary
- Monitor usage and quotas
- Set up transformations for better performance
- Configure auto-backup if needed

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in .env

2. **Cloudinary Upload Failed**
   - Verify API credentials
   - Check file size and format

3. **CORS Errors**
   - Ensure CLIENT_URL matches frontend URL
   - Check if both servers are running

4. **Authentication Issues**
   - Clear browser localStorage
   - Check JWT_SECRET configuration

## Support

For issues or questions, please refer to the API documentation or check the server logs for detailed error messages.
