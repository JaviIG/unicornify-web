import type { PaymentsService } from '../../../services/payments.service';
import { createError, defineEventHandler, getHeader, H3Event, readRawBody } from 'h3';
import { Stripe } from 'stripe';

export default defineEventHandler<Promise<void>>(async (event) => {
  return handleStripeEvent(
    await extractEvent(event),
    event.context.container.get('paymentsService'),
  );
});

async function extractEvent(event: H3Event) {
  const body = await readRawBody(event);
  if (!body) throw createError({ statusCode: 400, message: `No body provided` });
  try {
    const config = useRuntimeConfig(event);
    const signature = getHeader(event, 'stripe-signature')!;
    const stripe = event.context.container.get('stripe');
    return await stripe.webhooks.constructEventAsync(
      body,
      signature,
      config.stripePrivateWebhookSecret,
    );
  } catch (err) {
    throw createError({ statusCode: 400, message: `Webhook Error: ${(err as Error).message}` });
  }
}

async function handleStripeEvent(event: Stripe.Event, paymentsService: PaymentsService) {
  switch (event.type) {
    case 'checkout.session.completed':
      return await handleCheckoutSessionCompleted(event, paymentsService);
    default:
      // Unexpected event type
      return;
  }
}
async function handleCheckoutSessionCompleted(
  event: Stripe.CheckoutSessionCompletedEvent,
  paymentsService: PaymentsService,
) {
  const session = event.data.object;
  const userId = parseInt(session.client_reference_id!);
  const subscriptionId = session.subscription;
  // TODO Revert payment if these errors happen?
  if (!userId) throw createError({ statusCode: 400, message: 'No pack id' });
  if (typeof subscriptionId !== 'string')
    throw createError({ statusCode: 400, message: 'No subscription id' });
  await paymentsService.createSubscription({ userId, subscriptionId });
}
