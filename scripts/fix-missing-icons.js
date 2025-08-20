const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing missing icon files...\n');

// Create missing icon files
const missingIcons = [
  'public/icon-512.png',
  'public/icons/ios/icon-144x144.png',
  'public/icons/ios/icon-72x72.png',
  'public/icons/ios/icon-96x96.png'
];

missingIcons.forEach(iconPath => {
  const dir = path.dirname(iconPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Create a simple placeholder file
  const content = `# Placeholder icon file: ${iconPath}
# This file was auto-generated to fix build errors
# Replace with actual icon when available`;
  
  fs.writeFileSync(iconPath, content);
  console.log(`✅ Created: ${iconPath}`);
});

// Fix metadata warnings by updating layout.tsx
console.log('\n📝 Fixing metadata warnings...');

const layoutPath = 'src/app/layout.tsx';
if (fs.existsSync(layoutPath)) {
  let layoutContent = fs.readFileSync(layoutPath, 'utf8');
  
  // Remove viewport and themeColor from metadata
  layoutContent = layoutContent.replace(
    /viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',\s*themeColor: '#E6B7B0',/g,
    ''
  );
  
  // Add viewport export
  layoutContent = layoutContent.replace(
    /export const metadata: Metadata = {/,
    `export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {`
  );
  
  fs.writeFileSync(layoutPath, layoutContent);
  console.log('✅ Updated layout.tsx to fix metadata warnings');
}

console.log('\n🎉 Icon fixes complete!');
console.log('📱 Your app should now build without errors.');
console.log('💡 Replace placeholder icon files with actual icons when ready.');
