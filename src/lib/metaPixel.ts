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

/**
 * Track lead submission event
 */
export const trackLead = (
  packageName: string,
  packagePrice?: number,
  orderRef?: string
) => {
  if (typeof window !== "undefined") {
    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead", {
        content_name: packageName,
        value: packagePrice || 0,
        currency: "SAR",
        order_id: orderRef || undefined,
      });
    }
    if (typeof window.ttq?.track === "function") {
      window.ttq.track("SubmitForm", {
        content_name: packageName,
        value: packagePrice || 0,
        currency: "SAR",
      });
      window.ttq.track("CompleteRegistration", {
        content_name: packageName,
        value: packagePrice || 0,
        currency: "SAR",
      });
    }
  }
};

