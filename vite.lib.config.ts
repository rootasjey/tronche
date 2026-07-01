import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [dts({ tsconfigPath: './tsconfig.lib.json', include: ['src/lib'] })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', 'nuxt'],
      output: {
        globals: {
          vue: 'Vue',
          nuxt: 'Nuxt',
        },
      },
    },
    copyPublicDir: false,
    outDir: 'dist',
  },
});
