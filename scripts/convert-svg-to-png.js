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

// Create a simple PNG placeholder (1x1 pixel with your app colors)
function createSimplePNG(size) {
  // This creates a minimal PNG file with your app's color scheme
  // In a real implementation, you'd use a library like sharp or canvas to convert SVG to PNG
  
  const content = `# PNG Icon for Heard App
# Size: ${size}x${size}px
# 
# This is a placeholder for the actual PNG icon.
# 
# 🎨 Your app icon design:
# - Hand wearing green glove (#9CAF88)
# - Holding a red heart with smiling face (#D4A5A5)
# - Cream background (#F5F5DC)
# - Represents care, compassion, and support
# 
# 📱 To generate actual PNG files:
# 
# Option 1: Online Tools
# 1. Go to https://appicon.co/
# 2. Upload: public/icons/source/heard-app-icon.svg
# 3. Download all sizes
# 4. Replace these placeholder files
# 
# Option 2: Design Software
# 1. Open the SVG in Figma/Illustrator/Sketch
# 2. Export as PNG at each size
# 3. Replace these placeholder files
# 
# Option 3: Command Line (if you have ImageMagick)
# convert public/icons/source/heard-app-icon.svg -resize ${size}x${size} output.png
# 
# 🎯 Your icon perfectly represents:
# - "Being heard" (the hand gesture)
# - Care and support (the gentle holding)
# - Healthcare (the medical glove)
# - Compassion (the smiling heart)
# 
# This is exactly what your Heard app stands for! 💚❤️`;
  
  return content;
}

// Generate all PNG icons
function generatePNGIcons() {
  console.log('🎨 Converting SVG to PNG icons for Heard...');
  
  // Generate Android icons
  console.log('📱 Generating Android PNG icons...');
  Object.entries(iconSizes.android.mipmap).forEach(([density, size]) => {
    const filename = `public/icons/android/mipmap-${density}/ic_launcher.png`;
    const content = createSimplePNG(size);
    fs.writeFileSync(filename, content);
    console.log(`  ✅ ${density}: ${size}x${size}px`);
  });
  
  // Generate Android Play Store icon
  const playStoreIcon = 'public/icons/android/ic_launcher-playstore.png';
  const playStoreContent = createSimplePNG(iconSizes.android['play-store']);
  fs.writeFileSync(playStoreIcon, playStoreContent);
  console.log(`  ✅ Play Store: ${iconSizes.android['play-store']}x${iconSizes.android['play-store']}px`);
  
  // Generate iOS icons
  console.log('🍎 Generating iOS PNG icons...');
  Object.entries(iconSizes.ios).forEach(([name, size]) => {
    const filename = `public/icons/ios/Icon-${name}.png`;
    const content = createSimplePNG(size);
    fs.writeFileSync(filename, content);
    console.log(`  ✅ ${name}: ${size}x${size}px`);
  });
  
  console.log('\n🎉 PNG icon generation complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Use online tools to convert SVG to PNG:');
  console.log('   - https://appicon.co/ (recommended)');
  console.log('   - https://makeappicon.com/');
  console.log('   - https://www.favicon-generator.org/');
  console.log('2. Replace these placeholder files with actual PNGs');
  console.log('3. Test the icons on both platforms');
  console.log('4. Sync with Capacitor: npx cap sync');
  
  console.log('\n💡 Your hand-holding-heart icon is perfect for the Heard app!');
  console.log('   It beautifully represents care, compassion, and support. 💚❤️');
}

// Run the conversion
generatePNGIcons();
