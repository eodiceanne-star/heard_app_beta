# 🎨 App Icon Generation Guide for Heard

## 📋 What's Been Created

✅ **Icon Structure**: All required icon sizes and directories have been created
✅ **Base SVG Icon**: A custom SVG icon with your app's color scheme
✅ **Placeholder Files**: All icon files with instructions for replacement

## 🎯 Your App Icon Design

The base SVG icon (`public/icons/heard-app-icon.svg`) features:
- **Colors**: Cream (#F5F5DC), Dusty Pink (#D4A5A5), Sage (#9CAF88)
- **Elements**: Heart shape, ear symbol, support symbol, "H" for Heard
- **Style**: Warm, supportive, healthcare-focused design

## 📱 Icon Requirements by Platform

### **Android Icons**
```
public/icons/android/
├── mipmap-mdpi/ic_launcher.png (48x48px)
├── mipmap-hdpi/ic_launcher.png (72x72px)
├── mipmap-xhdpi/ic_launcher.png (96x96px)
├── mipmap-xxhdpi/ic_launcher.png (144x144px)
├── mipmap-xxxhdpi/ic_launcher.png (192x192px)
└── ic_launcher-playstore.png (512x512px)
```

### **iOS Icons**
```
public/icons/ios/
├── Icon-20x20.png (20x20px)
├── Icon-20x20@2x.png (40x40px)
├── Icon-20x20@3x.png (60x60px)
├── Icon-29x29.png (29x29px)
├── Icon-29x29@2x.png (58x58px)
├── Icon-29x29@3x.png (87x87px)
├── Icon-40x40.png (40x40px)
├── Icon-40x40@2x.png (80x80px)
├── Icon-40x40@3x.png (120x120px)
├── Icon-60x60@2x.png (120x120px)
├── Icon-60x60@3x.png (180x180px)
├── Icon-76x76.png (76x76px)
├── Icon-76x76@2x.png (152x152px)
├── Icon-83.5x83.5@2x.png (167x167px)
├── Icon-1024x1024.png (1024x1024px)
└── Contents.json (iOS metadata)
```

## 🛠️ How to Generate PNG Icons

### **Option 1: Online Tools (Recommended)**

1. **AppIcon.co** (https://appicon.co/)
   - Upload the `heard-app-icon.svg` file
   - Download all sizes for both platforms
   - Replace the placeholder files

2. **MakeAppIcon.com** (https://makeappicon.com/)
   - Upload a 1024x1024 PNG version
   - Generate all required sizes

3. **Favicon Generator** (https://www.favicon-generator.org/)
   - Good for web icons and basic app icons

### **Option 2: Design Software**

1. **Figma** (Free)
   - Import the SVG
   - Export at different sizes
   - Use the "Export" feature

2. **Adobe Illustrator**
   - Open the SVG
   - Export as PNG at each size
   - Use "Save for Web" feature

3. **Sketch** (macOS)
   - Import the SVG
   - Create artboards for each size
   - Export all at once

### **Option 3: Command Line (Advanced)**

If you have ImageMagick installed:
```bash
# Convert SVG to PNG at different sizes
convert heard-app-icon.svg -resize 48x48 ic_launcher.png
convert heard-app-icon.svg -resize 72x72 ic_launcher.png
# ... repeat for all sizes
```

## 📂 File Replacement Instructions

### **For Android:**
1. Navigate to `public/icons/android/`
2. Replace each `ic_launcher.png` file in the mipmap folders
3. Replace `ic_launcher-playstore.png` with your 512x512 icon

### **For iOS:**
1. Navigate to `public/icons/ios/`
2. Replace each `Icon-*.png` file with the corresponding size
3. Keep the `Contents.json` file as is

## 🎨 Design Tips

### **Color Palette**
- **Primary**: #F5F5DC (Cream)
- **Secondary**: #D4A5A5 (Dusty Pink)
- **Accent**: #9CAF88 (Sage)

### **Design Elements**
- **Heart**: Represents care and support
- **Ear**: Represents "being heard"
- **Support Symbol**: Represents advocacy
- **"H"**: Clear app identification

### **Best Practices**
- Keep designs simple and recognizable at small sizes
- Ensure good contrast for accessibility
- Test on both light and dark backgrounds
- Avoid text in small icon sizes

## 🔄 Integration Steps

### **After Replacing Icons:**

1. **Sync Capacitor:**
   ```bash
   npx cap sync
   ```

2. **Test on Android:**
   ```bash
   npx cap run android
   ```

3. **Test on iOS:**
   ```bash
   npx cap open ios
   # Then build in Xcode
   ```

## 🚀 Next Steps After Icons

1. **Test the app** with new icons on both platforms
2. **Update app metadata** in app stores
3. **Create app store screenshots**
4. **Prepare for submission**

## 📞 Need Help?

If you need assistance with:
- Icon design modifications
- Technical implementation
- App store submission
- Testing on devices

The icon structure is ready - just replace the placeholder files with your actual PNG icons!
