import { defineApiRoute } from '~~/server/utils/api-route.util';

export default defineApiRoute({}, async ({ event }) => {
  const paymentService = event.context.container.get('paymentsService');
  return paymentService.getSubscriptionDetails(event.context.user.id);
});
