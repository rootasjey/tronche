import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import react from '@vitejs/plugin-react';
import solid from 'vite-plugin-solid';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue(), react(), solid({ include: 'src/solid/**' }), svelte({ include: 'src/svelte/**/*.svelte' })],
  resolve: {
    alias: {
      'hub:kv': resolve(__dirname, 'server/__tests__/__mocks__/hub-kv.ts'),
      'hub:db': resolve(__dirname, 'server/__tests__/__mocks__/hub-db.ts'),
      '@noble/hashes/scrypt': resolve(__dirname, 'node_modules/@noble/hashes/scrypt.js'),
    },
  },
  test: {
    include: ['src/**/*.test.{ts,tsx}', 'server/**/*.test.ts', 'test/**/*.test.ts'],
    environment: 'jsdom',
    server: {
      deps: {
        inline: ['@noble/hashes'],
      },
    },
  },
});
