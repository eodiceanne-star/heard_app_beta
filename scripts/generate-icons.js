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
    'public/icons/ios'
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

// Generate SVG icon content (simple placeholder icon)
function generateSVGIcon(size, color = '#D4A5A5') {
  const padding = size * 0.1;
  const innerSize = size - (padding * 2);
  
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#F5F5DC;stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#grad)"/>
  <circle cx="${size/2}" cy="${size/2}" r="${innerSize * 0.3}" fill="${color}" opacity="0.8"/>
  <path d="M${size * 0.35} ${size * 0.4} Q${size * 0.5} ${size * 0.25} ${size * 0.65} ${size * 0.4} Q${size * 0.5} ${size * 0.55} ${size * 0.35} ${size * 0.4}" fill="white"/>
  <circle cx="${size * 0.4}" cy="${size * 0.35}" r="${innerSize * 0.08}" fill="white"/>
  <circle cx="${size * 0.6}" cy="${size * 0.35}" r="${innerSize * 0.08}" fill="white"/>
</svg>`;
}

// Convert SVG to PNG using a simple approach (in real implementation, you'd use a library like sharp)
function generatePNGPlaceholder(size, filename) {
  // For now, we'll create a simple text file that describes what should be generated
  // In a real implementation, you'd use a library like sharp or canvas to generate actual PNGs
  const content = `# Icon placeholder for ${filename}
# Size: ${size}x${size}px
# This should be replaced with an actual PNG icon
# You can use online tools like:
# - https://www.favicon-generator.org/
# - https://appicon.co/
# - https://makeappicon.com/
# 
# Or use design tools like:
# - Figma
# - Adobe Illustrator
# - Sketch
# 
# The icon should represent the "Heard" app - a healthcare advocacy app
# Suggested colors: #F5F5DC (cream), #D4A5A5 (dusty pink), #9CAF88 (sage)
# Suggested elements: heart, ear, or supportive/medical symbols`;
  
  fs.writeFileSync(filename, content);
}

// Generate all icons
function generateAllIcons() {
  console.log('🎨 Generating app icons for Heard...');
  
  createDirectories();
  
  // Generate Android icons
  console.log('📱 Generating Android icons...');
  Object.entries(iconSizes.android.mipmap).forEach(([density, size]) => {
    const filename = `public/icons/android/mipmap-${density}/ic_launcher.png`;
    generatePNGPlaceholder(size, filename);
    console.log(`  ✅ ${density}: ${size}x${size}px`);
  });
  
  // Generate Android Play Store icon
  const playStoreIcon = 'public/icons/android/ic_launcher-playstore.png';
  generatePNGPlaceholder(iconSizes.android['play-store'], playStoreIcon);
  console.log(`  ✅ Play Store: ${iconSizes.android['play-store']}x${iconSizes.android['play-store']}px`);
  
  // Generate iOS icons
  console.log('🍎 Generating iOS icons...');
  Object.entries(iconSizes.ios).forEach(([name, size]) => {
    const filename = `public/icons/ios/Icon-${name}.png`;
    generatePNGPlaceholder(size, filename);
    console.log(`  ✅ ${name}: ${size}x${size}px`);
  });
  
  // Generate iOS AppIcon.appiconset/Contents.json
  generateiOSContentsJSON();
  
  console.log('\n🎉 Icon generation complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Replace the placeholder files with actual PNG icons');
  console.log('2. Use the suggested colors: #F5F5DC (cream), #D4A5A5 (dusty pink), #9CAF88 (sage)');
  console.log('3. Consider using heart, ear, or supportive medical symbols');
  console.log('4. Test the icons on both platforms');
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

// Run the icon generation
generateAllIcons();
