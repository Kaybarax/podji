/**
 * Build utility for generating design tokens for web and mobile platforms
 */

import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Ensures that the specified directory exists
 */
function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Builds design tokens for both web and mobile platforms
 */
export function buildTokens(): void {
  console.log('Building design tokens for web and mobile platforms...');

  // Get the package directory
  const packageDir = path.resolve(__dirname, '..');

  // Ensure the web and mobile directories exist in dist
  const webDistDir = path.join(packageDir, 'dist', 'web');
  const mobileDistDir = path.join(packageDir, 'dist', 'mobile');

  ensureDirectoryExists(webDistDir);
  ensureDirectoryExists(mobileDistDir);

  try {
    // Build web tokens
    console.log('Building web tokens...');
    execSync('style-dictionary build --config sd.config.web.js --verbose', {
      cwd: packageDir,
      stdio: 'inherit',
    });

    // Build mobile tokens
    console.log('Building mobile tokens...');
    execSync('style-dictionary build --config sd.config.mobile.js', {
      cwd: packageDir,
      stdio: 'inherit',
    });

    console.log('Design tokens built successfully!');
  } catch (error) {
    console.error('Error building design tokens:', error);
    throw error;
  }
}

/**
 * Main function to be called from CLI
 */
export function buildTokensCli(): void {
  buildTokens();
}

// Allow running this file directly with Node.js
// In ES modules, we can use import.meta.url to check if this file is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildTokensCli();
}
