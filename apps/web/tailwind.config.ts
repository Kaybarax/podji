import type { Config } from 'tailwindcss';

// Import the generated design tokens
const tailwindTokens = require('@podji/configs/dist/web/tailwind-tokens.js');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Extend the theme with the generated design tokens
      ...tailwindTokens,
    },
  },
  plugins: [],
};

export default config;
