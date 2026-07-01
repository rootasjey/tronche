// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  // Configure the demo app
  srcDir: 'src/demo/',

  // Server directory for API routes (defaults to <srcDir>/server)
  serverDir: './server',

  // Use the Tronche module for development
  modules: ['./src/module.ts'],

  // TypeScript configuration
  typescript: {
    typeCheck: false
  },

  // App configuration
  app: {
    head: {
      title: 'Tronche - Avatar generator',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Tronche generates custom, SVG-based avatars from any username and color palette.'
        }
      ]
    }
  },

  compatibilityDate: '2025-08-18'
})