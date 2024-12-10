import { defineApiRoute } from '~~/server/utils/api-route.util';

export default defineApiRoute({}, async ({ event }) => {
  return await event.context.container
    .get('paymentsService')
    .cancelSubscription(event.context.user.id);
});
