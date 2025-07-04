import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({ include: ['src'] })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
    },
    copyPublicDir: false,
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignore warnings about "use client" directives
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('"use client"')) {
          return;
        }
        warn(warning);
      },
    },
  },
});
