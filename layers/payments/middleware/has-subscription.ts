import { defineNuxtRouteMiddleware, navigateTo } from '#app';
import { useUser } from '~~/layers/auth/composables/user.composable';

export default defineNuxtRouteMiddleware(() => {
  const { isSubscriptionActive } = useUser();
  if (!isSubscriptionActive()) {
    return navigateTo('/');
  }
});
