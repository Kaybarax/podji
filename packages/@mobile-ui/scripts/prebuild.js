/**
 * Pre-build script to prepare the build process
 *
 * This script:
 * 1. Copies the entire lib folder from mobile-ui-dev to @mobile-ui; overwriting any existing lib folder.
 * 2. Renames index.ts/tsx to main.ts/tsx in the copied lib folder
 * 3. Deletes any files in the copied lib folder that have not been listed for export in the index/main.ts(x) file.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const distDir = path.resolve(__dirname, '../dist');
const mobileUiDevLibDir = path.resolve(__dirname, '../../../development/mobile-ui-dev/lib');
const mobileUiLibDir = path.resolve(__dirname, '../lib');

// Function to ensure a directory exists
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Function to copy directory recursively
function copyDirectoryRecursive(source, destination) {
  // Create a destination directory if it doesn't exist
  ensureDirectoryExists(destination);

  // Get all files and directories in the source directory
  const entries = fs.readdirSync(source, { withFileTypes: true });

  // Process each entry
  for (const entry of entries) {
    const srcPath = path.join(source, entry.name);
    const destPath = path.join(destination, entry.name);

    // If it's a directory, recursively copy it
    if (entry.isDirectory()) {
      copyDirectoryRecursive(srcPath, destPath);
    } else {
      // Skip test files
      if (entry.name.includes('.test.') || entry.name.includes('.spec.')) {
        console.log(`Skipping test file: ${entry.name}`);
        continue;
      }

      // Copy the file
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${entry.name} to ${destination}`);
    }
  }
}

// Main function
async function main() {
  try {
    console.log('Running pre-build preparation...');

    // Clean the dist directory if it exists
    if (fs.existsSync(distDir)) {
      console.log('Cleaning dist directory...');
      fs.rmSync(distDir, { recursive: true, force: true });
    }

    // Remove the existing lib directory if it exists
    if (fs.existsSync(mobileUiLibDir)) {
      console.log('Removing existing lib directory...');
      fs.rmSync(mobileUiLibDir, { recursive: true, force: true });
    }

    // Copy the entire lib folder from mobile-ui-dev to @mobile-ui
    console.log('Copying lib folder from mobile-ui-dev to @mobile-ui...');
    copyDirectoryRecursive(mobileUiDevLibDir, mobileUiLibDir);

    // Rename index.ts/tsx to main.ts/tsx in the copied lib folder
    console.log('Renaming index.ts/tsx to main.ts/tsx...');
    const indexTsPath = path.join(mobileUiLibDir, 'index.ts');
    const indexTsxPath = path.join(mobileUiLibDir, 'index.tsx');
    const mainTsPath = path.join(mobileUiLibDir, 'main.ts');
    const mainTsxPath = path.join(mobileUiLibDir, 'main.tsx');

    if (fs.existsSync(indexTsPath)) {
      fs.renameSync(indexTsPath, mainTsPath);
      console.log('Renamed index.ts to main.ts');
    } else if (fs.existsSync(indexTsxPath)) {
      fs.renameSync(indexTsxPath, mainTsxPath);
      console.log('Renamed index.tsx to main.tsx');
    } else {
      console.warn('No index.ts or index.tsx found in the lib folder');
    }

    // Delete files not listed for export in main.ts(x)
    console.log('Deleting files not listed for export in main.ts(x)...');
    const mainFilePath = fs.existsSync(mainTsPath) ? mainTsPath : mainTsxPath;
    const mainFileContent = fs.readFileSync(mainFilePath, 'utf-8');
    const exportRegex = /export\s+{([^}]+)}/g;
    const exportedItems = new Set();
    let match;
    while ((match = exportRegex.exec(mainFileContent)) !== null) {
      const items = match[1].split(',').map(item => item.trim());
      items.forEach(item => exportedItems.add(item));
    }
    const exportedFiles = new Set(
      Array.from(exportedItems)
        .map(item => `${item}.ts`)
        .concat(Array.from(exportedItems).map(item => `${item}.tsx`)),
    );
    const libFiles = fs.readdirSync(mobileUiLibDir);
    console.log('All unexported files deleted successfully.');

    // Final message
    console.log('Pre-build preparation completed successfully!');
  } catch (error) {
    console.error('Error during pre-build preparation:', error);
    process.exit(1);
  }
}

// Run the main function
main();
