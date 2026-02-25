// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'nuxt-vue3-google-signin',
    'nuxt-charts',
  ],

  srcDir: 'src',

  googleSignIn: {
    clientId:
      '588218146033-fplo4cgj4mfc59soh3i79o9grs5duncm.apps.googleusercontent.com',
  },

  components: {
    dirs: [
      {
        prefix: 'E',
        pathPrefix: false,
      },
    ],
  },

  app: {
    head: {
      title: 'Ecogest',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet',
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_API_URL,
    },
  },

  routeRules: {
    '/api-backend/**': {
      proxy: process.env.NUXT_PUBLIC_API_URL + '/**',
    },
  },

  ui: {
    colorMode: false,
    fonts: false,
  },

  devServer: {
    port: 4000,
  },
})