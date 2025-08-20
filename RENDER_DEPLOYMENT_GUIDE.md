# 🚀 Deploy Heard App to Render

This guide will help you deploy your Heard app to Render, a cloud platform that makes it easy to deploy web applications.

## Prerequisites

- Your code is pushed to GitHub (✅ Already done!)
- A Render account (free tier available)

## Step 1: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Verify your email address

## Step 2: Connect Your Repository

1. In your Render dashboard, click **"New +"**
2. Select **"Web Service"**
3. Connect your GitHub account if not already connected
4. Select your repository: `eodiceanne-star/heard_app_beta`

## Step 3: Configure the Web Service

Use these settings:

- **Name**: `heard-app-beta` (or any name you prefer)
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Plan**: `Free` (for testing)

## Step 4: Environment Variables

Add these environment variables in the Render dashboard:

```
NODE_ENV=production
PORT=10000
```

## Step 5: Deploy

1. Click **"Create Web Service"**
2. Render will automatically:
   - Clone your repository
   - Install dependencies
   - Build your Next.js app
   - Start the service

## Step 6: Access Your App

Once deployment is complete, you'll get a URL like:
`https://heard-app-beta.onrender.com`

## Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check the build logs in Render dashboard
   - Ensure all dependencies are in `package.json`
   - Verify the build command works locally

2. **App Won't Start**
   - Check the start command: `npm start`
   - Verify the PORT environment variable is set
   - Check the logs for any errors

3. **Static Assets Not Loading**
   - Ensure all images are in the `public` folder
   - Check that the build completed successfully

### Local Testing

Before deploying, test your production build locally:

```bash
npm run build
npm start
```

## Next Steps

After successful deployment:

1. **Custom Domain** (Optional)
   - Add your own domain in Render settings
   - Configure DNS records

2. **Environment Variables**
   - Add any API keys or configuration
   - Set up different environments (staging/production)

3. **Monitoring**
   - Set up health checks
   - Monitor performance and logs

## Mobile App Integration

Since your app is configured for mobile deployment with Capacitor:

1. **Web Version**: Deployed on Render
2. **Mobile Version**: Build separately for app stores
3. **Shared Codebase**: Both use the same React/Next.js code

## Support

- [Render Documentation](https://render.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Render Community](https://community.render.com)

---

**Your app will be live at**: `https://heard-app-beta.onrender.com` (or your custom domain)

🎉 **Congratulations! Your Heard app is now deployed and accessible worldwide!**
