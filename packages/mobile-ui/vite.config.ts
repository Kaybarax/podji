import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['lib/**/*'],
      outDir: 'dist',
      insertTypesEntry: true,
      rollupTypes: false,
      copyDtsFiles: false,
      staticImport: true,
      clearPureImport: true,
      entryRoot: 'lib',
    }),
  ],
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
      fileName: 'mobile-ui',
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-native'],
      onwarn(warning, warn) {
        // Ignore warnings about "use client" directives
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('"use client"')) {
          return;
        }
        warn(warning);
      },
    },
    copyPublicDir: false,
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
