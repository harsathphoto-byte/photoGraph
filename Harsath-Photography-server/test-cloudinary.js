require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log('Testing Cloudinary configuration...');
console.log('Cloud name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API key:', process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not set');
console.log('API secret:', process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not set');

// Test direct upload
async function testUpload() {
  try {
    console.log('Testing direct upload...');
    const result = await cloudinary.uploader.upload('./test_image.png', {
      folder: 'harsath-photography',
      public_id: 'test_direct_upload'
    });
    
    console.log('Upload successful!');
    console.log('Result:', {
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes
    });
    
    // Clean up
    await cloudinary.uploader.destroy(result.public_id);
    console.log('Cleanup successful');
    
  } catch (error) {
    console.error('Upload failed:', error.message);
    console.error('Error details:', error);
  }
}

testUpload();
