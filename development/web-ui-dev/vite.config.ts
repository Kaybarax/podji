import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

// Check if the temp directory exists
const tempIndexPath = resolve(__dirname, 'temp/main.ts');
const srcLibIndexPath = resolve(__dirname, 'src/lib/index.ts');

// Use temp/main.ts if it exists, otherwise fallback to src/lib/index.ts
const entryPath = fs.existsSync(tempIndexPath) ? tempIndexPath : srcLibIndexPath;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: entryPath,
      name: 'WebUI',
      fileName: format => `index.${format}.js`,
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        preserveModules: false,
        entryFileNames: '[name].[format].js',
        chunkFileNames: '[name].[format].js',
      },
    },
  },
});
