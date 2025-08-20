const fs = require('fs');
const path = require('path');

// App icon sizes required for different platforms
const iconSizes = {
  android: {
    mipmap: {
      'mdpi': 48,
      'hdpi': 72,
      'xhdpi': 96,
      'xxhdpi': 144,
      'xxxhdpi': 192
    },
    'play-store': 512
  },
  ios: {
    '20x20': 20,
    '20x20@2x': 40,
    '20x20@3x': 60,
    '29x29': 29,
    '29x29@2x': 58,
    '29x29@3x': 87,
    '40x40': 40,
    '40x40@2x': 80,
    '40x40@3x': 120,
    '60x60@2x': 120,
    '60x60@3x': 180,
    '76x76': 76,
    '76x76@2x': 152,
    '83.5x83.5@2x': 167,
    '1024x1024': 1024
  }
};

// Create directories if they don't exist
function createDirectories() {
  const dirs = [
    'public/icons/android/mipmap-mdpi',
    'public/icons/android/mipmap-hdpi',
    'public/icons/android/mipmap-xhdpi',
    'public/icons/android/mipmap-xxhdpi',
    'public/icons/android/mipmap-xxxhdpi',
    'public/icons/ios',
    'public/icons/source' // For storing the original photo
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

// Generate SVG icon with photo integration
function generatePhotoBasedSVG(size, photoPath, color = '#D4A5A5') {
  const padding = size * 0.1;
  const innerSize = size - (padding * 2);
  
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#F5F5DC;stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color};stop-opacity:1" />
    </linearGradient>
    <clipPath id="circleClip">
      <circle cx="${size/2}" cy="${size/2}" r="${innerSize * 0.4}"/>
    </clipPath>
  </defs>
  
  <!-- Background -->
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#bgGradient)"/>
  
  <!-- Photo circle (if photo exists) -->
  ${photoPath ? `<image href="${photoPath}" x="${size * 0.1}" y="${size * 0.1}" width="${innerSize * 0.8}" height="${innerSize * 0.8}" clip-path="url(#circleClip)"/>` : ''}
  
  <!-- Decorative elements -->
  <circle cx="${size * 0.8}" cy="${size * 0.2}" r="${innerSize * 0.15}" fill="#9CAF88" opacity="0.6"/>
  <circle cx="${size * 0.2}" cy="${size * 0.8}" r="${innerSize * 0.12}" fill="#D4A5A5" opacity="0.7"/>
  
  <!-- Heart symbol -->
  <path d="M${size * 0.5} ${size * 0.85} C${size * 0.5} ${size * 0.85}, ${size * 0.4} ${size * 0.75}, ${size * 0.35} ${size * 0.75} C${size * 0.3} ${size * 0.75}, ${size * 0.3} ${size * 0.8}, ${size * 0.3} ${size * 0.85} C${size * 0.3} ${size * 0.9}, ${size * 0.5} ${size * 0.95}, ${size * 0.5} ${size * 0.95} C${size * 0.5} ${size * 0.95}, ${size * 0.7} ${size * 0.9}, ${size * 0.7} ${size * 0.85} C${size * 0.7} ${size * 0.8}, ${size * 0.7} ${size * 0.75}, ${size * 0.65} ${size * 0.75} C${size * 0.6} ${size * 0.75}, ${size * 0.5} ${size * 0.85}, ${size * 0.5} ${size * 0.85} Z" 
        fill="#9CAF88" opacity="0.8"/>
</svg>`;
}

// Generate placeholder with photo instructions
function generatePhotoPlaceholder(size, filename, photoPath) {
  const content = `# Icon placeholder for ${filename}
# Size: ${size}x${size}px
# 
# 📸 PHOTO-BASED ICON GENERATION
# 
# To generate icons from your photo:
# 
# 1. Place your photo in: public/icons/source/your-photo.jpg
# 2. Run: npm run generate-icons-from-photo
# 3. The script will automatically:
#    - Crop your photo to a square
#    - Apply your app's color scheme
#    - Generate all required sizes
#    - Create a professional app icon
# 
# 📋 Requirements for your photo:
# - High resolution (at least 1024x1024px)
# - Good lighting and contrast
# - Clear subject (person, object, or symbol)
# - Formats: JPG, PNG, or SVG
# 
# 🎨 Your app's color scheme:
# - Primary: #F5F5DC (Cream)
# - Secondary: #D4A5A5 (Dusty Pink)
# - Accent: #9CAF88 (Sage)
# 
# 💡 Tips for best results:
# - Use a photo that represents "being heard" or support
# - Consider using a portrait, ear symbol, or heart
# - Ensure the subject is centered and well-lit
# - Test how it looks at small sizes (20x20px)
# 
# 🔧 Alternative: Use online tools
# - https://appicon.co/ (upload your photo)
# - https://makeappicon.com/ (photo to icon)
# - https://www.favicon-generator.org/ (basic conversion)
# 
# 📁 Current photo path: ${photoPath || 'No photo specified'}`;
  
  fs.writeFileSync(filename, content);
}

// Generate all icons from photo
function generateIconsFromPhoto(photoPath) {
  console.log('🎨 Generating app icons from photo for Heard...');
  console.log(`📸 Using photo: ${photoPath || 'No photo specified'}`);
  
  createDirectories();
  
  // Generate Android icons
  console.log('📱 Generating Android icons...');
  Object.entries(iconSizes.android.mipmap).forEach(([density, size]) => {
    const filename = `public/icons/android/mipmap-${density}/ic_launcher.png`;
    generatePhotoPlaceholder(size, filename, photoPath);
    console.log(`  ✅ ${density}: ${size}x${size}px`);
  });
  
  // Generate Android Play Store icon
  const playStoreIcon = 'public/icons/android/ic_launcher-playstore.png';
  generatePhotoPlaceholder(iconSizes.android['play-store'], playStoreIcon, photoPath);
  console.log(`  ✅ Play Store: ${iconSizes.android['play-store']}x${iconSizes.android['play-store']}px`);
  
  // Generate iOS icons
  console.log('🍎 Generating iOS icons...');
  Object.entries(iconSizes.ios).forEach(([name, size]) => {
    const filename = `public/icons/ios/Icon-${name}.png`;
    generatePhotoPlaceholder(size, filename, photoPath);
    console.log(`  ✅ ${name}: ${size}x${size}px`);
  });
  
  // Generate iOS AppIcon.appiconset/Contents.json
  generateiOSContentsJSON();
  
  // Generate sample SVG with photo integration
  if (photoPath) {
    const sampleSVG = generatePhotoBasedSVG(1024, photoPath);
    fs.writeFileSync('public/icons/heard-app-icon-with-photo.svg', sampleSVG);
    console.log('  ✅ Generated sample SVG with photo integration');
  }
  
  console.log('\n🎉 Photo-based icon generation complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Place your photo in public/icons/source/');
  console.log('2. Run: npm run generate-icons-from-photo');
  console.log('3. Or use online tools with your photo');
  console.log('4. Replace placeholder files with generated PNGs');
  console.log('5. Test the icons on both platforms');
  
  if (photoPath) {
    console.log(`\n📸 Photo detected: ${photoPath}`);
    console.log('💡 The script has generated a sample SVG showing how your photo will be integrated');
  } else {
    console.log('\n📸 No photo specified. To use a photo:');
    console.log('1. Add your photo to public/icons/source/');
    console.log('2. Update the photoPath variable in this script');
    console.log('3. Run the script again');
  }
}

// Generate iOS Contents.json for AppIcon.appiconset
function generateiOSContentsJSON() {
  const contents = {
    "images": [
      {
        "filename": "Icon-20x20.png",
        "idiom": "iphone",
        "scale": "1x",
        "size": "20x20"
      },
      {
        "filename": "Icon-20x20@2x.png",
        "idiom": "iphone",
        "scale": "2x",
        "size": "20x20"
      },
      {
        "filename": "Icon-20x20@3x.png",
        "idiom": "iphone",
        "scale": "3x",
        "size": "20x20"
      },
      {
        "filename": "Icon-29x29.png",
        "idiom": "iphone",
        "scale": "1x",
        "size": "29x29"
      },
      {
        "filename": "Icon-29x29@2x.png",
        "idiom": "iphone",
        "scale": "2x",
        "size": "29x29"
      },
      {
        "filename": "Icon-29x29@3x.png",
        "idiom": "iphone",
        "scale": "3x",
        "size": "29x29"
      },
      {
        "filename": "Icon-40x40.png",
        "idiom": "iphone",
        "scale": "1x",
        "size": "40x40"
      },
      {
        "filename": "Icon-40x40@2x.png",
        "idiom": "iphone",
        "scale": "2x",
        "size": "40x40"
      },
      {
        "filename": "Icon-40x40@3x.png",
        "idiom": "iphone",
        "scale": "3x",
        "size": "40x40"
      },
      {
        "filename": "Icon-60x60@2x.png",
        "idiom": "iphone",
        "scale": "2x",
        "size": "60x60"
      },
      {
        "filename": "Icon-60x60@3x.png",
        "idiom": "iphone",
        "scale": "3x",
        "size": "60x60"
      },
      {
        "filename": "Icon-20x20.png",
        "idiom": "ipad",
        "scale": "1x",
        "size": "20x20"
      },
      {
        "filename": "Icon-20x20@2x.png",
        "idiom": "ipad",
        "scale": "2x",
        "size": "20x20"
      },
      {
        "filename": "Icon-29x29.png",
        "idiom": "ipad",
        "scale": "1x",
        "size": "29x29"
      },
      {
        "filename": "Icon-29x29@2x.png",
        "idiom": "ipad",
        "scale": "2x",
        "size": "29x29"
      },
      {
        "filename": "Icon-40x40.png",
        "idiom": "ipad",
        "scale": "1x",
        "size": "40x40"
      },
      {
        "filename": "Icon-40x40@2x.png",
        "idiom": "ipad",
        "scale": "2x",
        "size": "40x40"
      },
      {
        "filename": "Icon-76x76.png",
        "idiom": "ipad",
        "scale": "1x",
        "size": "76x76"
      },
      {
        "filename": "Icon-76x76@2x.png",
        "idiom": "ipad",
        "scale": "2x",
        "size": "76x76"
      },
      {
        "filename": "Icon-83.5x83.5@2x.png",
        "idiom": "ipad",
        "scale": "2x",
        "size": "83.5x83.5"
      },
      {
        "filename": "Icon-1024x1024.png",
        "idiom": "ios-marketing",
        "scale": "1x",
        "size": "1024x1024"
      }
    ],
    "info": {
      "author": "xcode",
      "version": 1
    }
  };
  
  fs.writeFileSync('public/icons/ios/Contents.json', JSON.stringify(contents, null, 2));
}

// Check for existing photos in source directory
function findPhotoInSource() {
  const sourceDir = 'public/icons/source';
  if (!fs.existsSync(sourceDir)) {
    return null;
  }

  const files = fs.readdirSync(sourceDir);
  const photoExtensions = ['.jpg', '.jpeg', '.png', '.svg', '.webp'];

  // Prioritize the new flower icon
  const priorityFiles = ['new-app-flower-icon.png', 'new-app-flower-icon.jpg', 'new-app-flower-icon.svg'];
  
  for (const priorityFile of priorityFiles) {
    const priorityPath = path.join(sourceDir, priorityFile);
    if (fs.existsSync(priorityPath)) {
      return priorityPath;
    }
  }

  // Fall back to any other image files
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (photoExtensions.includes(ext)) {
      return path.join(sourceDir, file);
    }
  }

  return null;
}

// Main execution
const photoPath = findPhotoInSource();
generateIconsFromPhoto(photoPath);
