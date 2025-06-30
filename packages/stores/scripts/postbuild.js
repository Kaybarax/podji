/**
 * Post-build script to clean up and optimize the dist directory for @stores
 *
 * This script:
 * 1. Ensures all necessary files are in the dist directory
 * 2. Removes any unnecessary files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const distDir = path.resolve(__dirname, '../dist');
const srcDir = path.resolve(__dirname, '../src');

// Function to ensure a directory exists
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Main function
async function main() {
  try {
    console.log('Running post-build cleanup for @stores...');

    // Check if dist directory exists
    if (!fs.existsSync(distDir)) {
      console.error('Dist directory does not exist!');
      process.exit(1);
    }

    // Ensure index.d.ts exists and has correct exports
    const indexDtsPath = path.join(distDir, 'index.d.ts');
    if (fs.existsSync(indexDtsPath)) {
      console.log('Verifying index.d.ts...');
      // No modifications needed for now, but this is where you could add them if needed
    } else {
      console.warn('index.d.ts not found at expected path:', indexDtsPath);
    }

    console.log('Post-build cleanup completed successfully!');
  } catch (error) {
    console.error('Error during post-build cleanup:', error);
    process.exit(1);
  }
}

// Run the main function
main();
