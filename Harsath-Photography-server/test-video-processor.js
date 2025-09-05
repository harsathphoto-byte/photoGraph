const VideoProcessor = require('./middleware/videoProcessor');

// Test video processor with a mock file
const mockVideoFile = {
  originalname: 'test-video.mp4',
  size: 50 * 1024 * 1024, // 50MB
  mimetype: 'video/mp4'
};

console.log('Testing Video Processor...');

// Test validation
const validation = VideoProcessor.validateVideo(mockVideoFile);
console.log('Validation result:', validation);

// Test recommendations
const recommendations = VideoProcessor.getCompressionRecommendations(mockVideoFile);
console.log('Recommendations:', recommendations);

console.log('Video processor test completed!');
