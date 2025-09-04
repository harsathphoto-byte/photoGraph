// Simple test script to check CORS and photo upload endpoint
const express = require('express');
const cors = require('cors');

const app = express();

// Test CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    console.log('Request origin:', origin);
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      'https://photo-graph-2pe6.vercel.app',
      'https://photo-graph-livid.vercel.app'
    ];
    
    // Allow any Vercel deployment URLs for this project
    const isVercelDeployment = origin.includes('photo-graph') && origin.includes('vercel.app');
    
    if (allowedOrigins.includes(origin) || isVercelDeployment) {
      console.log('✅ Origin allowed:', origin);
      return callback(null, true);
    }
    
    console.log('❌ Origin blocked:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Test endpoint
app.post('/api/photos/upload', (req, res) => {
  console.log('Upload endpoint hit');
  console.log('Headers:', req.headers);
  res.json({ success: true, message: 'CORS working' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CORS test server running' });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`CORS test server running on port ${PORT}`);
});
