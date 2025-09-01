const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Photo title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  cloudinaryUrl: {
    type: String,
    required: [true, 'Cloudinary URL is required']
  },
  cloudinaryPublicId: {
    type: String,
    required: [true, 'Cloudinary public ID is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['wedding', 'baby-shower', 'fashion', 'newborn', 'traditional'],
    default: 'traditional'
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  metadata: {
    width: Number,
    height: Number,
    format: String,
    size: Number, // in bytes
    colorSpace: String
  },
  location: {
    name: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  capturedAt: {
    type: Date,
    default: Date.now
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: {
      type: String,
      required: true,
      maxlength: [300, 'Comment cannot exceed 300 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  views: {
    type: Number,
    default: 0
  },
  downloads: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better performance
photoSchema.index({ category: 1, isPublic: 1 });
photoSchema.index({ uploadedBy: 1 });
photoSchema.index({ tags: 1 });
photoSchema.index({ isFeatured: 1, isPublic: 1 });
photoSchema.index({ createdAt: -1 });
photoSchema.index({ cloudinaryPublicId: 1 }, { unique: true }); // Ensure unique Cloudinary IDs

// Virtual for like count
photoSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for comment count
photoSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

// Ensure virtuals are included when converting to JSON
photoSchema.set('toJSON', { virtuals: true });

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
