const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing Heard App for Render Deployment...\n');

// Check if required files exist
const requiredFiles = [
  'package.json',
  'next.config.js',
  'render.yaml',
  'public/manifest.json'
];

console.log('📋 Checking required files...');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - Missing!`);
  }
});

// Check package.json scripts
console.log('\n📦 Checking package.json scripts...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredScripts = ['build', 'start'];
  
  requiredScripts.forEach(script => {
    if (packageJson.scripts && packageJson.scripts[script]) {
      console.log(`  ✅ ${script}: ${packageJson.scripts[script]}`);
    } else {
      console.log(`  ❌ ${script} script missing!`);
    }
  });
} catch (error) {
  console.log('  ❌ Error reading package.json');
}

// Check for environment variables
console.log('\n🔧 Environment Variables to set in Render:');
console.log('  NODE_ENV=production');
console.log('  PORT=3000');

// Check for potential issues
console.log('\n⚠️  Potential Issues to Check:');
console.log('  1. Ensure all dependencies are in package.json (not devDependencies)');
console.log('  2. Check that next.config.js is compatible with static export');
console.log('  3. Verify that all image assets are in public/ folder');
console.log('  4. Ensure no hardcoded localhost URLs in the code');

// Generate deployment checklist
console.log('\n📋 Deployment Checklist:');
console.log('  □ Push latest code to GitHub');
console.log('  □ Create Render account at https://render.com');
console.log('  □ Connect GitHub repository to Render');
console.log('  □ Configure environment variables');
console.log('  □ Deploy and test the application');
console.log('  □ Update mobile app Capacitor config with new URL');

console.log('\n🎉 Deployment preparation complete!');
console.log('\n📖 Next steps:');
console.log('  1. Follow the RENDER_DEPLOYMENT_GUIDE.md');
console.log('  2. Deploy to Render dashboard');
console.log('  3. Test your deployed app');
console.log('  4. Update mobile app configuration');

console.log('\n💡 Your Heard app will help users feel heard and supported! 💚');
