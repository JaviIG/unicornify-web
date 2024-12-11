import { createHttpClient, type HttpClient } from '~/services/http-client.factory';
import { type LocalApi } from '~/services/local-api.types';

declare module '#app' {
  interface NuxtApp {
    $api: {
      public: HttpClient<LocalApi, '/api/public/'>;
      private: HttpClient<LocalApi, '/api/private/'>;
      premium: HttpClient<LocalApi, '/api/premium/'>;
    };
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $api: {
      public: HttpClient<LocalApi, '/api/public/'>;
      private: HttpClient<LocalApi, '/api/private/'>;
      premium: HttpClient<LocalApi, '/api/premium/'>;
    };
  }
}

export default defineNuxtPlugin({
  name: 'unicornify-api',
  setup() {
    const headers = useRequestHeaders(['cookie']);
    return {
      provide: {
        api: {
          public: createHttpClient('/api/public/')(),
          private: createHttpClient('/api/private/')(() => ({
            headers,
          })),
          premium: createHttpClient('/api/premium/')(() => ({
            headers,
          })),
        },
      },
    };
  },
});
