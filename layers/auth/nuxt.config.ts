export default defineNuxtConfig({
  modules: ['nuxt-auth-utils'],
  i18n: {
    locales: [{ code: 'en', file: 'en.json' }],
  },
  runtimeConfig: {},
  imports: {
    global: false,
  },
});
