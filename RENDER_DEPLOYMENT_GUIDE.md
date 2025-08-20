# 🚀 Render Deployment Guide for Heard App

## 📋 Prerequisites

1. **GitHub Repository**: Your Heard app should be pushed to GitHub
2. **Render Account**: Sign up at https://render.com
3. **Node.js**: Ensure your app works with Node.js 18+ (Render's default)

## 🔧 Configuration Files

### **render.yaml** (Already Created)
This file configures your deployment:
```yaml
services:
  - type: web
    name: heard-app
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 3000
    healthCheckPath: /
    autoDeploy: true
    branch: main
    plan: starter
```

### **package.json** (Updated)
The start script has been updated to use the PORT environment variable:
```json
"start": "next start -p $PORT"
```

## 🌐 Deployment Steps

### **Step 1: Connect to Render**

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click "New +"** → **"Web Service"**
3. **Connect your GitHub repository**
4. **Select the Heard app repository**

### **Step 2: Configure the Service**

1. **Name**: `heard-app` (or your preferred name)
2. **Environment**: `Node`
3. **Build Command**: `npm install && npm run build`
4. **Start Command**: `npm start`
5. **Plan**: `Starter` (free tier)

### **Step 3: Environment Variables**

Add these environment variables in Render dashboard:

| Key | Value | Description |
|-----|-------|-------------|
| `NODE_ENV` | `production` | Production environment |
| `PORT` | `3000` | Port for the application |

### **Step 4: Deploy**

1. **Click "Create Web Service"**
2. **Wait for build to complete** (usually 2-5 minutes)
3. **Your app will be available at**: `https://your-app-name.onrender.com`

## 🔄 Auto-Deployment

- **Automatic**: Every push to `main` branch triggers deployment
- **Manual**: You can manually deploy from the Render dashboard
- **Rollback**: Previous deployments can be rolled back if needed

## 📱 Mobile App Integration

### **For Mobile App Testing**
Your deployed web app can be used as the web version for Capacitor:

1. **Update Capacitor Config**:
```json
{
  "server": {
    "url": "https://your-app-name.onrender.com",
    "cleartext": true
  }
}
```

2. **Sync Mobile App**:
```bash
npx cap sync
```

## 🔍 Troubleshooting

### **Common Issues**

1. **Build Fails**:
   - Check Node.js version compatibility
   - Ensure all dependencies are in `package.json`
   - Check build logs in Render dashboard

2. **App Not Loading**:
   - Verify `healthCheckPath` is correct
   - Check if PORT environment variable is set
   - Review application logs

3. **Environment Variables**:
   - Ensure all required env vars are set in Render
   - Check for typos in variable names

### **Logs and Monitoring**

- **Build Logs**: Available in Render dashboard during deployment
- **Runtime Logs**: View real-time logs in the dashboard
- **Health Checks**: Monitor app health status

## 🎯 Next Steps After Deployment

1. **Test Your App**: Visit your deployed URL
2. **Update Mobile App**: Point Capacitor to your deployed URL
3. **Set Up Custom Domain** (Optional): Add your own domain
4. **Monitor Performance**: Use Render's built-in monitoring

## 💰 Cost Considerations

- **Starter Plan**: Free tier available
- **Usage Limits**: Check Render's current free tier limits
- **Scaling**: Easy to upgrade to paid plans as needed

## 🔐 Security Notes

- **HTTPS**: Automatically enabled on Render
- **Environment Variables**: Securely stored in Render dashboard
- **No Sensitive Data**: Don't commit API keys to your repository

---

## 🎉 Your Heard App is Ready for the World!

Once deployed, your supportive healthcare app will be accessible to users worldwide, helping them feel heard and supported in their healthcare journey! 💚

**Deployment URL**: `https://your-app-name.onrender.com`
