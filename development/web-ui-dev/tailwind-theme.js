/**
 * Tailwind Theme Configuration
 *
 * This file imports the tailwind tokens from @shared/configs
 * and re-exports them for use in tailwind.config.js
 */

// Import the tailwind tokens directly from the dist folder
// This is a workaround since we can't use async imports in tailwind.config.js
const tailwindTokens = require('@shared/configs/dist/web/tailwind-tokens.js');

module.exports = tailwindTokens;
