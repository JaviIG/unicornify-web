import type { User } from '~~/layers/auth/models/user.model';
import { subscriptions } from '~~/layers/payments/db/products';
import type { Subscription, SubscriptionPackage } from '~~/layers/payments/models/product.model';
import { eq } from 'drizzle-orm';
import { createError } from 'h3';
import Stripe from 'stripe';
import { UsersTable } from '~~/server/db/db-schema';
import type { UnicornifyWebDb } from '~~/server/middleware/00.container.middleware';

export function createPaymentsService({ stripe, db, domain }: CreatePaymentsSeviceOptions) {
  async function getSubscriptionId(userId: User['id']) {
    const row = await db
      .select({ subscriptionId: UsersTable.subscriptionId })
      .from(UsersTable)
      .where(eq(UsersTable.id, userId))
      .get();
    return row?.subscriptionId;
  }

  return {
    async buy({ productId, quantity, userId }: BuyOptions) {
      const selectedPack = subscriptions[productId as keyof typeof subscriptions];
      if (!selectedPack)
        throw createError({ statusCode: 400, message: `No pack found with id "${productId}"` });
      const session = await stripe.checkout.sessions.create({
        client_reference_id: userId.toString(),
        metadata: selectedPack,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: selectedPack.id,
              },
              unit_amount: selectedPack.price,
              recurring: {
                interval: 'month',
                interval_count: selectedPack.monthsDuration,
              },
            },
            quantity,
          },
        ],
        mode: 'subscription',
        success_url: `${domain}checkout/success/{CHECKOUT_SESSION_ID}`,
      });
      return {
        sessionId: session.id,
      };
    },
    async getCheckoutStatus({ userId, sessionId }: GetCheckoutStatusOptions) {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.client_reference_id !== userId.toString())
        throw createError({ statusCode: 401, message: 'Unauthorized' });
      const product = session.metadata as SubscriptionPackage | null;
      if (!product) throw createError({ statusCode: 500, message: 'No pack found' });
      return {
        status: session.status!,
        paymentStatus: session.payment_status!,
        name: session.customer_details!.name!,
        product,
      };
    },
    async createSubscription({ userId, subscriptionId }: CreateSubscriptionOptions) {
      await db
        .update(UsersTable)
        .set({
          subscriptionId,
        })
        .where(eq(UsersTable.id, userId));
    },
    async cancelSubscription(userId: User['id']) {
      const subscriptionId = await getSubscriptionId(userId);
      if (!subscriptionId) return;
      try {
        await stripe.subscriptions.update(subscriptionId, {
          cancel_at_period_end: true,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        throw createError({ message: "Can't cancel subscription", statusCode: 500 });
      }
    },
    async getSubscription(userId: User['id']): Promise<Subscription | null> {
      const subscriptionId = await getSubscriptionId(userId);
      if (!subscriptionId) return null;
      const sub = await stripe.subscriptions.retrieve(subscriptionId);
      return sub
        ? {
            id: sub.id,
            status: sub.status,
            endDate: new Date(sub.current_period_end * 1000),
          }
        : null;
    },
    async getSubscriptionDetails(userId: User['id']) {
      const subscriptionId = await getSubscriptionId(userId);
      if (!subscriptionId) return;

      const sub = await stripe.subscriptions.retrieve(subscriptionId);
      if (!sub) return null;

      const invoices = await stripe.invoices.list({ subscription: subscriptionId });

      const payments = invoices.data.map((invoice) => ({
        date: new Date(invoice.created * 1000),
        amount: invoice.amount_paid,
        currency: invoice.currency,
      }));

      return {
        id: sub.id,
        status: sub.status,
        endDate: new Date(sub.current_period_end * 1000),
        willBeCanceled: sub.cancel_at_period_end,
        nextPaymentDate: sub.current_period_end ? new Date(sub.current_period_end * 1000) : null,
        payments,
      };
    },
    async reactivateSubscription(userId: User['id']) {
      const subscriptionId = await getSubscriptionId(userId);
      if (!subscriptionId) return;
      await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: false,
      });
    },
  };
}

export type CreatePaymentsSeviceOptions = {
  stripe: Stripe;
  db: UnicornifyWebDb;
  domain: string;
};

export type PaymentsService = ReturnType<typeof createPaymentsService>;

export type BuyOptions = {
  productId: string;
  quantity: number;
  userId: User['id'];
};

export type GetCheckoutStatusOptions = {
  sessionId: string;
  userId: User['id'];
};

export type CreateSubscriptionOptions = {
  userId: User['id'];
  subscriptionId: string;
};
