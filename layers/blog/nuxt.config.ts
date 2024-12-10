import { resolve } from 'node:path';

export default defineNuxtConfig({
  content: {
    highlight: false,
    sources: {
      blog: {
        driver: 'fs',
        base: resolve(__dirname, 'content'),
      },
    },
  },
  i18n: {
    locales: [{ code: 'en', file: 'en.json' }],
  },
});
