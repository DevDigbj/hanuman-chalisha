import type { Metadata } from "next";
import { SITE_NAME } from "./site";

interface PageSeo {
  /** Page title; the site name is appended automatically unless `absoluteTitle` is set. */
  title: string;
  description: string;
  /** Path starting with "/", used for the canonical URL and social links. */
  path: string;
  absoluteTitle?: boolean;
  type?: "website" | "article" | "profile";
  keywords?: string[];
}

/**
 * Complete metadata for a page. Next.js replaces (rather than merges) the layout's
 * openGraph / twitter objects when a page sets them, so each page gets the full set here.
 */
export function pageMetadata({ title, description, path, absoluteTitle = false, type = "website", keywords }: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    // Setting openGraph on a page drops the automatic share image, so add it back explicitly.
    openGraph: {
      type, siteName: SITE_NAME, locale: "en_IN", url: path, title: fullTitle, description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/twitter-image"] },
  };
}
