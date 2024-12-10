export type CookieSettings = {
  /** Cookies that are required for the website to function properly. */
  readonly essential: true;
  /** Cookies that are used to track user behaviour and to help improve the website. */
  tracking: boolean;
};

export type CookieKind = keyof CookieSettings;
