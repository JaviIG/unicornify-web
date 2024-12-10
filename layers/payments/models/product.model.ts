import { z } from 'zod';

export const SubscriptionPackageSchema = z.object({
  id: z.string().min(1),
  price: z.number().int().positive(),
  oldPrice: z.number().int().positive().optional(),
  monthsDuration: z.number().int().positive(),
});

export type SubscriptionPackage = z.infer<typeof SubscriptionPackageSchema>;

export const SubscriptionSchema = z.object({
  id: z.string(),
  status: z.enum([
    'active',
    'canceled',
    'incomplete',
    'incomplete_expired',
    'past_due',
    'trialing',
    'unpaid',
    'paused',
  ]),
  endDate: z.date(),
});

export type Subscription = z.infer<typeof SubscriptionSchema>;
