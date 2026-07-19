import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    svelte(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/svelte/index.ts'),
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'svelte',
        'svelte/internal',
        'svelte/internal/client',
        'svelte/internal/server',
        'svelte/reactivity',
        'tronche',
      ],
    },
    copyPublicDir: false,
    outDir: 'dist/svelte',
  },
})
