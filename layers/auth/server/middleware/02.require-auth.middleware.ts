import { requireUserSession } from '#imports';
import { defineEventHandler } from 'h3';
import { type User } from '../../models/user.model';
import type { Subscription } from '~~/layers/payments/models/product.model';

declare module 'h3' {
  interface H3EventContext {
    user: Pick<User, 'id' | 'createdAt'>;
    userSubscription: User;
  }
}

declare module '#auth-utils' {
  interface User {
    id: number;
    createdAt: string;
    avatarUrl?: string;
  }

  interface UserSession {
    subscription: Subscription | null;
  }
}

export default defineEventHandler(async (event) => {
  const path = event.path;
  if (
    path.includes('/private/') ||
    path.includes('/premium/') ||
    path.includes('/checkout/success')
  ) {
    const session = await requireUserSession(event);
    event.context.user = {
      id: session.user.id,
      createdAt: new Date(session.user.createdAt),
    };
  }
});
