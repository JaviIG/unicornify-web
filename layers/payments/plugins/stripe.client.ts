import type { NuxtApp } from '#app';
import type { CheckoutRequest } from '~~/layers/payments/server/api/private/payments/checkout.post';

declare module '#app' {
  interface NuxtApp {
    $stripe: {
      createPaymentIntent: (request: CheckoutRequest) => Promise<void>;
    };
  }
}
export default defineNuxtPlugin({
  dependsOn: ['unicornify-api' as never],
  async setup(app) {
    const $api = app.$api as NuxtApp['$api'];
    return {
      provide: {
        stripe: {
          async createPaymentIntent(request: CheckoutRequest) {
            const { loadStripe } = await import('@stripe/stripe-js');
            const [stripe, { sessionId }] = await Promise.all([
              loadStripe(app.$config.public.stripeApiKey),
              $api.private.post('payments/checkout', request),
            ]);
            if (!stripe) throw Error('Unable to load stripe');

            await stripe.redirectToCheckout({
              sessionId,
            });
          },
        },
      },
    };
  },
});
