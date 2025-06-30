/**
 * Pre-build script to prepare the build process for @stores
 *
 * This script:
 * 1. Cleans dist directory
 * 2. Creates necessary directories for the build
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

// Function to clean a directory
function cleanDirectory(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  ensureDirectoryExists(dir);
}

// Main function
async function main() {
  try {
    console.log('Running pre-build preparation for @stores...');

    // Clean dist directory
    console.log('Cleaning dist directory...');
    cleanDirectory(distDir);

    console.log('Pre-build preparation completed successfully!');
  } catch (error) {
    console.error('Error during pre-build preparation:', error);
    process.exit(1);
  }
}

// Run the main function
main();
