/**
 * Style Dictionary Configuration for Web Platform (v5 API)
 *
 * This file configures Style Dictionary to transform design tokens from JSON
 * into web-specific formats (Tailwind CSS, JS/TS theme modules).
 *
 * Note: This configuration is primarily for CLI usage. The main build process
 * uses the programmatic API in scripts/buildTokens.js
 */

export default {
  source: ['tokens/**/*.json'],
  platforms: {
    // Tailwind CSS configuration
    tailwind: {
      transformGroup: 'js',
      buildPath: 'dist/web/',
      files: [
        {
          destination: 'tailwind-tokens.js',
          format: 'javascript/module',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    // JavaScript/TypeScript theme module
    js: {
      transformGroup: 'js',
      buildPath: 'dist/web/',
      files: [
        {
          destination: 'theme.js',
          format: 'javascript/module',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
};
