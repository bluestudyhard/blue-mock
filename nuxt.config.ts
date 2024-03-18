import { appDescription } from './src/constants/index'

const {
  USER_APP_ID: appId,
} = process.env

const tiptapUrl = `https://${appId}.collab.tiptap.cloud/api`

export default defineNuxtConfig({
  srcDir: 'src/',
  serverDir: './server',
  dir: {
    public: '../public',
  },

  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    // 如果需要在这些注册的module里面添加配置需要再套一层
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore'],
      },
    ],
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/color-mode',
    '@element-plus/nuxt',
  ],

  imports: {
    dirs: [
      'stores',
      'server/utils',
    ],
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    // inlineSSRStyles: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
    // join(root, 'src/asset/styles/main.scss'),
    '~/asset/styles/main.scss',
  ],

  colorMode: {
    classSuffix: '',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
    routeRules: {
      '/tiptap/**': { proxy: `${tiptapUrl}/**` },
    },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  devtools: {
    enabled: true,
  },

  // fix: unocss + nuxt3.9 error
  // @see at https://github.com/unocss/unocss/issues/3468#issuecomment-1871049463
  features: {
    inlineStyles: false,
  },
})
