import { defineConfig } from 'vite'
import angular from '@analogjs/vite-plugin-angular'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    angular({ tsconfig: resolve(__dirname, 'tsconfig.angular.json') }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/angular/index.ts'),
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['@angular/core', 'tronche'],
    },
    copyPublicDir: false,
    outDir: 'dist/angular',
  },
})
