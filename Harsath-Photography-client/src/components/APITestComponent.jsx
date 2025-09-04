import React, { useState } from 'react';
import { photoAPI } from '../services/api';

const APITestComponent = () => {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    setTestResult(null);
    
    try {
      console.log('🧪 Testing API connection...');
      
      // Test 1: Basic health check (if available)
      try {
        const healthResponse = await fetch('https://photo-graph-livid.vercel.app/api/health');
        const healthData = await healthResponse.json();
        console.log('✅ Health check:', healthData);
      } catch (error) {
        console.log('❌ Health check failed:', error.message);
      }
      
      // Test 2: Get photos for baby-shower category
      const params = { category: 'baby-shower', limit: 5 };
      console.log('🧪 Testing getPhotos with params:', params);
      
      const result = await photoAPI.getPhotos(params);
      console.log('✅ getPhotos result:', result);
      
      setTestResult({
        success: true,
        message: 'API connection successful',
        data: result,
        photosCount: result?.photos?.length || 0
      });
      
    } catch (error) {
      console.error('❌ API test failed:', error);
      setTestResult({
        success: false,
        message: error.message,
        error: error
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg m-4">
      <h3 className="text-white text-lg font-bold mb-4">API Test</h3>
      
      <button
        onClick={testAPI}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test API Connection'}
      </button>
      
      {testResult && (
        <div className={`mt-4 p-4 rounded ${testResult.success ? 'bg-green-800' : 'bg-red-800'}`}>
          <h4 className="text-white font-bold">
            {testResult.success ? '✅ Success' : '❌ Error'}
          </h4>
          <p className="text-white">{testResult.message}</p>
          {testResult.success && (
            <p className="text-white">
              Found {testResult.photosCount} photos in baby-shower category
            </p>
          )}
          <details className="mt-2">
            <summary className="text-white cursor-pointer">Show Details</summary>
            <pre className="text-xs text-white mt-2 overflow-auto">
              {JSON.stringify(testResult, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};

export default APITestComponent;
