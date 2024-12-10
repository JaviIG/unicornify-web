import { requireUserSession } from '#imports';
import { createError, defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  if (event.path.split('/').includes('premium')) {
    const { subscription } = await requireUserSession(event);
    if (!subscription) {
      throw createError({
        statusCode: 403,
        message: 'You need to be a premium user to access this resource',
      });
    }
    if (new Date(subscription.endDate) < new Date()) {
      throw createError({
        statusCode: 403,
        message: 'Your subscription has expired, please renew to access this resource',
      });
    }
  }
});
