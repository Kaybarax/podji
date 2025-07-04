/* eslint-disable no-console */
/**
 * Post-build script to finalize the build process
 *
 * This script:
 * 1. Removes lib folder
 * 2. Copies all items from dist/lib to dist (one level up)
 * 3. Deletes dist/lib folder
 * 4. Updates main.d.ts and mobile-ui.js paths if needed
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const distDir = path.resolve(__dirname, '../dist');
const distLibDir = path.resolve(__dirname, '../dist/lib');
// const libDir = path.resolve(__dirname, '../lib');
const mainDtsPath = path.resolve(distDir, 'main.d.ts');
const mobileUiJsPath = path.resolve(distDir, 'mobile-ui.js');

// Function to copy all files from source to destination
function copyFilesFromDir(source, destination) {
  if (!fs.existsSync(source)) {
    console.log(`Source directory ${source} does not exist.`);
    return;
  }

  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const entries = fs.readdirSync(source, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(source, entry.name);
    const destPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      copyFilesFromDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${entry.name} to ${destination}`);
    }
  }
}

// Function to update file paths in a file if needed
function updateFilePaths(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File ${filePath} does not exist.`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Check if there are any references to the lib folder that need to be updated
  if (content.includes('./lib/') || content.includes('/lib/')) {
    // Update paths by removing the lib/ part
    content = content.replace(/\.\/lib\//g, './');
    content = content.replace(/\/lib\//g, '/');

    fs.writeFileSync(filePath, content);
    console.log(`Updated paths in ${filePath}`);
  }
}

// Main function
async function main() {
  try {
    console.log('Running post-build finalization...');

    // Step 1: Remove the lib folder
    // if (fs.existsSync(libDir)) {
    //   console.log('Removing lib directory...');
    //   fs.rmSync(libDir, { recursive: true, force: true });
    // }

    // Step 2: Check if dist/lib exists before proceeding
    if (!fs.existsSync(distLibDir)) {
      console.log('dist/lib directory does not exist. Skipping copy operation.');
    } else {
      // Copy all items from dist/lib to dist
      console.log('Copying items from dist/lib to dist...');
      copyFilesFromDir(distLibDir, distDir);

      // Step 3: Delete the dist/lib folder
      console.log('Removing dist/lib directory...');
      fs.rmSync(distLibDir, { recursive: true, force: true });
    }

    // Step 4: Update main.d.ts and mobile-ui.js if needed
    console.log('Updating file paths if needed...');
    updateFilePaths(mainDtsPath);
    updateFilePaths(mobileUiJsPath);

    // Final message
    console.log('Post-build finalization completed successfully!');
  } catch (error) {
    console.error('Error during post-build finalization:', error);
    process.exit(1);
  }
}

// Run the main function
main().then(
  () => console.log('Post-build script completed successfully.'),
  error => {
    console.error('Post-build script failed:', error);
    process.exit(1);
  },
);
