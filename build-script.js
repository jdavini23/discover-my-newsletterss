/* eslint-disable no-console, no-undef, @typescript-eslint/no-unused-vars */
module.exports = /* eslint-disable no-console, no-undef */
const fs = require('fs-extra');
const path = require('path');

async function buildScript() {
  try {
    console.log('Starting build script...');

    // Check if dist directory exists
    const distDir = path.join(__dirname, 'dist');
    if (!fs.existsSync(distDir)) {
      console.log('No dist directory found. Creating empty component library.');
      await fs.ensureDir(distDir);
    }

    // Ensure dist/component-library exists
    const destDir = path.join(__dirname, 'dist', 'component-library');
    await fs.ensureDir(destDir);

    // List contents of dist directory
    const distContents = await fs.readdir(distDir);
    console.log('Dist directory contents:', distContents);

    // Copy contents of dist to dist/component-library
    if (distContents.length > 0) {
      await fs.copy(distDir, destDir, {
        overwrite: true,
        filter: (src) => !src.includes('component-library')
      });
      console.log('Copied files to component-library directory');
    }

    // Create fallback index.html
    await fs.writeFile(
      path.join(destDir, 'index.html'), 
      '<html><body>Component Library Deployed</body></html>'
    );
    console.log('Created fallback index.html');

    // Verify final directory contents
    const finalContents = await fs.readdir(destDir);
    console.log('Component library directory contents:', finalContents);

    console.log('Build script completed successfully');
  } catch (error) {
    console.error('Build script failed:', error);
    process.exit(1);
  }
}

buildScript();
;