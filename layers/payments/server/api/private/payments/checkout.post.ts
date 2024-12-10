import { SubscriptionPackageSchema } from '~~/layers/payments/models/product.model';
import { z } from 'zod';
import { defineApiRoute } from '~~/server/utils/api-route.util';

export const CheckoutRequestSchema = z.object({
  productId: SubscriptionPackageSchema.shape.id,
  quantity: z.number().int().min(1),
});

export type CheckoutRequest = z.infer<typeof CheckoutRequestSchema>;

export type CheckoutPostResponse = {
  sessionId: string;
};

export default defineApiRoute(
  {
    body: CheckoutRequestSchema,
  },
  async ({ event, body }) => {
    return await event.context.container.get('paymentsService').buy({
      productId: body.productId,
      quantity: body.quantity,
      userId: event.context.user.id,
    });
  },
);
