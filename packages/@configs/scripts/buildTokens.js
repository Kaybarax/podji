/**
 * Build utility for generating design tokens for web and mobile platforms
 */

import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { generateReactNativeStylesheet } from './generateReactNativeStylesheet.js';
import { generateWebStylesheets } from './generateWebStylesheets.js';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Ensures that the specified directory exists
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Creates a minimal index.js file that re-exports the necessary functions
 */
function createIndexFile(distDir) {
  const indexJsContent = `/**
 * @configs package entry point
 * This file re-exports the necessary functions from the web and mobile folders
 */

// Direct CSS exports
export { default as styledTailwindTheme } from './web/styled-tailwind-theme.css';
export { default as styledSassTheme } from './web/styled-sass-theme.scss';
export { default as styledTheme } from './web/styled-theme.css';

// Web theme exports
export const getWebTheme = async () => {
  try {
    const theme = await import('./web/theme.js');
    return theme.theme;
  } catch (error) {
    console.error('Failed to load web theme:', error);
    return {};
  }
};

// Web tailwind tokens exports
export const getWebTailwindTokens = async () => {
  try {
    const tokens = await import('./web/tailwind-tokens.js');
    return tokens;
  } catch (error) {
    console.error('Failed to load web tailwind tokens:', error);
    return { theme: { extend: {} } };
  }
};

// Web styled theme exports
export const getWebStyledTailwindTheme = () => {
  try {
    return './web/styled-tailwind-theme.css';
  } catch (error) {
    console.error('Failed to load web styled tailwind theme:', error);
    return '';
  }
};

export const getWebStyledSassTheme = () => {
  try {
    return './web/styled-sass-theme.scss';
  } catch (error) {
    console.error('Failed to load web styled sass theme:', error);
    return '';
  }
};

export const getWebStyledTheme = () => {
  try {
    return './web/styled-theme.css';
  } catch (error) {
    console.error('Failed to load web styled theme:', error);
    return '';
  }
};

// Mobile theme exports
export const getMobileTheme = async () => {
  try {
    const theme = await import('./mobile/style-values.ts');
    return theme.default;
  } catch (error) {
    console.error('Failed to load mobile theme:', error);
    return { light: {}, dark: {} };
  }
};


// Mobile React Native StyleSheet exports
export const getMobileReactNativeStyles = async () => {
  try {
    const styles = await import('./mobile/styled-theme.ts');
    return styles;
  } catch (error) {
    console.error('Failed to load mobile React Native styles:', error);
    return {};
  }
};

// Legacy exports for backward compatibility
export const getTheme = getWebTheme;
export const getTailwindTokens = getWebTailwindTokens;
`;

  const indexDtsContent = `/**
 * @configs package type definitions
 */

// Direct CSS exports
declare const styledTailwindTheme: string;
declare const styledSassTheme: string;
declare const styledTheme: string;
export { styledTailwindTheme, styledSassTheme, styledTheme };

export declare const getWebTheme: () => Promise<Record<string, any>>;
export declare const getWebTailwindTokens: () => Promise<{ theme: { extend: Record<string, any> } }>;
export declare const getWebStyledTailwindTheme: () => string;
export declare const getWebStyledSassTheme: () => string;
export declare const getWebStyledTheme: () => string;
export declare const getMobileTheme: () => Promise<Record<string, any>>;
export declare const getMobileReactNativeStyles: () => Promise<{ light: Record<string, any>; dark: Record<string, any>; default: { light: Record<string, any>; dark: Record<string, any> } }>;
export declare const getTheme: () => Promise<Record<string, any>>;
export declare const getTailwindTokens: () => Promise<{ theme: { extend: Record<string, any> } }>;
`;

  fs.writeFileSync(path.join(distDir, 'index.js'), indexJsContent);
  fs.writeFileSync(path.join(distDir, 'index.d.ts'), indexDtsContent);
}

/**
 * Converts CommonJS module to ES module
 */
function convertToEsModule(filePath) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if the file uses CommonJS module.exports
    if (content.includes('module.exports = {')) {
      console.log(`Converting ${filePath} from CommonJS to ES module...`);

      // Replace module.exports with export const theme
      content = content.replace('module.exports = {', 'export const theme = {');

      // Write the modified content back to the file
      fs.writeFileSync(filePath, content);
      console.log(`Successfully converted ${filePath} to ES module`);
    }
  }
}

// The generateReactNativeStylesheet function is imported from './generateReactNativeStylesheet.js'

/**
 * Builds design tokens for both web and mobile platforms
 */
async function buildTokens() {
  console.log('Building design tokens for web and mobile platforms...');

  // Get the package directory
  const packageDir = path.resolve(__dirname, '..');
  const distDir = path.join(packageDir, 'dist');

  // Clean the dist directory
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
  }

  // Ensure the dist directory exists
  ensureDirectoryExists(distDir);

  // Ensure the web and mobile directories exist in dist
  const webDistDir = path.join(distDir, 'web');
  const mobileDistDir = path.join(distDir, 'mobile');

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

    // Convert theme files from CommonJS to ES modules
    convertToEsModule(path.join(webDistDir, 'theme.js'));
    convertToEsModule(path.join(mobileDistDir, 'theme.ts'));

    // Generate React Native StyleSheet for mobile
    generateReactNativeStylesheet(mobileDistDir);

    // Generate web stylesheets (Tailwind, SASS, and CSS)
    await generateWebStylesheets(webDistDir);

    // Create index files
    createIndexFile(distDir);

    console.log('Design tokens built successfully!');
  } catch (error) {
    console.error('Error building design tokens:', error);
    throw error;
  }
}

// Run the build process
buildTokens().catch(error => {
  console.error('Error in build process:', error);
  process.exit(1);
});
