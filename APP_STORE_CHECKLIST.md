# App Store Submission Checklist - Heard App

## 📱 Pre-Submission Requirements

### ✅ Build Configuration
- [ ] **iOS Bundle Identifier**: `com.heardapp.mobile`
- [ ] **Android Package Name**: `com.heardapp.mobile`
- [ ] **Version**: 1.0.1 (increment for each submission)
- [ ] **Build Number**: 1 (increment for each build)
- [ ] **Capacitor Configuration**: `capacitor.config.ts` updated
- [ ] **Next.js Static Export**: `next.config.js` configured

### ✅ App Assets
- [ ] **iOS App Icons** (all required sizes):
  - [ ] 20x20, 29x29, 40x40, 58x58, 60x60, 76x76, 80x80, 87x87, 120x120, 152x152, 167x167, 180x180, 1024x1024
- [ ] **Android App Icons**:
  - [ ] mipmap-hdpi: 72x72
  - [ ] mipmap-mdpi: 48x48
  - [ ] mipmap-xhdpi: 96x96
  - [ ] mipmap-xxhdpi: 144x144
  - [ ] mipmap-xxxhdpi: 192x192
- [ ] **Splash Screens**:
  - [ ] iOS: All device sizes
  - [ ] Android: All density variants
- [ ] **Feature Graphics** (Android): 1024x500

### ✅ App Metadata
- [ ] **App Name**: "Heard - Women's Healthcare Support"
- [ ] **Subtitle** (iOS): "Healthcare Support Platform"
- [ ] **Description**: Updated with keywords and features
- [ ] **Keywords**: healthcare, women, support, medical, wellness, patient-advocacy
- [ ] **Category**: Health & Fitness (Primary), Medical (Secondary)
- [ ] **Content Rating**: 4+ (no objectionable content)

### ✅ Privacy & Legal
- [ ] **Privacy Policy URL**: `https://heardapp.com/privacy`
- [ ] **Terms of Service URL**: `https://heardapp.com/terms`
- [ ] **Data Collection Disclosure**: HIPAA-compliant language
- [ ] **Medical Disclaimer**: Clear "not medical advice" statement
- [ ] **User Consent**: GDPR/CCPA compliant

## 🍎 Apple App Store Specific

### ✅ iOS Build Requirements
- [ ] **Xcode Version**: Latest stable (15.0+)
- [ ] **iOS Deployment Target**: 13.0+
- [ ] **Device Support**: iPhone, iPad
- [ ] **Orientation**: Portrait only
- [ ] **Signing**: Distribution Certificate + Provisioning Profile
- [ ] **App Store Connect**: App record created

### ✅ iOS Screenshots (Required)
- [ ] **iPhone 6.7" Display**: 1290x2796 (4 screenshots)
- [ ] **iPhone 6.5" Display**: 1242x2688 (4 screenshots)
- [ ] **iPhone 5.5" Display**: 1242x2208 (4 screenshots)
- [ ] **iPad Pro 12.9" Display**: 2048x2732 (4 screenshots)

### ✅ iOS App Review Guidelines
- [ ] **No Broken Links**: All internal links work
- [ ] **No Placeholder Content**: All content is final
- [ ] **Test Account**: Provided for reviewer access
- [ ] **Crash-Free**: App doesn't crash during normal use
- [ ] **Performance**: Smooth scrolling and interactions

## 🤖 Google Play Store Specific

### ✅ Android Build Requirements
- [ ] **Android Studio**: Latest stable version
- [ ] **Target SDK**: 33 (Android 13)
- [ ] **Min SDK**: 22 (Android 5.1)
- [ ] **APK/AAB**: Signed with release keystore
- [ ] **Google Play Console**: App record created

### ✅ Android Screenshots (Required)
- [ ] **Phone Screenshots**: 1080x1920 (8 screenshots)
- [ ] **7-inch Tablet**: 1200x1920 (8 screenshots)
- [ ] **10-inch Tablet**: 1920x1200 (8 screenshots)

### ✅ Android App Review Guidelines
- [ ] **Content Rating**: Completed questionnaire
- [ ] **Target Audience**: Adults (18+)
- [ ] **App Bundle**: AAB format preferred
- [ ] **64-bit Support**: Required for new apps
- [ ] **Accessibility**: Basic accessibility features

## 🧪 Testing Requirements

### ✅ Functional Testing
- [ ] **All Buttons**: Every button has proper handlers
- [ ] **Navigation**: All navigation works correctly
- [ ] **Forms**: All forms validate and submit properly
- [ ] **Images**: Random images display without cropping
- [ ] **Responsive Design**: Works on all screen sizes

### ✅ Device Testing
- [ ] **iOS Devices**: iPhone 12+, iPad Air+
- [ ] **Android Devices**: Pixel 6+, Samsung Galaxy S21+
- [ ] **Tablets**: iPad, Android tablets
- [ ] **Orientations**: Portrait mode only
- [ ] **Network**: WiFi and cellular data

### ✅ Performance Testing
- [ ] **Load Times**: App loads within 3 seconds
- [ ] **Memory Usage**: No memory leaks
- [ ] **Battery Usage**: Reasonable battery consumption
- [ ] **Storage**: App size under 100MB
- [ ] **Crashes**: No crashes during testing

## 📋 Pre-Submission Checklist

### ✅ Final Review
- [ ] **App Icon**: Professional, recognizable, follows guidelines
- [ ] **Screenshots**: High-quality, show key features
- [ ] **Description**: Clear, compelling, keyword-optimized
- [ ] **Keywords**: Relevant to healthcare and women's health
- [ ] **Privacy Policy**: Comprehensive and legally sound
- [ ] **Terms of Service**: Clear and enforceable

### ✅ Technical Review
- [ ] **Build Success**: App builds without errors
- [ ] **Signing**: Proper certificates and profiles
- [ ] **Bundle ID**: Unique and consistent
- [ ] **Version**: Correctly incremented
- [ ] **Dependencies**: All dependencies resolved

### ✅ Content Review
- [ ] **No Placeholders**: All content is final
- [ ] **Spelling/Grammar**: All text is error-free
- [ ] **Medical Accuracy**: No false medical claims
- [ ] **Community Guidelines**: Clear and appropriate
- [ ] **Support Information**: Contact details provided

## 🚀 Submission Process

### ✅ Apple App Store
1. [ ] Upload build to App Store Connect
2. [ ] Complete app metadata
3. [ ] Submit for review
4. [ ] Respond to any review feedback
5. [ ] Release to App Store

### ✅ Google Play Store
1. [ ] Upload AAB to Google Play Console
2. [ ] Complete store listing
3. [ ] Submit for review
4. [ ] Respond to any review feedback
5. [ ] Release to Play Store

## 📞 Support Information

### ✅ Contact Details
- **Support Email**: support@heardapp.com
- **Privacy Email**: privacy@heardapp.com
- **Legal Email**: legal@heardapp.com
- **Website**: https://heardapp.com

### ✅ Business Information
- **Company Name**: [Your Company Name]
- **Address**: [Your Business Address]
- **Phone**: [Your Business Phone]

---

## 🔄 Version Update Process

For future updates:
1. Increment version number in `package.json`
2. Update build number in Capacitor config
3. Test thoroughly on all devices
4. Follow this checklist again
5. Submit update to both stores

---

**Last Updated**: [Current Date]
**Next Review**: [Date + 30 days]
