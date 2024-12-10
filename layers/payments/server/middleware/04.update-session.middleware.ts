import { setUserSession } from '#imports';
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  if (event.path.startsWith('/checkout/success') && event.context.user) {
    const paymentsService = event.context.container.get('paymentsService');
    const subscription = await paymentsService.getSubscription(event.context.user.id);
    await setUserSession(event, {
      subscription,
    });
  }
});
