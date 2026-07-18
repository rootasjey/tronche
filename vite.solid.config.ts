import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    solid(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/solid/index.ts'),
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['solid-js', 'solid-js/web', 'tronche'],
      output: {
        globals: {
          'solid-js': 'Solid',
          'solid-js/web': 'SolidWeb',
          tronche: 'Tronche',
        },
      },
    },
    copyPublicDir: false,
    outDir: 'dist/solid',
  },
});
