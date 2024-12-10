import type { SubscriptionPackage } from '~~/layers/payments/models/product.model';
import { toRecordById } from '@unicornify/utils';

export const subscriptions = toRecordById<SubscriptionPackage>([
  { id: 'monthly', price: 750, oldPrice: 1000, monthsDuration: 1 },
  // { id: 'quarter', price: 1750, oldPrice: 2500, monthsDuration: 3 },
  // { id: 'half-year', price: 3250, oldPrice: 5000, monthsDuration: 6 },
]) as Record<'monthly' | 'quarter' | 'half-year', SubscriptionPackage>;
