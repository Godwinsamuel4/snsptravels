# SN.SP Limited Travel Agency - Deployment Guide

## Overview

This application is a full-stack travel agency website with a Node.js/Express backend and React frontend. It's packaged and ready for deployment on various platforms.

## Pre-deployment Setup

1. Ensure all dependencies are installed:
   ```bash
   npm install
   ```

2. Build the application:
   ```bash
   npm run build
   ```

3. The build creates:
   - `dist/public/` - Static frontend assets
   - `dist/index.js` - Production server bundle
   - `attached_assets/` - Static assets (images, CSV data)

## Platform-Specific Deployment

### 1. Vercel (Recommended for Serverless)

**Files included:** `vercel.json`

**Steps:**
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`
4. The configuration automatically handles routing and static assets

**Features:**
- Automatic SSL
- CDN distribution
- Serverless functions
- Zero-config deployments

### 2. Netlify

**Files included:** `netlify.toml`

**Steps:**
1. Connect your repository to Netlify
2. Build settings are automatically configured via `netlify.toml`
3. Deploy command: `npm run build`
4. Publish directory: `dist/public`

**Features:**
- Continuous deployment
- Form handling
- Edge functions
- Split testing

### 3. Docker (Any Cloud Provider)

**Files included:** `Dockerfile`, `docker-compose.yml`

**Steps:**
```bash
# Build the image
docker build -t snsp-travel .

# Run locally
docker run -p 5000:5000 snsp-travel

# Or use docker-compose
docker-compose up -d
```

**Supported platforms:**
- AWS ECS/EKS
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform

### 4. Render

**Files included:** `render.yaml`

**Steps:**
1. Connect your repository to Render
2. The `render.yaml` file configures automatic deployment
3. Environment variables are set automatically

**Features:**
- Free tier available
- Automatic deployments
- Built-in database options
- SSL certificates

### 5. Railway

**Files included:** `railway.json`

**Steps:**
1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Deploy: `railway up`

**Features:**
- One-click deployments
- Environment variables
- Database integration
- Custom domains

### 6. Traditional VPS/Server

**Requirements:**
- Node.js 20+
- PM2 or similar process manager
- Reverse proxy (nginx/Apache)

**Steps:**
```bash
# Upload files to server
scp -r dist/ user@server:/path/to/app/
scp -r attached_assets/ user@server:/path/to/app/
scp package.json user@server:/path/to/app/

# Install dependencies on server
npm ci --only=production

# Start with PM2
pm2 start dist/index.js --name "snsp-travel"

# Configure nginx reverse proxy
# Proxy / to localhost:5000
# Serve /attached_assets directly
```

## Environment Variables

### Required
- `NODE_ENV=production`
- `PORT=5000` (or your preferred port)

### Optional
- Database connection strings (if using external database)
- Email service credentials (for contact forms)
- External API keys

## Production Checklist

- [ ] Application builds without errors (`npm run build`)
- [ ] All environment variables are set
- [ ] Static assets are accessible
- [ ] API endpoints respond correctly
- [ ] Forms submit successfully
- [ ] Email notifications work (if configured)
- [ ] SSL certificate is configured
- [ ] Domain is pointing to the deployment
- [ ] Monitoring/logging is set up

## Troubleshooting

### Build Issues
- Ensure Node.js 20+ is used
- Clear `node_modules` and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check for TypeScript errors: `npm run check`

### Runtime Issues
- Check server logs for errors
- Verify environment variables are set
- Ensure port 5000 is accessible
- Check file permissions for `attached_assets/`

### Performance
- The application is optimized for production
- Static assets are compressed
- CSS and JavaScript are minified
- Images are optimized during build

## Support

For deployment issues, refer to:
1. Platform-specific documentation
2. Application logs
3. Browser developer tools for frontend issues

## Security Notes

- Never commit sensitive environment variables
- Use platform-specific secret management
- Enable HTTPS/SSL on production
- Keep dependencies updated
- Implement proper CORS settings
- Validate all user inputs