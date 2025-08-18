# Mobile App Setup Guide - Heard

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Xcode 15+ (for iOS development)
- Android Studio (for Android development)
- Apple Developer Account (for iOS distribution)
- Google Play Console Account (for Android distribution)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Mobile App
```bash
npm run mobile:setup
```

### 3. Fix Avatar Display Issues
```bash
npm run fix:avatars
```

### 4. Test Mobile Build
```bash
npm run test:mobile
```

## 📱 Platform-Specific Setup

### iOS Development

#### Requirements
- macOS with Xcode 15+
- Apple Developer Account ($99/year)
- iOS 13.0+ deployment target

#### Setup Steps
1. **Open iOS Project**:
   ```bash
   npm run mobile:ios
   ```

2. **Configure Signing**:
   - Open `ios/App.xcworkspace` in Xcode
   - Select "App" target
   - Go to "Signing & Capabilities"
   - Add your Apple Developer Team
   - Update Bundle Identifier if needed

3. **Add App Icons**:
   - Replace placeholder icons in `ios/App/App/Assets.xcassets/AppIcon.appiconset/`
   - Required sizes: 20x20, 29x29, 40x40, 58x58, 60x60, 76x76, 80x80, 87x87, 120x120, 152x152, 167x167, 180x180, 1024x1024

4. **Build for Testing**:
   ```bash
   npm run mobile:build:ios
   ```

### Android Development

#### Requirements
- Android Studio
- Android SDK 33+
- Google Play Console Account ($25 one-time fee)

#### Setup Steps
1. **Open Android Project**:
   ```bash
   npm run mobile:android
   ```

2. **Configure Signing**:
   - Open `android/` in Android Studio
   - Go to "Build" → "Generate Signed Bundle/APK"
   - Create or use existing keystore
   - Configure signing config in `android/app/build.gradle`

3. **Add App Icons**:
   - Replace icons in `android/app/src/main/res/mipmap-*/`
   - Required sizes: 48x48, 72x72, 96x96, 144x144, 192x192

4. **Build for Testing**:
   ```bash
   npm run mobile:build:android
   ```

## 🎨 App Assets

### App Icon Requirements

#### iOS App Icons
Create a 1024x1024 master icon and generate all sizes:
- 20x20, 29x29, 40x40, 58x58, 60x60, 76x76, 80x80, 87x87, 120x120, 152x152, 167x167, 180x180, 1024x1024

#### Android App Icons
Create a 512x512 master icon and generate all sizes:
- mipmap-mdpi: 48x48
- mipmap-hdpi: 72x72
- mipmap-xhdpi: 96x96
- mipmap-xxhdpi: 144x144
- mipmap-xxxhdpi: 192x192

### Splash Screen Requirements

#### iOS Splash Screens
- iPhone: 1290x2796 (6.7"), 1242x2688 (6.5"), 1242x2208 (5.5")
- iPad: 2048x2732 (12.9"), 1668x2388 (11"), 1536x2048 (9.7")

#### Android Splash Screens
- Phone: 1080x1920
- 7" Tablet: 1200x1920
- 10" Tablet: 1920x1200

## 🔧 Configuration Files

### Capacitor Configuration (`capacitor.config.ts`)
```typescript
{
  appId: 'com.heardapp.mobile',
  appName: 'Heard',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#F5F5DC",
      // ... other splash screen settings
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#F5F5DC'
    }
  }
}
```

### Next.js Configuration (`next.config.js`)
```javascript
{
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
}
```

## 🧪 Testing

### Local Testing
```bash
# Test web build
npm run build

# Test mobile sync
npm run test:mobile

# Test on iOS simulator
npm run mobile:run:ios

# Test on Android emulator
npm run mobile:run:android
```

### Device Testing
1. **iOS Device**:
   - Connect iPhone/iPad
   - Trust developer certificate
   - Run `npm run mobile:run:ios`

2. **Android Device**:
   - Enable Developer Options
   - Enable USB Debugging
   - Run `npm run mobile:run:android`

## 📦 Build for Distribution

### iOS App Store
1. **Archive Build**:
   - Open Xcode project
   - Select "Any iOS Device" as target
   - Product → Archive

2. **Upload to App Store Connect**:
   - Use Xcode Organizer
   - Or use `xcodebuild` command line

3. **Submit for Review**:
   - Complete app metadata
   - Upload screenshots
   - Submit for review

### Google Play Store
1. **Generate AAB**:
   ```bash
   npm run mobile:build:android
   ```

2. **Upload to Play Console**:
   - Upload AAB file
   - Complete store listing
   - Submit for review

## 🔒 Security & Privacy

### Data Protection
- All sensitive data encrypted in transit and at rest
- HIPAA-compliant data handling practices
- User consent for data collection
- Right to data deletion

### Privacy Policy
- Available at `/privacy`
- Covers data collection, use, and sharing
- HIPAA compliance information
- User rights and contact information

### Terms of Service
- Available at `/terms`
- Medical disclaimer
- User responsibilities
- Limitation of liability

## 🐛 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clean and rebuild
rm -rf .next out ios android
npm run mobile:setup
```

#### Avatar Cropping
```bash
# Apply avatar fixes
npm run fix:avatars
```

#### Sync Issues
```bash
# Force sync
npx cap sync --force
```

#### iOS Signing Issues
- Verify Apple Developer account
- Check provisioning profiles
- Update certificates if expired

#### Android Signing Issues
- Verify keystore file
- Check signing configuration
- Update build.gradle settings

### Performance Optimization
- Images optimized for mobile
- Lazy loading implemented
- Bundle size minimized
- Caching strategies in place

## 📋 Pre-Submission Checklist

Before submitting to app stores:

- [ ] All app icons added
- [ ] Splash screens configured
- [ ] Privacy policy and terms of service live
- [ ] All buttons functional
- [ ] No placeholder content
- [ ] Tested on multiple devices
- [ ] Performance optimized
- [ ] Accessibility features implemented
- [ ] Content rating completed
- [ ] Screenshots prepared

## 📞 Support

For technical support:
- **Email**: support@heardapp.com
- **Documentation**: See `APP_STORE_CHECKLIST.md`
- **Issues**: Check GitHub issues

---

**Last Updated**: [Current Date]
**Version**: 1.0.1
