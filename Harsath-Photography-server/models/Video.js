const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  category: {
    type: String,
    required: true,
    enum: [
      'wedding',
      'baby-shower',
      'fashion',
      'newborn',
      'traditional'
    ],
    default: 'traditional'
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  cloudinaryId: {
    type: String,
    required: true,
    unique: true
  },
  url: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  format: {
    type: String,
    required: true
  },
  duration: {
    type: Number, // Duration in seconds
    default: 0
  },
  resolution: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  frameRate: {
    type: Number,
    default: 0
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
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
      trim: true,
      maxlength: 500
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  metadata: {
    codec: String,
    bitrate: Number,
    aspectRatio: String,
    colorSpace: String
  }
}, {
  timestamps: true
});

// Indexes for better query performance
videoSchema.index({ category: 1, isPrivate: 1, createdAt: -1 });
videoSchema.index({ tags: 1, isPrivate: 1 });
videoSchema.index({ uploadedBy: 1 });
videoSchema.index({ cloudinaryId: 1 });
videoSchema.index({ title: 'text', description: 'text', tags: 'text' });

// Virtual for like count
videoSchema.virtual('likeCount').get(function() {
  return this.likes ? this.likes.length : 0;
});

// Virtual for comment count
videoSchema.virtual('commentCount').get(function() {
  return this.comments ? this.comments.length : 0;
});

// Method to check if user has liked the video
videoSchema.methods.isLikedByUser = function(userId) {
  return this.likes.some(like => like.user.toString() === userId.toString());
};

// Method to add like
videoSchema.methods.addLike = function(userId) {
  if (!this.isLikedByUser(userId)) {
    this.likes.push({ user: userId });
  }
};

// Method to remove like
videoSchema.methods.removeLike = function(userId) {
  this.likes = this.likes.filter(like => like.user.toString() !== userId.toString());
};

// Method to add comment
videoSchema.methods.addComment = function(userId, text) {
  this.comments.push({
    user: userId,
    text: text
  });
};

// Method to remove comment
videoSchema.methods.removeComment = function(commentId) {
  this.comments = this.comments.filter(comment => comment._id.toString() !== commentId.toString());
};

// Method to increment views
videoSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Pre-save middleware to update the updatedAt field
videoSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

// Ensure virtual fields are serialized
videoSchema.set('toJSON', { virtuals: true });
videoSchema.set('toObject', { virtuals: true });

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
