import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Hanuman Chalisa",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#3a0c09",
    theme_color: "#7a1f12",
    lang: "en-IN",
    categories: ["lifestyle", "music", "books"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
