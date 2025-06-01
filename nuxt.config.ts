// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  colorMode: {
    preference: 'light',
    fallback: 'light',
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
  ui: {
    theme: {
      colors:['primary', 'secondary','info', 'success', 'warning', 'danger','error'],
    }
  },
  css: ['~/assets/css/main.css'],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',   // ensures the module keys off your file
    configPath: 'tailwind.config.ts',    // default
    viewer: false                         // opens the super-visualizer
  }
})