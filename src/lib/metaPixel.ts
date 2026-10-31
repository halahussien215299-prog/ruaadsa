export const FB_PIXEL_ID = "1123225963439754";
export const TIKTOK_PIXEL_ID = "DBIUQE3C77UEENV8D9TG";

declare global {
  interface Window {
    fbq?: {
      (...args: unknown[]): void;
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
    };
    _fbq?: unknown;
    ttq?: {
      track?: (event: string, params?: Record<string, unknown>) => void;
      page?: () => void;
      [key: string]: any;
    };
  }
}

/**
 * Fires the default PageView event.
 */
export const pageview = () => {
  if (typeof window !== "undefined") {
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
    if (typeof window.ttq?.page === "function") {
      window.ttq.page();
    }
  }
};

/**
 * Fires a custom or standard Meta Pixel event.
 */
export const trackEvent = (
  eventName: string,
  parameters: Record<string, unknown> = {}
) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", eventName, parameters);
  }
};

/**
 * Track user contact actions (WhatsApp / Phone click)
 */
export const trackContact = (channel: "WhatsApp" | "Phone", label?: string) => {
  if (typeof window !== "undefined") {
    if (typeof window.fbq === "function") {
      window.fbq("track", "Contact", {
        content_name: channel,
        content_category: label || "Customer Inquiry",
      });
    }
    if (typeof window.ttq?.track === "function") {
      window.ttq.track("Contact", {
        content_name: channel,
        description: label || "Customer Inquiry",
      });
    }
  }
};

// Deduplication cache to prevent firing duplicate events for the same order
const trackedOrderRefs = new Set<string>();

/**
 * Track lead submission event (Meta 'Lead' + TikTok 'SubmitForm')
 * Guaranteed to fire at most once per unique order reference.
 */
export const trackLead = (
  packageName: string,
  packagePrice?: number,
  orderRef?: string
) => {
  if (typeof window === "undefined") return;

  // Prevent duplicate tracking if the same order is re-rendered or submitted repeatedly
  if (orderRef) {
    if (trackedOrderRefs.has(orderRef)) {
      return;
    }
    trackedOrderRefs.add(orderRef);
  }

  // Meta Pixel 'Lead' event
  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead", {
      content_name: packageName,
      value: packagePrice || 0,
      currency: "SAR",
      order_id: orderRef || undefined,
    });
  }

  // TikTok Pixel 'SubmitForm' event only (CompleteRegistration removed to avoid duplication)
  if (typeof window.ttq?.track === "function") {
    window.ttq.track("SubmitForm", {
      content_name: packageName,
      value: packagePrice || 0,
      currency: "SAR",
      event_id: orderRef || undefined,
    });
  }
};

