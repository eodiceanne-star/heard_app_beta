# 🍎 Apple App Store Submission Guide

## **Prerequisites**

### **Required Accounts**
- ✅ **Apple Developer Account** ($99/year)
- ✅ **App Store Connect Access**
- ✅ **Your Render URL** (for PWA conversion)

### **Required Assets**
- ✅ **App Icons** (1024x1024 PNG)
- ✅ **Screenshots** (iPhone 6.7" format)
- ✅ **Privacy Policy** (hosted online)
- ✅ **App Description** (from manifest.json)

---

## **Step 1: Create Apple Developer Account**

### **1.1 Sign Up**
1. **Visit:** https://developer.apple.com
2. **Click "Account" → "Sign In"**
3. **Create Apple ID** (if you don't have one)
4. **Enroll in Apple Developer Program** ($99/year)

### **1.2 Complete Enrollment**
- **Personal Information**
- **Business Information** (if applicable)
- **Payment Method**
- **Agree to Terms**

### **1.3 Wait for Approval**
- **Processing time:** 24-48 hours
- **Email confirmation** when approved

---

## **Step 2: Convert PWA to iOS App**

### **Option A: GoNative.io (Recommended)**

#### **2.1 Visit GoNative.io**
1. **Go to:** https://gonative.io
2. **Click "Create App"**
3. **Enter your Render URL**

#### **2.2 Configure App Settings**
```
App Name: Heard
Bundle ID: com.heardapp.mobile
Version: 1.0.0
Platform: iOS
```

#### **2.3 Upload Assets**
- **App Icon:** Upload your 1024x1024 icon
- **Splash Screen:** Use your app background
- **App Store Screenshots:** Upload your existing screenshots

#### **2.4 Download iOS App**
- **Download .ipa file**
- **Save for App Store submission**

### **Option B: Manual Xcode Build (Mac Required)**

#### **2.1 Install Xcode**
- **Download from Mac App Store**
- **Install latest version**

#### **2.2 Create iOS Project**
```bash
# Create new iOS project
# Import your Capacitor project
# Configure signing certificates
```

#### **2.3 Build and Archive**
- **Build for Release**
- **Archive for App Store**

---

## **Step 3: App Store Connect Setup**

### **3.1 Access App Store Connect**
1. **Visit:** https://appstoreconnect.apple.com
2. **Sign in with Apple Developer account**
3. **Click "My Apps"**

### **3.2 Create New App**
1. **Click "+" → "New App"**
2. **Fill in details:**
   ```
   Platform: iOS
   Name: Heard - Women's Healthcare Support
   Bundle ID: com.heardapp.mobile
   SKU: heard-app-ios
   User Access: Full Access
   ```

### **3.3 App Information**
```
Name: Heard - Women's Healthcare Support
Subtitle: Healthcare Support Platform
Keywords: healthcare,women,medical,support,community
Description: [Use content from your manifest.json]
```

---

## **Step 4: Upload Build**

### **4.1 Prepare Build**
- **Upload .ipa file** (from GoNative.io or Xcode)
- **Add build description**
- **Select build for testing**

### **4.2 TestFlight (Optional)**
1. **Enable TestFlight**
2. **Add internal testers**
3. **Test app functionality**
4. **Fix any issues**

---

## **Step 5: Complete Store Listing**

### **5.1 App Information**
```
Name: Heard - Women's Healthcare Support
Subtitle: Healthcare Support Platform
Category: Health & Fitness
Content Rating: 4+ (No objectionable content)
```

### **5.2 Description**
```
A women's healthcare support platform for those navigating chronic illness and medical gaslighting. Connect with supportive healthcare professionals, track symptoms, and find community support.

Key Features:
• Find supportive healthcare professionals
• Track symptoms and health journey
• Connect with community support
• Access calming music and resources
• Prepare for doctor appointments

Perfect for women seeking understanding healthcare providers and community support.
```

### **5.3 Keywords**
```
healthcare,women,medical,support,community,doctors,symptoms,health,wellness,chronic illness
```

### **5.4 Screenshots**
- **Upload iPhone 6.7" screenshots**
- **Add descriptions for each**
- **Ensure high quality**

### **5.5 App Icon**
- **Upload 1024x1024 PNG**
- **No transparency**
- **No rounded corners**

---

## **Step 6: Privacy & Legal**

### **6.1 Privacy Policy**
- **Upload privacy policy URL**
- **Ensure GDPR/CCPA compliance**
- **Include data collection details**

### **6.2 App Privacy**
- **Complete privacy questionnaire**
- **Declare data collection practices**
- **Specify data usage**

### **6.3 Content Rights**
- **Confirm you own all content**
- **Verify third-party licenses**
- **Ensure no copyright issues**

---

## **Step 7: Submit for Review**

### **7.1 Final Review**
- **Check all information**
- **Verify screenshots**
- **Test app functionality**
- **Ensure privacy compliance**

### **7.2 Submit**
1. **Click "Submit for Review"**
2. **Wait for processing**
3. **Monitor review status**

### **7.3 Review Process**
- **Time:** 1-7 days
- **Common issues:**
  - Privacy policy missing
  - App crashes
  - Incomplete information
  - Content violations

---

## **Step 8: Post-Submission**

### **8.1 Monitor Status**
- **Check App Store Connect**
- **Respond to any issues**
- **Provide additional info if needed**

### **8.2 Approval**
- **App goes live**
- **Available for download**
- **Monitor user feedback**

### **8.3 Rejection (if any)**
- **Read rejection reason**
- **Fix issues**
- **Resubmit**

---

## **Required Files Checklist**

### **✅ Already Prepared**
- [x] App icons (1024x1024)
- [x] Screenshots (iPhone 6.7")
- [x] App manifest
- [x] Privacy policy template

### **⚠️ Need to Complete**
- [ ] Apple Developer account
- [ ] PWA to iOS conversion
- [ ] App Store Connect setup
- [ ] Build upload
- [ ] Store listing completion

---

## **Timeline Estimate**

- **Developer Account:** 1-2 days
- **PWA Conversion:** 1 day
- **App Store Setup:** 1 day
- **Review Process:** 1-7 days
- **Total:** 4-11 days

---

## **Cost Breakdown**

- **Apple Developer Program:** $99/year
- **GoNative.io (optional):** $99/month
- **Total First Year:** $99-1,287

---

**🎯 Next Action:** Create your Apple Developer account and start the PWA conversion process!
