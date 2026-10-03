import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /sync is a private tool (it also carries noindex); the WhatsApp link only redirects.
      disallow: ["/pandit-mankeshwar-upadhyay/whatsapp"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
