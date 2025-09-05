#!/bin/bash

echo "Testing Video Upload Functionality"
echo "=================================="

# Check if server is running
echo "1. Checking server health..."
HEALTH=$(curl -s http://localhost:3001/api/health)
if [[ $HEALTH == *"OK"* ]]; then
    echo "✅ Server is running"
else
    echo "❌ Server is not responding"
    echo "Starting server..."
    node server.js &
    SERVER_PID=$!
    sleep 5
fi

# Test login
echo "2. Testing login..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"Admin123"}')

if [[ $LOGIN_RESPONSE == *"success\":true"* ]]; then
    echo "✅ Login successful"
    TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
    echo "Token: ${TOKEN:0:50}..."
else
    echo "❌ Login failed"
    echo "Response: $LOGIN_RESPONSE"
    exit 1
fi

# Check if video file exists
echo "3. Checking video file..."
if [ -f "/home/gowtham/Downloads/20mb.mp4" ]; then
    echo "✅ Video file exists"
    FILE_SIZE=$(stat -f%z "/home/gowtham/Downloads/20mb.mp4" 2>/dev/null || stat -c%s "/home/gowtham/Downloads/20mb.mp4")
    echo "File size: $FILE_SIZE bytes"
else
    echo "❌ Video file not found"
    exit 1
fi

# Test video upload
echo "4. Testing video upload..."
UPLOAD_RESPONSE=$(curl -s -X POST http://localhost:3001/api/videos/upload-media \
  -H "Authorization: Bearer $TOKEN" \
  -F "media=@/home/gowtham/Downloads/20mb.mp4" \
  -F "category=wedding" \
  -F "locationName=Test Location")

echo "Upload Response:"
echo "$UPLOAD_RESPONSE"

if [[ $UPLOAD_RESPONSE == *"success\":true"* ]]; then
    echo "✅ Video upload successful!"
else
    echo "❌ Video upload failed"
fi

echo "=================================="
echo "Test completed"
