// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'node:path';

export default defineNuxtConfig({
  compatibilityDate: '2024-07-07',
  nitro: {
    preset: 'cloudflare_pages',
    prerender: {
      autoSubfolderIndex: false, // For cloudflare https://nuxt.com/deploy/cloudflare#route-matching
    },
  },
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/test-utils/module',
    '@nuxt/fonts',
    '@nuxt/content',
    'nitro-cloudflare-dev',
  ],
  devtools: { enabled: false },
  css: [`@unicornify/gleam-ui/style.css`, `@unicornify/gleam-ui/scss/reset.scss`],
  runtimeConfig: {
    internalApiSecret: '',
    mailgunPrivateApiKey: '',
    mailgunPrivateSecretKey: '',
    domain: '',
  },
  components: {
    dirs: [],
  },
  imports: {
    autoImport: false,
  },
  i18n: {
    baseUrl: '/',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      fallbackLocale: 'en',
      redirectOn: 'root',
    },
    locales: [{ code: 'en', file: 'en.json', language: 'en' }],
  },
  content: {
    highlight: false,
    sources: {
      legal: {
        driver: 'fs',
        base: resolve(__dirname, 'app/content'),
      },
    },
  },
  vite: {
    ssr: {
      noExternal: ['@unicornify/gleam-ui'],
    },
    build: {
      assetsInlineLimit: 0,
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
  experimental: {
    viewTransition: true,
  },
  app: {
    head: {
      link: [
        { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png' },
        { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-icon-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/manifest.json' },
      ],
      meta: [
        { name: 'msapplication-TileColor', content: '#1d1b23' },
        { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
        { name: 'theme-color', content: '#1d1b23' },
      ],
    },
  },
});
