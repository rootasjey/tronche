// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-12-31',
  devtools: { enabled: false },

  alias: {
    'tronche': './src/lib/index.ts',
  },

  modules: [
    '@nuxthub/core',
    'nuxt-auth-utils',
    '@una-ui/nuxt',
    'nuxt-i18n-micro',
    './src/module.ts',
  ],

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', dir: 'ltr' },
      { code: 'fr', iso: 'fr-FR', dir: 'ltr' },
    ],
    defaultLocale: 'en',
    translationDir: 'locales',
    strategy: 'no_prefix',
    meta: true,
    localeCookie: 'user-locale',
  },

  hub: {
    db: 'sqlite',
    kv: true,
    blob: true,
    cache: true,
  },

  una: {
    prefix: 'N',
    themeable: true,
  },

  nitro: {
    preset: 'cloudflare-module',
    experimental: {
      openAPI: true,
    },
    openAPI: {
      meta: {
        title: 'Tronche API',
        description: 'Generate custom, SVG-based avatars from any username and color palette. Tronche provides a free API tier for avatar generation with support for 6 visual styles: beam, marble, pixel, sunset, ring, and bauhaus.',
        version: '1.0.0',
      },
      route: '/_openapi.json',
    },
  },

  unocss: {
    preflight: true,
    theme: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Fraunces', 'DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#F05D5E',
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#F05D5E',
          600: '#dc4445',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        surface: 'var(--c-surface)',
        muted: 'var(--c-muted)',
        border: 'var(--c-border)',
      },
    },
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
      link: [
        { rel: 'icon', href: '/images/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,600&display=swap' },
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
    adminSecret: process.env.NUXT_ADMIN_SECRET || '',
    zimaBlueApiKey: process.env.NUXT_ZIMA_BLUE_API_KEY || '',
    public: {
      authUrl: process.env.NUXT_AUTH_ORIGIN || 'http://localhost:3000',
      zimaBlueBaseUrl: 'https://zimablue.cc',
    },
  },
})
