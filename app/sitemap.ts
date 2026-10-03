import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/hanuman-chalisa-lyrics`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/guide`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/pandit-mankeshwar-upadhyay`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
