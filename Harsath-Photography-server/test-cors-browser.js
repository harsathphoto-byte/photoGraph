// Test script to verify CORS and photo upload endpoint
const testCors = async () => {
  const frontendUrl = 'https://photo-graph-2pe6.vercel.app';
  const backendUrl = 'https://photo-graph-livid.vercel.app';
  
  console.log('Testing CORS between:');
  console.log('Frontend:', frontendUrl);
  console.log('Backend:', backendUrl);
  
  try {
    // Test preflight request
    const preflightResponse = await fetch(`${backendUrl}/api/photos/upload`, {
      method: 'OPTIONS',
      headers: {
        'Origin': frontendUrl,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type, Authorization'
      }
    });
    
    console.log('Preflight Response Status:', preflightResponse.status);
    console.log('Preflight Response Headers:', Object.fromEntries(preflightResponse.headers.entries()));
    
    // Test health endpoint
    const healthResponse = await fetch(`${backendUrl}/api/health`, {
      headers: {
        'Origin': frontendUrl
      }
    });
    
    const healthData = await healthResponse.json();
    console.log('Health Check:', healthData);
    
  } catch (error) {
    console.error('CORS Test Failed:', error);
  }
};

// Run test if in browser
if (typeof window !== 'undefined') {
  testCors();
} else {
  console.log('This script should be run in a browser console');
}
