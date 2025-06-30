import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ['lib'] })],
  resolve: {
    alias: {
      // Use our shim directory for React Native imports
      'react-native': resolve(__dirname, 'shims/react-native'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-native'],
    },
    copyPublicDir: false,
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
