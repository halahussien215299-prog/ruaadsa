export const FB_PIXEL_ID = "1123225963439754";

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
  }
}

/**
 * Fires the default PageView event.
 */
export const pageview = () => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "PageView");
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
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Contact", {
      content_name: channel,
      content_category: label || "Customer Inquiry",
    });
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
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Lead", {
      content_name: packageName,
      value: packagePrice || 0,
      currency: "SAR",
      order_id: orderRef || undefined,
    });
  }
};

