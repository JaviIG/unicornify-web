import { useCookie } from '#imports';
import type { CookieSettings } from '~~/layers/tagging/models/cookie-settings.model';

export function useTaggingCookies() {
  const cookieSettings = useCookie<CookieSettings>('cookieSettings', {
    default: () => ({ essential: true, tracking: false }),
    maxAge: 60 * 60 * 24 * 365,
  });
  const hasInteractedWithCookies = useCookie('hasInteractedWithCookies', {
    default: () => false,
    maxAge: 60 * 60 * 24 * 365,
  });
  return {
    cookieSettings,
    hasInteractedWithCookies,
  };
}
