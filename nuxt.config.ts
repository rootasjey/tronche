// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-12-31',
  devtools: { enabled: false },

  modules: [
    '@nuxthub/core',
    'nuxt-auth-utils',
    './src/module.ts',
  ],

  hub: {
    db: 'sqlite',
    kv: true,
    blob: true,
    cache: true,
  },

  nitro: {
    preset: 'cloudflare-module',
  },

  app: {
    head: {
      title: 'Tronche - Avatar generator',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Tronche generates custom, SVG-based avatars from any username and color palette.',
        },
      ],
    },
  },

  typescript: {
    strict: false,
    tsConfig: {
      compilerOptions: {
        noImplicitAny: true,
        strictNullChecks: true,
      },
    },
  },

  runtimeConfig: {
    authSecret: process.env.NUXT_AUTH_SECRET,
    public: {
      authUrl: process.env.NUXT_AUTH_ORIGIN || 'http://localhost:3000',
    },
  },
})
