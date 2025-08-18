#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing avatar cropping issues...\n');

// CSS fixes for avatar containers
const avatarFixes = {
  // Doctor listing cards
  'src/app/doctors/page.tsx': {
    search: /className="w-\d+ h-\d+ bg-gradient-to-br from-cream to-sage rounded-full flex items-center justify-center shadow-lg overflow-hidden p-\d+"/g,
    replace: 'className="w-16 h-16 bg-gradient-to-br from-cream to-sage rounded-full flex items-center justify-center shadow-lg overflow-hidden p-2"'
  },
  
  // Doctor profile page
  'src/app/doctors/page.tsx': {
    search: /className="w-\d+ h-\d+ bg-gradient-to-br from-cream to-sage rounded-full flex items-center justify-center shadow-lg overflow-hidden p-\d+"/g,
    replace: 'className="w-20 h-20 bg-gradient-to-br from-cream to-sage rounded-full flex items-center justify-center shadow-lg overflow-hidden p-3"'
  },
  
  // Forum user avatars
  'src/app/forum/page.tsx': {
    search: /className="w-\d+ h-\d+ bg-gradient-to-br from-cream to-dusty-pink rounded-full flex items-center justify-center text-charcoal p-\d+"/g,
    replace: 'className="w-12 h-12 bg-gradient-to-br from-cream to-dusty-pink rounded-full flex items-center justify-center text-charcoal p-1"'
  },
  
  // Profile page avatars
  'src/app/profile/page.tsx': {
    search: /className="w-\d+ h-\d+ bg-gradient-to-br from-cream to-dusty-pink rounded-full flex items-center justify-center shadow-lg overflow-hidden p-\d+"/g,
    replace: 'className="w-24 h-24 bg-gradient-to-br from-cream to-dusty-pink rounded-full flex items-center justify-center shadow-lg overflow-hidden p-3"'
  }
};

// Image component fixes
const imageFixes = {
  // Ensure object-fit: contain for all avatars
  'src/app/doctors/page.tsx': {
    search: /className="w-full h-full object-contain object-center"/g,
    replace: 'className="w-full h-full object-contain object-center"'
  },
  
  'src/app/forum/page.tsx': {
    search: /className="w-full h-full object-contain object-center"/g,
    replace: 'className="w-full h-full object-contain object-center"'
  },
  
  'src/app/profile/page.tsx': {
    search: /className="w-full h-full object-contain object-center"/g,
    replace: 'className="w-full h-full object-contain object-center"'
  }
};

// Apply fixes
Object.entries(avatarFixes).forEach(([filePath, fix]) => {
  if (fs.existsSync(filePath)) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      content = content.replace(fix.search, fix.replace);
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed avatar containers in ${filePath}`);
      } else {
        console.log(`ℹ️  No changes needed in ${filePath}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  } else {
    console.log(`⚠️  File not found: ${filePath}`);
  }
});

// Apply image fixes
Object.entries(imageFixes).forEach(([filePath, fix]) => {
  if (fs.existsSync(filePath)) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      content = content.replace(fix.search, fix.replace);
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed image components in ${filePath}`);
      } else {
        console.log(`ℹ️  No image changes needed in ${filePath}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  } else {
    console.log(`⚠️  File not found: ${filePath}`);
  }
});

console.log('\n🎨 Avatar fixes applied!');
console.log('\n📋 Avatar display guidelines:');
console.log('- Use object-fit: contain to prevent cropping');
console.log('- Use object-position: center to center images');
console.log('- Add padding (p-2, p-3) for breathing room');
console.log('- Use consistent container sizes across similar elements');
console.log('- Test on different screen sizes to ensure proper display');
