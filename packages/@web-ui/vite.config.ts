import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
// import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ['lib'] })],
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
  // css: {
  //   postcss: {
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     plugins: [tailwindcss],
  //   },
  // },
});
