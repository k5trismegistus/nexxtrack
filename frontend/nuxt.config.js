import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  ssr: true,

  target: 'static',

  head: {
    titleTemplate: '%s - Nexxtrack: Explore which track a professional DJ would mix',
    title: 'Nexxtrack',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nexxtrack: Explore which track a professional DJ would mix after that track. You can get recommendation of next track in your DJ play derived from analysis of top 25% playlist made by popular DJs.' },
      { hid: 'keywords', name: 'keywords', content: 'DJ,playlist,music,club' },
      { hid: 'author', name: 'author', content: 'nexxtrack' },

      { hid: 'og:site_name', property: 'og:site_name', content: 'Nexxtrack' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://nexxtrack.club' },
      { hid: 'og:title', property: 'og:title', content: 'nexxtrack' },
      { hid: 'og:description', property: 'og:description', content: 'Nexxtrack: Explore which track a professional DJ would mix after that track. You can get recommendation of next track in your DJ play derived from analysis of top 25% playlist made by popular DJs.' },
      { hid: 'og:image', property: 'og:image', content: 'https://nexxtrack.club/ogp.png' },

      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_imae' },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' }
    ]
  },

  css: [],

  plugins: [],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/gtm',
  ],

  axios: {
    baseURL: 'https://api.nexxtrack.club/',
  },

  router: {
    extendRoutes(routes, resolve) {
      for (const route of routes) {
        route.alias = resolve(route.path, 'index.html')
      }
    }
  },

  gtm: {
    id: 'GTM-NWT6KMX'
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  build: {}
}
