import { useState, useEffect } from 'react';
import { 
  fetchInstagramPosts, 
  fetchInstagramProfile, 
  refreshInstagramToken 
} from '../utils/instagram';
import { HiRefresh, HiCheck, HiX, HiExclamation } from "@react-icons/all-files/hi/HiRefresh";

const InstagramApiTest = () => {
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  const runTest = async (testName, testFunction) => {
    setLoading(true);
    setTestResults(prev => ({ 
      ...prev, 
      [testName]: { status: 'running', message: 'Testing...' }
    }));

    try {
      const result = await testFunction();
      setTestResults(prev => ({ 
        ...prev, 
        [testName]: { 
          status: result.success ? 'success' : 'warning', 
          message: result.message || 'Test completed',
          data: result
        }
      }));
      return result;
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        [testName]: { 
          status: 'error', 
          message: error.message,
          error: error
        }
      }));
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const testProfile = () => runTest('profile', fetchInstagramProfile);
  
  const testPosts = () => runTest('posts', () => fetchInstagramPosts(6));
  
  const testTokenRefresh = () => runTest('tokenRefresh', refreshInstagramToken);

  const runAllTests = async () => {
    const profileResult = await testProfile();
    if (profileResult.data) setProfile(profileResult.data);

    const postsResult = await testPosts();
    if (postsResult.data) setPosts(postsResult.data);

    await testTokenRefresh();
  };

  // Auto-run tests on component mount
  useEffect(() => {
    runAllTests();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'running': return <div className="animate-spin w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full" />;
      case 'success': return <HiCheck className="w-4 h-4 text-green-500" />;
      case 'warning': return <HiExclamation className="w-4 h-4 text-yellow-500" />;
      case 'error': return <HiX className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'border-green-500/30 bg-green-900/20';
      case 'warning': return 'border-yellow-500/30 bg-yellow-900/20';
      case 'error': return 'border-red-500/30 bg-red-900/20';
      default: return 'border-gray-500/30 bg-gray-900/20';
    }
  };

  return (
    <div className="bg-[#111111] min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-[#B8860B] mb-4">
            Instagram API Integration Test
          </h1>
          <p className="text-gray-300">
            Test and verify Instagram Graph API connectivity
          </p>
        </div>

        {/* Test Controls */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={runAllTests}
            disabled={loading}
            className="flex items-center space-x-2 bg-[#B8860B] text-[#111111] px-6 py-3 rounded-lg font-medium hover:bg-[#DAA520] transition-colors disabled:opacity-50"
          >
            <HiRefresh className="w-4 h-4" />
            <span>Run All Tests</span>
          </button>
        </div>

        {/* Test Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Test */}
          <div className={`border rounded-lg p-6 ${getStatusColor(testResults.profile?.status)}`}>
            <div className="flex items-center space-x-3 mb-4">
              {getStatusIcon(testResults.profile?.status)}
              <h3 className="text-lg font-medium text-white">Profile Test</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              {testResults.profile?.message || 'Test Instagram profile API endpoint'}
            </p>
            {profile && (
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-400">Username:</span> <span className="text-white">@{profile.username}</span></div>
                <div><span className="text-gray-400">Account Type:</span> <span className="text-white">{profile.account_type}</span></div>
                <div><span className="text-gray-400">Media Count:</span> <span className="text-white">{profile.media_count}</span></div>
              </div>
            )}
          </div>

          {/* Posts Test */}
          <div className={`border rounded-lg p-6 ${getStatusColor(testResults.posts?.status)}`}>
            <div className="flex items-center space-x-3 mb-4">
              {getStatusIcon(testResults.posts?.status)}
              <h3 className="text-lg font-medium text-white">Posts Test</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              {testResults.posts?.message || 'Test Instagram posts API endpoint'}
            </p>
            {posts.length > 0 && (
              <div className="text-sm">
                <div className="text-gray-400 mb-2">Fetched {posts.length} posts:</div>
                <div className="grid grid-cols-3 gap-1">
                  {posts.slice(0, 6).map((post, index) => (
                    <div key={post.id || index} className="aspect-square bg-gray-800 rounded overflow-hidden">
                      <img 
                        src={post.media_url} 
                        alt={`Post ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Token Refresh Test */}
          <div className={`border rounded-lg p-6 ${getStatusColor(testResults.tokenRefresh?.status)}`}>
            <div className="flex items-center space-x-3 mb-4">
              {getStatusIcon(testResults.tokenRefresh?.status)}
              <h3 className="text-lg font-medium text-white">Token Refresh Test</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              {testResults.tokenRefresh?.message || 'Test Instagram token refresh endpoint'}
            </p>
            {testResults.tokenRefresh?.data?.expires_in && (
              <div className="text-sm">
                <div><span className="text-gray-400">Expires in:</span> <span className="text-white">{testResults.tokenRefresh.data.expires_in} seconds</span></div>
              </div>
            )}
          </div>
        </div>

        {/* Configuration Info */}
        <div className="border border-gray-700 rounded-lg p-6 bg-gray-900/50">
          <h3 className="text-lg font-medium text-[#B8860B] mb-4">Configuration Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-2">Environment Variables</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Access Token:</span>
                  <span className={import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN ? 'text-green-400' : 'text-red-400'}>
                    {import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN ? 'Configured' : 'Missing'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Use Proxy:</span>
                  <span className="text-white">
                    {import.meta.env.VITE_USE_INSTAGRAM_PROXY === 'true' ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">API Base URL:</span>
                  <span className="text-white">
                    {import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">API Status</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Profile API:</span>
                  <span className={testResults.profile?.status === 'success' ? 'text-green-400' : 'text-yellow-400'}>
                    {testResults.profile?.status === 'success' ? 'Connected' : 'Demo Mode'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Posts API:</span>
                  <span className={testResults.posts?.status === 'success' ? 'text-green-400' : 'text-yellow-400'}>
                    {testResults.posts?.status === 'success' ? 'Connected' : 'Demo Mode'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Data Source:</span>
                  <span className="text-white">
                    {testResults.posts?.data?.source || 'Unknown'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Setup Instructions */}
        {(!import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN || 
          import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN === 'your_access_token_here') && (
          <div className="border border-yellow-500/30 bg-yellow-900/20 rounded-lg p-6 mt-6">
            <h3 className="text-yellow-400 font-medium mb-3">🔧 Setup Required</h3>
            <p className="text-gray-300 mb-4">
              To connect to Instagram API, please configure your access token:
            </p>
            <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
              <li>Copy <code className="bg-gray-800 px-2 py-1 rounded">.env.example</code> to <code className="bg-gray-800 px-2 py-1 rounded">.env.local</code></li>
              <li>Add your Instagram Basic Display API access token</li>
              <li>Restart the development server</li>
              <li>See <code className="bg-gray-800 px-2 py-1 rounded">INSTAGRAM_API_SETUP.md</code> for detailed instructions</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstagramApiTest;
