/**
 * Site-wide settings used for SEO (canonical URLs, sitemap, structured data, social cards).
 *
 * Set NEXT_PUBLIC_SITE_URL to the live domain (e.g. https://hanumanchalisa.example.com) in
 * .env.local or your hosting dashboard - every canonical link and the sitemap use it.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.qubitsoftech.com").replace(/\/$/, "");

export const SITE_NAME = "Shri Hanuman Chalisa";
export const SITE_NAME_HI = "श्री हनुमान चालीसा";
export const SITE_DESCRIPTION =
  "Read and listen to the complete Shri Hanuman Chalisa (श्री हनुमान चालीसा) in Hindi and Hinglish, with lyrics that light up verse by verse as the recitation plays.";

export const PUBLISHER = { name: "QubitSofTech", url: "https://www.qubitsoftech.com/" };

/** Recording length, for structured data (9 min 41 s). */
export const AUDIO_DURATION_ISO = "PT9M41S";

export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** Serialises JSON-LD safely for a <script> tag. */
export const jsonLd = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });
