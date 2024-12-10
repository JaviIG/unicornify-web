import { z } from 'zod';
import { defineApiRoute } from '~~/server/utils/api-route.util';

export const PaymentStatusRequestSchema = z.object({ sessionId: z.string().min(1) });

export type PaymentStatusRequest = z.infer<typeof PaymentStatusRequestSchema>;

export default defineApiRoute(
  {
    query: PaymentStatusRequestSchema,
  },
  async ({ event, query }) => {
    return await event.context.container.get('paymentsService').getCheckoutStatus({
      userId: event.context.user.id,
      sessionId: query.sessionId,
    });
  },
);
