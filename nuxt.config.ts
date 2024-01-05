// https://www.npmjs.com/package/vite-svg-loader
import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  app: {
    head: {
      charset: 'utf-8',
      htmlAttrs: {
        lang: 'en',
      },
      viewport: 'width=device-width, initial-scale=1',
      title: 'Mini Trello Clone',
      meta: [{ name: 'theme-color', content: '#27AB83' }],
    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/eslint-module', '@vueuse/nuxt'],

  devtools: { enabled: true },

  typescript: {
    shim: false,
  },

  vite: {
    plugins: [
      svgLoader({
        svgo: true,
        svgoConfig: {
          plugins: [],
        },
      }),
    ],
  },
})
