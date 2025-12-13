// copy-index.js
import fs from 'fs';
import path from 'path';

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  console.error('Dist directory does not exist!');
  process.exit(1);
}

// Copy index.html to 200.html
try {
  const indexContent = fs.readFileSync(path.resolve('dist', 'index.html'), 'utf8');
  fs.writeFileSync(path.resolve('dist', '200.html'), indexContent);
  console.log('Successfully copied index.html to 200.html');
} catch (error) {
  console.error('Error copying index.html to 200.html:', error);
  process.exit(1);
}
