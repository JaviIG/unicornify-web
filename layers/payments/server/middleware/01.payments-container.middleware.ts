import { defineEventHandler } from 'h3';
import { createPaymentsService } from '../services/payments.service';
import Stripe from 'stripe';

declare module '~~/server/container.types' {
  export interface ContainerValues {
    stripe: Stripe;
    paymentsService: ReturnType<typeof createPaymentsService>;
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  event.context.container.register('paymentsService', ({ get }) => {
    return createPaymentsService({ stripe: get('stripe'), db: get('db'), domain: config.domain });
  });
  event.context.container.register('stripe', () => new Stripe(config.stripePrivateApiKey));
});
