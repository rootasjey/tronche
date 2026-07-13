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
    '@nuxtjs/google-fonts',
    './src/module.ts',
  ],

  googleFonts: {
    families: {
      'DM+Sans': [400, 500, 600, 700],
      Fraunces: {
        wght: [400, 600, 700],
        ital: [400, 600],
      },
    },
    display: 'swap',
    preconnect: true,
    download: true,
    base64: false,
  },

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
        { property: 'og:title', content: 'Tronche - Avatar generator' },
        { property: 'og:description', content: 'Tronche generates custom, SVG-based avatars from any username and color palette.' },
        { property: 'og:image', content: '/images/tronche-og.jpeg' },
        { property: 'og:url', content: 'https://tronche.app' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Tronche - Avatar generator' },
        { name: 'twitter:description', content: 'Tronche generates custom, SVG-based avatars from any username and color palette.' },
        { name: 'twitter:image', content: '/images/tronche-og.jpeg' },
      ],
      link: [
        { rel: 'icon', href: '/images/favicon.ico' },
        { rel: 'canonical', href: 'https://tronche.app' },
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
