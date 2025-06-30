#!/usr/bin/env node

/**
 * Cleanup script for the project
 * This script will delete:
 * - All node_modules directories across the project
 * - All .turbo directories across the project
 * - backstop_data folder
 * - .yarn directory
 * - lib folders in @mobile-ui and @web-ui packages
 */

const fs = require('fs');
const path = require('path');

console.log('Starting cleanup process...');

// Get the root directory of the project
const rootDir = path.resolve(__dirname, '..');
process.chdir(rootDir);

/**
 * Recursively find directories with a specific name and delete them
 * @param {string} startPath - The path to start searching from
 * @param {string} targetDirName - The name of directories to find and delete
 */
function findAndDeleteDirs(startPath, targetDirName) {
  if (!fs.existsSync(startPath)) {
    return;
  }

  const files = fs.readdirSync(startPath);

  for (const file of files) {
    const filePath = path.join(startPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (file === targetDirName) {
        console.log(`Deleting ${filePath}`);
        if (fs.existsSync(filePath)) {
          fs.rmSync(filePath, { recursive: true, force: true });
          console.log(`${filePath} deleted.`);
        } else {
          console.log(`${filePath} not found, skipping.`);
        }
      } else {
        // Skip node_modules directories to avoid unnecessary traversal
        if (file !== 'node_modules') {
          findAndDeleteDirs(filePath, targetDirName);
        }
      }
    }
  }
}

// Delete all dist directories
console.log('Deleting all dist directories...');
findAndDeleteDirs(rootDir, 'dist');

// Delete all node_modules directories
console.log('Deleting all node_modules directories...');
findAndDeleteDirs(rootDir, 'node_modules');

// Delete all .turbo directories
console.log('Deleting all .turbo directories...');
findAndDeleteDirs(rootDir, '.turbo');

// Delete backstop_data folder
console.log('Deleting backstop_data folder...');
const backstopPath = path.join(rootDir, 'backstop_data');
if (fs.existsSync(backstopPath)) {
  fs.rmSync(backstopPath, { recursive: true, force: true });
  console.log('backstop_data deleted.');
} else {
  console.log('backstop_data not found, skipping.');
}

// Delete .yarn directory
console.log('Deleting .yarn directory...');
const yarnPath = path.join(rootDir, '.yarn');
if (fs.existsSync(yarnPath)) {
  fs.rmSync(yarnPath, { recursive: true, force: true });
  console.log('.yarn deleted.');
} else {
  console.log('.yarn not found, skipping.');
}

// Delete lib folders in @mobile-ui and @web-ui packages
console.log('Deleting lib folders in @mobile-ui and @web-ui packages...');
const mobileUiLibPath = path.join(rootDir, 'packages/@mobile-ui/lib');
if (fs.existsSync(mobileUiLibPath)) {
  fs.rmSync(mobileUiLibPath, { recursive: true, force: true });
  console.log('@mobile-ui/lib deleted.');
} else {
  console.log('@mobile-ui/lib not found, skipping.');
}

const webUiLibPath = path.join(rootDir, 'packages/@web-ui/lib');
if (fs.existsSync(webUiLibPath)) {
  fs.rmSync(webUiLibPath, { recursive: true, force: true });
  console.log('@web-ui/lib deleted.');
} else {
  console.log('@web-ui/lib not found, skipping.');
}

console.log('Cleanup completed successfully!');
