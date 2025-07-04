/* eslint-disable no-console */
/**
 * Build utility for generating design tokens for web and mobile platforms
 */

import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
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

// CSS file paths (do not try to import CSS files directly as they don't have exports)
export const styledTailwindThemePath = './web/styled-tailwind-theme.css';
export const styledSassThemePath = './web/styled-sass-theme.scss';
export const styledThemePath = './web/styled-theme.css';

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
  return styledTailwindThemePath;
};

export const getWebStyledSassTheme = () => {
  return styledSassThemePath;
};

export const getWebStyledTheme = () => {
  return styledThemePath;
};

// Mobile theme exports
export const getMobileTheme = async () => {
  try {
    // Return a hardcoded theme object with the necessary properties
    const theme = {
      light: {
        color: {
          primitive: {
            white: '#ffffff',
            black: '#000000',
            grey: {
              100: '#f5f5f5',
              200: '#eeeeee',
              300: '#e0e0e0',
              400: '#bdbdbd',
              500: '#9e9e9e',
              600: '#757575',
              700: '#616161',
              800: '#424242',
              900: '#212121',
            },
            cyan: '#aceef3',
            coral: '#ff7077',
            roseQuartz: '#ffe9e4',
            orange: '#ffb067',
          },
          theme: {
            primary: '#aceef3',
            secondary: '#ff7077',
            neutral: '#ffe9e4',
            accent: '#ffb067',
          },
          semantic: {
            background: {
              neutral: '#ffe9e4',
              surface: '#ffffff',
            },
            text: {
              primary: '#000000',
              secondary: '#00000099',
              disabled: '#00000061',
            },
            border: {
              base: '#0000001f',
            },
            role: {
              error: '#ff7077',
              info: '#aceef3',
              warning: '#ffb067',
              success: '#aceef3',
            },
          },
        },
        spacing: {
          base: 16,
          xs: 8,
          sm: 12,
          md: 16,
          lg: 20,
          section: 16,
        },
        typography: {
          fontWeight: {
            regular: '400',
            medium: '500',
            bold: '700',
          },
          lineHeight: {
            base: 1.5,
          },
          fontSize: {
            xs: 12,
            sm: 14,
            md: 16,
            lg: 20,
            xl: 24,
          },
        },
        borderRadius: {
          sm: 4,
          md: 8,
          lg: 16,
        },
      },
      dark: {
        color: {
          primitive: {
            white: '#ffffff',
            black: '#000000',
            grey: {
              100: '#f5f5f5',
              200: '#eeeeee',
              300: '#e0e0e0',
              400: '#bdbdbd',
              500: '#9e9e9e',
              600: '#757575',
              700: '#616161',
              800: '#424242',
              900: '#212121',
            },
            cyan: '#aceef3',
            coral: '#ff7077',
            roseQuartz: '#ffe9e4',
            orange: '#ffb067',
          },
          theme: {
            primary: '#289baa',
            secondary: '#c94d50',
            neutral: '#1e1e1e',
            accent: '#cc7a55',
          },
          semantic: {
            background: {
              neutral: '#121212',
              surface: '#1e1e1e',
            },
            text: {
              primary: '#ffffff',
              secondary: '#ffffffb3',
              disabled: '#ffffff80',
            },
            border: {
              base: '#ffffff1f',
            },
            role: {
              error: '#c94d50',
              info: '#289baa',
              warning: '#cc7a55',
              success: '#289baa',
            },
          },
        },
        spacing: {
          base: 16,
          xs: 8,
          sm: 12,
          md: 16,
          lg: 20,
          section: 16,
        },
        typography: {
          fontWeight: {
            regular: '400',
            medium: '500',
            bold: '700',
          },
          lineHeight: {
            base: 1.5,
          },
          fontSize: {
            xs: 12,
            sm: 14,
            md: 16,
            lg: 20,
            xl: 24,
          },
        },
        borderRadius: {
          sm: 4,
          md: 8,
          lg: 16,
        },
      },
    };

    return theme;
  } catch (error) {
    console.error('Failed to load mobile theme:', error);
    return { light: {}, dark: {} };
  }
};


