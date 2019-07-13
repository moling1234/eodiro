// global title and description
// we can set these on each page vue components
const title = '어디로'
const description = ''
const modifyHtml = html => {
  // remove data-n-head="true"
  return html.replace(/data-n-head="true"/g, '')
}

export default {
  // custom global id of html dom
  globalName: 'eodiro',

  mode: 'universal', // SSR + CSR (hybrid)

  // head tags options
  head: {
    htmlAttrs: {
      lang: 'ko',
      class: 'light-mode'
    },
    title: title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description },
      {
        property: 'og:title',
        content: title
      },
      {
        property: 'og:description',
        content: description
      },
      {
        property: 'og:image',
        content: 'https://eodiro.com/assets/images/open-graph/open_graph.png'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // source directory ('/client')
  srcDir: 'client',

  // custom link class names
  router: {
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link'
  },

  // hooks: {
  //   'generate:page': (page) => {
  //     page.html = modifyHtml(page.html)
  //   },
  //   'render:route': (url, page, { req, res }) => {
  //     page.html = modifyHtml(page.html)
  //   }
  // },

  // not using nuxt's loading feature
  loading: false,

  // include global css/scss files
  css: [
    '~/assets/styles/css/fonts_new.css',
    { src: '~/assets/styles/scss/globalstyle.scss', lang: 'scss' },
    { src: '~/assets/styles/scss/gradients-simple.scss', lang: 'scss' },
    { src: '~/assets/styles/stylus/spring.styl', lang: 'styl' }
  ],

  // modules
  modules: [
    [
      'nuxt-i18n',
      {
        locales: [
          {
            name: 'English',
            code: 'en',
            iso: 'en-US'
          },
          {
            name: 'Korean',
            code: 'kr',
            iso: 'ko-KR'
          }
        ],
        defaultLocale: 'kr',
        vueI18nLoader: true,
        detectBrowserLanguage: {
          useCookie: true,
          alwaysRedirect: false
        }
      }
    ]
  ],

  // transition between routes
  pageTransition: {
    name: 'fade',
    mode: 'out-in'
  },

  // custom build path name
  build: {
    publicPath: '/dist/'
  }
}