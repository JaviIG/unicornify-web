type CreateTrackingServiceOptions = {
  apiKey: string;
  host: string;
};

export type TrackingService = {
  trackPageView(url: string): void;
  enable(): void;
  disable(): void;
};
export async function createTrackingService(options: CreateTrackingServiceOptions) {
  const posthog = await import('posthog-js').then((bundle) => bundle.default);
  posthog.init(options.apiKey, {
    api_host: options.host,
    autocapture: false,
    disable_session_recording: true,
  });

  return {
    trackPageView(url: string) {
      posthog.capture('$pageview', {
        current_url: url,
      });
    },
    enable() {
      posthog.opt_in_capturing();
    },
    disable() {
      posthog.clear_opt_in_out_capturing();
    },
  };
}
