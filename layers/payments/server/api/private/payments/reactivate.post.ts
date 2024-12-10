import { defineApiRoute } from '~~/server/utils/api-route.util';

export default defineApiRoute({}, async ({ event }) => {
  return await event.context.container
    .get('paymentsService')
    .reactivateSubscription(event.context.user.id);
});
