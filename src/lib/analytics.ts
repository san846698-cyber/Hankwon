type EventName =
  | "landing_started"
  | "intro_completed"
  | "answer_completed"
  | "interview_finished"
  | "preview_viewed"
  | "buy_viewed"
  | "pay_attempted"
  | "waitlist_signed"
  | "share_clicked";

type EventProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: EventProps; callback?: () => void },
    ) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Track an event. Currently sends to Plausible if configured.
 * Falls back to console.debug in development.
 */
export function trackEvent(name: EventName, props?: EventProps): void {
  if (typeof window === "undefined") return;

  if (typeof window.plausible === "function") {
    window.plausible(name, props ? { props } : undefined);
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug("[track]", name, props ?? {});
  }
}
