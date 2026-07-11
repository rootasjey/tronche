import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/vue/index.ts'),
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', 'tronche'],
      output: {
        globals: {
          vue: 'Vue',
          tronche: 'Tronche',
        },
      },
    },
    copyPublicDir: false,
    outDir: 'dist/vue',
  },
});
