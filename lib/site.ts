/** Live public site URL used for Open Graph / WhatsApp link previews. */
export const SITE_URL = "https://famoustours.lk";

/** Absolute path to the share image (PNG — WhatsApp scrapers are unreliable with WebP). */
export const OG_IMAGE_PATH = "/images/og-share.png";

export const ogImage = {
  url: OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: "Famous Tours & Travels logo",
  type: "image/png",
} as const;
