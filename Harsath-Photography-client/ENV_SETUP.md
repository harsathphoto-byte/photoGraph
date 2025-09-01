# Environment Configuration

This document explains how to set up environment variables for the Harsath Photography client application.

## Quick Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Update the values in `.env` according to your environment.

## Environment Variables

### Required Variables

- `VITE_API_BASE_URL` - The base URL for your backend API
  - Development: `http://localhost:3001/api`
  - Production: `https://your-backend-url.vercel.app/api`

### Optional Variables

- `VITE_APP_NAME` - Application name (default: "Harsath Photography")
- `VITE_APP_VERSION` - Application version (default: "1.0.0")
- `VITE_APP_DESCRIPTION` - Application description
- `VITE_NODE_ENV` - Environment mode (`development` or `production`)
- `VITE_DEFAULT_PAGE_SIZE` - Default pagination size (default: 12)
- `VITE_MAX_UPLOAD_RETRIES` - Maximum upload retry attempts (default: 3)

## File Structure

- `.env` - Your actual environment variables (not committed to git)
- `.env.example` - Template file with example values
- `.env.local.example` - Local development overrides template
- `src/config/env.js` - Environment configuration helper

## Usage in Code

Instead of using `import.meta.env` directly, use the centralized config:

```javascript
import { config } from '../config/env';

// Use config values
const apiUrl = config.API_BASE_URL;
const appName = config.APP_NAME;

// Use utility functions
const endpoint = config.getApiUrl('/photos');
config.debug('Debug message'); // Only shows in development
```

## Development vs Production

### Development
```bash
VITE_API_BASE_URL=http://localhost:3001/api
VITE_NODE_ENV=development
```

### Production
```bash
VITE_API_BASE_URL=https://your-backend-url.vercel.app/api
VITE_NODE_ENV=production
```

## Security Notes

- Never commit `.env` files to version control
- Use `.env.example` to document required variables
- Keep production secrets secure
- Use different values for different environments

## Troubleshooting

1. **Environment variables not working?**
   - Make sure variable names start with `VITE_`
   - Restart the development server after changing .env
   - Check that .env is in the project root

2. **API calls failing?**
   - Verify `VITE_API_BASE_URL` is correct
   - Check that backend server is running
   - Ensure no trailing slashes in URLs