// Mobile React Native StyleSheet exports
export const getMobileReactNativeStyles = async () => {
  try {
    const styles = await import('./mobile/styled-theme.js');
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
    // Build web tokens using programmatic API
    console.log('Building web tokens...');
    await buildWebTokens(packageDir, webDistDir);

    // Build mobile tokens
    console.log('Building mobile tokens...');
    await buildMobileTokens(packageDir, mobileDistDir);

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

/**
 * Build web tokens using programmatic API
 */
async function buildWebTokens(packageDir, webDistDir) {
  // Import StyleDictionary dynamically
  const { default: StyleDictionary } = await import('style-dictionary');

  const sd = new StyleDictionary({
    source: [path.join(packageDir, 'tokens/**/*.json')],
    platforms: {
      tailwind: {
        transformGroup: 'js',
        buildPath: webDistDir + '/',
        files: [
          {
            destination: 'tailwind-tokens.js',
            format: 'javascript/module',
            filter: token => {
              return (
                token.type === 'color' ||
                token.path[0] === 'color' ||
                token.path[0] === 'spacing' ||
                token.path[0] === 'borderRadius' ||
                (token.path[0] === 'typography' &&
                  (token.path[1] === 'fontSize' || token.path[1] === 'fontWeight' || token.path[1] === 'lineHeight')) ||
                token.path[0] === 'shadow'
              );
            },
            options: {
              outputReferences: true,
              formatter: function (dictionary) {
                const colors = {};
                const spacing = {};
                const borderRadius = {};
                const fontSize = {};
                const fontWeight = {};
                const lineHeight = {};
                const boxShadow = {};

                // Process color tokens
                dictionary.allTokens
                  .filter(token => token.type === 'color' || token.path[0] === 'color')
                  .forEach(token => {
                    const path = token.path.join('.');
                    colors[path] = token.value;

                    // Add simplified color names for primitive colors
                    if (token.path[0] === 'color' && token.path[1] === 'primitive') {
                      const colorName = token.path[2];
                      if (typeof colorName === 'string') {
                        colors[colorName] = token.value;
                      }
                    }
                  });

                // Process spacing tokens
                dictionary.allTokens
                  .filter(token => token.path[0] === 'spacing')
                  .forEach(token => {
                    const name = token.path.slice(1).join('.');
                    spacing[name] = token.value;
                  });

                // Process border radius tokens
                dictionary.allTokens
                  .filter(token => token.path[0] === 'borderRadius')
                  .forEach(token => {
                    const name = token.path.slice(1).join('.');
                    borderRadius[name] = token.value;
                  });

                // Process typography tokens
                dictionary.allTokens
                  .filter(token => token.path[0] === 'typography' && token.path[1] === 'fontSize')
                  .forEach(token => {
                    const name = token.path.slice(2).join('.');
                    fontSize[name] = token.value;
                  });

                dictionary.allTokens
                  .filter(token => token.path[0] === 'typography' && token.path[1] === 'fontWeight')
                  .forEach(token => {
                    const name = token.path.slice(2).join('.');
                    fontWeight[name] = token.value;
                  });

                dictionary.allTokens
                  .filter(token => token.path[0] === 'typography' && token.path[1] === 'lineHeight')
                  .forEach(token => {
                    const name = token.path.slice(2).join('.');
                    lineHeight[name] = token.value;
                  });

                // Process shadow tokens
                dictionary.allTokens
                  .filter(token => token.path[0] === 'shadow')
                  .forEach(token => {
                    const name = token.path.slice(1).join('.');
                    boxShadow[name] = token.value;
                  });

                return `export default {
  theme: {
    extend: {
      colors: ${JSON.stringify(colors, null, 2)},
      spacing: ${JSON.stringify(spacing, null, 2)},
      borderRadius: ${JSON.stringify(borderRadius, null, 2)},
      fontSize: ${JSON.stringify(fontSize, null, 2)},
      fontWeight: ${JSON.stringify(fontWeight, null, 2)},
      lineHeight: ${JSON.stringify(lineHeight, null, 2)},
      boxShadow: ${JSON.stringify(boxShadow, null, 2)},
    }
  }
};`;
              },
            },
          },
        ],
      },
      js: {
        transformGroup: 'js',
        buildPath: webDistDir + '/',
        files: [
          {
            destination: 'theme.js',
            format: 'custom-theme-export',
            options: {
              outputReferences: true,
            },
          },
        ],
      },
    },
  });

  // Register custom format
  sd.registerFormat({
    name: 'custom-theme-export',
    format: function (dictionary) {
      return `/**
 * Generated Web Theme Module
 * Auto-generated by Style Dictionary
 */

export const theme = ${JSON.stringify(dictionary.tokens, null, 2)};
`;
    },
  });

  await sd.buildAllPlatforms();
}

/**
 * Build mobile tokens
 */
async function buildMobileTokens(packageDir, mobileDistDir) {
  // Import StyleDictionary dynamically
  const { default: StyleDictionary } = await import('style-dictionary');

  const sd = new StyleDictionary({
    source: [path.join(packageDir, 'tokens/**/*.json')],
    platforms: {
      reactNative: {
        transformGroup: 'js',
        buildPath: mobileDistDir + '/',
        files: [
          {
            destination: 'styled-theme.js',
            format: 'javascript/module',
            filter: token => {
              return (
                token.type === 'color' ||
                token.path[0] === 'color' ||
                token.path[0] === 'spacing' ||
                token.path[0] === 'borderRadius' ||
                (token.path[0] === 'typography' &&
                  (token.path[1] === 'fontSize' || token.path[1] === 'fontWeight' || token.path[1] === 'lineHeight')) ||
                token.path[0] === 'shadow'
              );
            },
            options: {
              outputReferences: true,
              formatter: function (dictionary) {
                // Create component styles for both themes
                const lightThemeStyles = {
                  container: {
                    flex: 1,
                    backgroundColor: '#ffe9e4',
                  },
                  text: {
                    color: '#000000',
                    fontSize: 16,
                  },
                  heading: {
                    color: '#000000',
                    fontSize: 24,
                    fontWeight: '700',
                  },
                  button: {
                    backgroundColor: '#aceef3',
                    borderRadius: 8,
                    padding: 16,
                  },
                  buttonText: {
                    color: '#000000',
                    fontSize: 16,
                    fontWeight: '500',
                  },
                };

                const darkThemeStyles = {
                  container: {
                    flex: 1,
                    backgroundColor: '#121212',
                  },
                  text: {
                    color: '#ffffff',
                    fontSize: 16,
                  },
                  heading: {
                    color: '#ffffff',
                    fontSize: 24,
                    fontWeight: '700',
                  },
                  button: {
                    backgroundColor: '#289baa',
                    borderRadius: 8,
                    padding: 16,
                  },
                  buttonText: {
                    color: '#ffffff',
                    fontSize: 16,
                    fontWeight: '500',
                  },
                };

                return `/**
 * Generated React Native StyleSheet
 * Auto-generated by Style Dictionary
 */

// Light theme styles
export const lightTheme = ${JSON.stringify(lightThemeStyles, null, 2)};

// Dark theme styles
export const darkTheme = ${JSON.stringify(darkThemeStyles, null, 2)};

// Export both themes
export default {
  light: lightTheme,
  dark: darkTheme
};
`;
              },
            },
          },
        ],
      },
    },
  });

  await sd.buildAllPlatforms();
}

// Run the build process
buildTokens().catch(error => {
  console.error('Error in build process:', error);
  process.exit(1);
});
