#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting mobile app build process...\n');

// Step 1: Install dependencies
console.log('📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully\n');
} catch (error) {
  console.error('❌ Failed to install dependencies');
  process.exit(1);
}

// Step 2: Build Next.js app
console.log('🔨 Building Next.js app...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Next.js app built successfully\n');
} catch (error) {
  console.error('❌ Failed to build Next.js app');
  process.exit(1);
}

// Step 3: Initialize Capacitor (if not already done)
if (!fs.existsSync('ios') && !fs.existsSync('android')) {
  console.log('📱 Initializing Capacitor...');
  try {
    execSync('npx cap init Heard com.heardapp.mobile', { stdio: 'inherit' });
    console.log('✅ Capacitor initialized successfully\n');
  } catch (error) {
    console.error('❌ Failed to initialize Capacitor');
    process.exit(1);
  }
}

// Step 4: Add platforms (if not already added)
if (!fs.existsSync('ios')) {
  console.log('🍎 Adding iOS platform...');
  try {
    execSync('npx cap add ios', { stdio: 'inherit' });
    console.log('✅ iOS platform added successfully\n');
  } catch (error) {
    console.error('❌ Failed to add iOS platform');
    process.exit(1);
  }
}

if (!fs.existsSync('android')) {
  console.log('🤖 Adding Android platform...');
  try {
    execSync('npx cap add android', { stdio: 'inherit' });
    console.log('✅ Android platform added successfully\n');
  } catch (error) {
    console.error('❌ Failed to add Android platform');
    process.exit(1);
  }
}

// Step 5: Sync web assets to native platforms
console.log('🔄 Syncing web assets to native platforms...');
try {
  execSync('npx cap sync', { stdio: 'inherit' });
  console.log('✅ Assets synced successfully\n');
} catch (error) {
  console.error('❌ Failed to sync assets');
  process.exit(1);
}

// Step 6: Copy app icons and splash screens
console.log('🎨 Copying app assets...');
try {
  // Create directories if they don't exist
  const iosAssetsDir = path.join('ios', 'App', 'App', 'Assets.xcassets');
  const androidAssetsDir = path.join('android', 'app', 'src', 'main', 'res');
  
  if (!fs.existsSync(iosAssetsDir)) {
    fs.mkdirSync(iosAssetsDir, { recursive: true });
  }
  
  if (!fs.existsSync(androidAssetsDir)) {
    fs.mkdirSync(androidAssetsDir, { recursive: true });
  }
  
  console.log('✅ App assets prepared\n');
} catch (error) {
  console.error('❌ Failed to prepare app assets');
  process.exit(1);
}

console.log('🎉 Mobile app build process completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Open iOS project: npm run mobile:ios');
console.log('2. Open Android project: npm run mobile:android');
console.log('3. Build for iOS: npm run mobile:build:ios');
console.log('4. Build for Android: npm run mobile:build:android');
console.log('\n📱 Don\'t forget to:');
console.log('- Add app icons to the native projects');
console.log('- Configure signing certificates');
console.log('- Test on physical devices');
console.log('- Follow the APP_STORE_CHECKLIST.md');
