const fs = require('fs');
const path = require('path');

console.log('🚀 Render Deployment Check for Heard App\n');

// Check required files
const requiredFiles = [
  'package.json',
  'next.config.js',
  'render.yaml',
  'src/app/layout.tsx',
  'src/app/page.tsx'
];

console.log('📁 Checking required files...');
let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Check package.json scripts
console.log('\n📦 Checking package.json scripts...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredScripts = ['build', 'start'];

requiredScripts.forEach(script => {
  if (packageJson.scripts[script]) {
    console.log(`✅ ${script}: ${packageJson.scripts[script]}`);
  } else {
    console.log(`❌ ${script} script - MISSING`);
    allFilesExist = false;
  }
});

// Check dependencies
console.log('\n🔧 Checking dependencies...');
const requiredDeps = ['next', 'react', 'react-dom'];
const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

requiredDeps.forEach(dep => {
  if (deps[dep]) {
    console.log(`✅ ${dep}: ${deps[dep]}`);
  } else {
    console.log(`❌ ${dep} - MISSING`);
    allFilesExist = false;
  }
});

// Check render.yaml
console.log('\n⚙️ Checking render.yaml configuration...');
if (fs.existsSync('render.yaml')) {
  const renderConfig = fs.readFileSync('render.yaml', 'utf8');
  const checks = [
    { name: 'Service type', pattern: /type: web/ },
    { name: 'Build command', pattern: /buildCommand:/ },
    { name: 'Start command', pattern: /startCommand:/ },
    { name: 'Environment variables', pattern: /envVars:/ }
  ];
  
  checks.forEach(check => {
    if (check.pattern.test(renderConfig)) {
      console.log(`✅ ${check.name}`);
    } else {
      console.log(`❌ ${check.name} - MISSING`);
      allFilesExist = false;
    }
  });
}

// Check public assets
console.log('\n🖼️ Checking public assets...');
const publicDir = 'public';
if (fs.existsSync(publicDir)) {
  console.log('✅ public directory exists');
  
  // Check for essential public files
  const publicFiles = ['manifest.json'];
  publicFiles.forEach(file => {
    const filePath = path.join(publicDir, file);
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${file}`);
    } else {
      console.log(`⚠️ ${file} - Optional but recommended`);
    }
  });
} else {
  console.log('❌ public directory - MISSING');
  allFilesExist = false;
}

// Summary
console.log('\n📋 Deployment Summary:');
if (allFilesExist) {
  console.log('✅ Your app is ready for Render deployment!');
  console.log('\n🎯 Next steps:');
  console.log('1. Go to https://render.com');
  console.log('2. Sign up with your GitHub account');
  console.log('3. Create a new Web Service');
  console.log('4. Connect your repository: eodiceanne-star/heard_app_beta');
  console.log('5. Use the settings from render.yaml');
  console.log('6. Deploy!');
} else {
  console.log('❌ Some issues found. Please fix them before deploying.');
}

console.log('\n📚 For detailed instructions, see: RENDER_DEPLOYMENT_GUIDE.md');
console.log('🌐 Your app will be live at: https://heard-app-beta.onrender.com');
