
# Deployment Guide for WeneedWe

This guide contains instructions for deploying the WeneedWe application to production environments.

## Prerequisites

- Node.js 14.x or higher
- npm or yarn
- Git

## Build Process

To build the application for production:

```bash
# Install dependencies
npm install

# Build the application
npm run build
```

The build output will be in the `dist` directory, which contains static files ready to be deployed to any hosting service.

## Testing Production Build Locally

Before deploying, you can preview the production build locally:

```bash
npm run preview
```

This will serve the built application at http://localhost:4173 by default.

## Deployment Options

### 1. Netlify

Netlify offers an easy deployment process:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy
```

Follow the prompts to complete the deployment.

### 2. Vercel

Vercel is optimized for React applications:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel
```

### 3. GitHub Pages

To deploy to GitHub Pages:

```bash
# Install gh-pages package
npm install -g gh-pages

# Deploy to GitHub Pages
gh-pages -d dist
```

### 4. Firebase Hosting

To deploy to Firebase:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (if not already done)
firebase init

# Deploy to Firebase
firebase deploy
```

### 5. Custom Web Server

The `dist` directory contains static files that can be served from any web server:

1. Upload the contents of the `dist` directory to your web server
2. Configure your web server to serve `index.html` for all routes (for SPA routing)

## Environment Variables

If your application uses environment variables, make sure to set them in your hosting provider's configuration:

- For Netlify: Set them in the "Build & deploy" settings
- For Vercel: Set them in the project settings
- For other platforms: Consult the platform's documentation

## Supabase Configuration

Since this application uses Supabase, ensure your production Supabase project is properly configured:

1. Create a production Supabase project if you haven't already
2. Update the Supabase URL and anon key in your production environment
3. Migrate your database schema and data to the production project
4. Configure RLS policies for production use

## Post-Deployment Checks

After deploying, verify:

1. The application loads correctly
2. Authentication works as expected
3. All API calls to Supabase are successful
4. Images and other assets load properly
5. Responsive design works across devices

## Troubleshooting

If you encounter issues with client-side routing, ensure your server is configured to redirect all requests to index.html.

For Netlify and Vercel, this is handled automatically. For custom servers, you may need to add specific configuration.
