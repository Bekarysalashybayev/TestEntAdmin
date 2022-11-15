export default {
  server: {
    // host: '0',
    port: 3002
  },
  head: {
    title: 'admin',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
    ],
    script: [
      // {
      //   hid: 'stripe',
      //   src:"https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML",
      //   defer: true,
      //   callback: () => { this.isStripeLoaded = true }
      // },
      {
        src:"/js/index.js",
        body: true,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/default.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/axios.js",
    { src: "@/plugins/vClickOutside", ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/moment',
    // With options
    ['@nuxtjs/moment', { /* module options */ }]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/toast',
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],
  auth: {
    strategies: {
      local: {
        token: {
          property: 'access',
        },
        user: {
          property: '',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/user/staff-login/', method: 'post'},
          user: { url: '/user/me/', method: 'get' },
          logout: false,
        }
      },
    },
    redirect: {
      login: '/login',
      logout: '/login',
    },
  },
  router: {
    middleware: ['auth'],
  },
  axios: {
    baseURL: process.env.BASE_URL
  },
  toast: {
    position: 'top-center',
    duration: '1000',
    register: []
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [['@babel/plugin-proposal-private-property-in-object', { loose: true }]],
    },
  }
}
