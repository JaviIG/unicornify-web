export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      posthogApiKey: '',
      posthogHostName: '',
    },
  },
  i18n: {
    locales: [{ code: 'en', file: 'en.json' }],
  },
});
