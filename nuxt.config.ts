// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: true,
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui-pro',
    '@nuxt/test-utils',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],
  pinia: {
    storesDirs: ['./stores/**'],

  },
  ui: {
    theme: {
      colors:['primary', 'secondary', 'info', 'success', 'warning', 'danger','error'],
    },
  },
 // css: ['~/assets/css/main.css'],

  tailwindcss: {
    exposeConfig: false,
    cssPath: '~/assets/css/main.css',   // ensures the module keys off your file
    configPath: 'tailwind.config.ts',    // default
    viewer: true // opens the super-visualizer
  },

  app: {
    head: {
      htmlAttrs: {
        'data-theme': 'light',
        class: 'light'
      }
    }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:8080'
    }
  }
})