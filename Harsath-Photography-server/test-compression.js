const ImageCompression = require('./middleware/imageCompression');
const fs = require('fs');
const path = require('path');

// Test compression with a sample image (if available)
async function testCompression() {
  try {
    console.log('🧪 Testing Sharp image compression...');
    
    // Check if test image exists
    const testImagePath = path.join(__dirname, 'test_image.jpg');
    
    if (!fs.existsSync(testImagePath)) {
      console.log('⚠️ No test image found. Create a test_image.jpg in the server root to test compression.');
      console.log('✅ Sharp module is ready for use when images are uploaded.');
      return;
    }

    // Read test image
    const imageBuffer = fs.readFileSync(testImagePath);
    console.log('📁 Test image loaded:', (imageBuffer.length / 1024 / 1024).toFixed(2), 'MB');

    // Test compression
    const compressedBuffer = await ImageCompression.compressImage(imageBuffer, {
      maxWidth: 1920,
      maxHeight: 1080,
      quality: 85,
      format: 'jpeg'
    });

    console.log('✅ Compression test successful!');
    console.log('📊 Original size:', (imageBuffer.length / 1024 / 1024).toFixed(2), 'MB');
    console.log('📊 Compressed size:', (compressedBuffer.length / 1024 / 1024).toFixed(2), 'MB');
    console.log('📉 Reduction:', (((imageBuffer.length - compressedBuffer.length) / imageBuffer.length) * 100).toFixed(1) + '%');

  } catch (error) {
    console.error('❌ Compression test failed:', error.message);
  }
}

testCompression();
