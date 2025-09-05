const Photo = require('../models/Photo');
const { deleteImage, generateTransformations } = require('../config/cloudinary');

class PhotoService {
  
  /**
   * Parse FormData fields that come as JSON strings
   */
  static parseFormData(body) {
    const { category, locationName } = body;

    return {
      category,
      location: locationName ? { name: locationName } : {},
      isPublic: true, // Default to public since private option was removed
      tags: [], // Default empty tags since tags field was removed
      title: `Photo - ${category}`, // Auto-generate title from category
      description: '', // Default empty description since description field was removed
      capturedAt: new Date()
    };
  }

  /**
   * Create a new photo
   */
  static async createPhoto(photoData, file, userId) {
    try {
      const parsedData = this.parseFormData(photoData);

      // CloudinaryStorage uses different property names
      const cloudinaryUrl = file.secure_url || file.path || file.url;
      const cloudinaryPublicId = file.public_id || file.filename;

      if (!cloudinaryUrl || !cloudinaryPublicId) {
        throw new Error('Failed to get Cloudinary URL or public ID from uploaded file');
      }

      const photo = new Photo({
        ...parsedData,
        cloudinaryUrl,
        cloudinaryPublicId,
        uploadedBy: userId,
        metadata: {
          width: file.width,
          height: file.height,
          format: file.format,
          size: file.bytes || file.size
        }
      });

      await photo.save();
      await photo.populate('uploadedBy', 'username firstName lastName');

      const transformations = generateTransformations(file.public_id);

      return {
        ...photo.toJSON(),
        transformations
      };
    } catch (error) {
      // Clean up uploaded file if photo creation fails
      if (file && file.public_id) {
        await deleteImage(file.public_id);
      }
      throw error;
    }
  }

  /**
   * Get photos with filtering and pagination
   */
  static async getPhotos(filters, user) {
    console.log('🔍 PhotoService.getPhotos called with filters:', filters);
    
    const {
      page = 1,
      limit = 12,
      category,
      tags,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      isPublic
    } = filters;

    const skip = (page - 1) * limit;

    // Build query
    let query = {};

    // Public filter - non-admin users can only see public photos
    if (!user || user.role !== 'admin') {
      query.isPublic = true;
    } else if (isPublic !== undefined) {
      query.isPublic = isPublic;
    }

    // Category filter
    if (category && category !== '') {
      console.log('🎯 Filtering by category:', category);
      query.category = category;
    } else {
      console.log('⚠️ No category filter applied, category value:', category);
    }

    // Tags filter
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      if (tagArray.length > 0) {
        query.tags = { $in: tagArray };
      }
    }

    // Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query
    console.log('📋 Final query:', JSON.stringify(query, null, 2));
    const [photos, total] = await Promise.all([
      Photo.find(query)
        .populate('uploadedBy', 'username firstName lastName')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Photo.countDocuments(query)
    ]);

    console.log(`✅ Found ${photos.length} photos for query`);

    // Add transformations to each photo
    const photosWithTransformations = photos.map(photo => ({
      ...photo,
      transformations: generateTransformations(photo.cloudinaryPublicId)
    }));

    return {
      photos: photosWithTransformations,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalPhotos: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    };
  }

  /**
   * Get a single photo by ID
   */
  static async getPhotoById(id, user) {
    const photo = await Photo.findById(id)
      .populate('uploadedBy', 'username firstName lastName');

    if (!photo) {
      throw new Error('Photo not found');
    }

    // Check if user can view this photo
    if (!photo.isPublic && (!user || (user.role !== 'admin' && photo.uploadedBy._id.toString() !== user._id.toString()))) {
      throw new Error('Access denied');
    }

    // Increment view count
    await Photo.findByIdAndUpdate(id, { $inc: { views: 1 } });

    const transformations = generateTransformations(photo.cloudinaryPublicId);

    return {
      ...photo.toJSON(),
      transformations
    };
  }

  /**
   * Update a photo
   */
  static async updatePhoto(id, updateData, user) {
    const photo = await Photo.findById(id);

    if (!photo) {
      throw new Error('Photo not found');
    }

    // Check permissions
    if (user.role !== 'admin' && photo.uploadedBy.toString() !== user._id.toString()) {
      throw new Error('Access denied');
    }

    // Update photo
    Object.assign(photo, updateData);
    await photo.save();
    await photo.populate('uploadedBy', 'username firstName lastName');

    const transformations = generateTransformations(photo.cloudinaryPublicId);

    return {
      ...photo.toJSON(),
      transformations
    };
  }

  /**
   * Delete a photo
   */
  static async deletePhoto(id, user) {
    const photo = await Photo.findById(id);

    if (!photo) {
      throw new Error('Photo not found');
    }

    // Check permissions
    if (user.role !== 'admin' && photo.uploadedBy.toString() !== user._id.toString()) {
      throw new Error('Access denied');
    }

    // Delete from Cloudinary
    await deleteImage(photo.cloudinaryPublicId);

    // Delete from database
    await Photo.findByIdAndDelete(id);

    return { message: 'Photo deleted successfully' };
  }

  /**
   * Toggle photo like
   */
  static async toggleLike(id, userId) {
    const photo = await Photo.findById(id);

    if (!photo) {
      throw new Error('Photo not found');
    }

    if (!photo.isPublic) {
      throw new Error('Cannot like private photos');
    }

    const userLikeIndex = photo.likes.indexOf(userId);
    let action;

    if (userLikeIndex > -1) {
      // User already liked, remove like
      photo.likes.splice(userLikeIndex, 1);
      action = 'unliked';
    } else {
      // Add like
      photo.likes.push(userId);
      action = 'liked';
    }

    await photo.save();

    return {
      action,
      likesCount: photo.likes.length,
      isLiked: action === 'liked'
    };
  }
}

module.exports = PhotoService;
