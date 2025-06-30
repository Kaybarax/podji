/** @type {import('tailwindcss').Config} */
const tailwindTheme = require('./tailwind-theme.js');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: tailwindTheme.theme || {
    extend: {},
  },
  plugins: [],
};
