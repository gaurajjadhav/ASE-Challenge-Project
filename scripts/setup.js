#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🎬 Setting up Movie Library...\n');

// Check if .env file exists
const envPath = path.join(process.cwd(), '.env');
const envExamplePath = path.join(process.cwd(), '.env.example');

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file...');
  
  const envContent = `# The Movie Database API Key
# Get your free API key from https://www.themoviedb.org/settings/api
VITE_TMDB_API_KEY=your_api_key_here
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created!');
  console.log('⚠️  Please update VITE_TMDB_API_KEY with your actual API key\n');
} else {
  console.log('✅ .env file already exists\n');
}

console.log('🚀 Setup complete! Next steps:');
console.log('1. Get your free API key from https://www.themoviedb.org/settings/api');
console.log('2. Update the VITE_TMDB_API_KEY in your .env file');
console.log('3. Run: npm install');
console.log('4. Run: npm run dev');
console.log('\nHappy coding! 🎉');
