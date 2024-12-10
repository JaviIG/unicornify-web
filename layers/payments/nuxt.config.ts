export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      stripeApiKey: '',
    },
    stripePrivateApiKey: '',
    stripePrivateWebhookSecret: '',
  },
  i18n: {
    locales: [{ code: 'en', file: 'en.json' }],
  },
});
