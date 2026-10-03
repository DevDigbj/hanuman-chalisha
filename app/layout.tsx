import type { Metadata, Viewport } from "next";
import { Mukta, Tiro_Devanagari_Hindi, Yatra_One } from "next/font/google";
import { SvgDefs } from "@/components/ui/Icons";
import ShareButton from "@/components/share/ShareButton";
import { PUBLISHER, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const body = Mukta({ subsets: ["latin", "devanagari"], weight: ["400", "500", "600", "700"], variable: "--font-body", display: "swap" });
const serif = Tiro_Devanagari_Hindi({ subsets: ["latin", "devanagari"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const display = Yatra_One({ subsets: ["latin", "devanagari"], weight: "400", variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shri Hanuman Chalisa in Hindi & Hinglish | Lyrics & Audio",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Hanuman Chalisa", "हनुमान चालीसा", "Shri Hanuman Chalisa", "Hanuman Chalisa lyrics", "Hanuman Chalisa in Hindi",
    "Hanuman Chalisa Hinglish", "Hanuman Chalisa audio", "Hanuman Chalisa with lyrics", "Tulsidas", "Hanuman bhajan",
  ],
  authors: [{ name: PUBLISHER.name, url: PUBLISHER.url }],
  creator: PUBLISHER.name,
  publisher: PUBLISHER.name,
  category: "religion",
  // No site-wide canonical here - each page sets its own, so 404s and utility pages don't claim to be the home page.
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    alternateLocale: ["hi_IN"],
    title: "Shri Hanuman Chalisa in Hindi & Hinglish",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Shri Hanuman Chalisa in Hindi & Hinglish",
    description: SITE_DESCRIPTION,
  },
  formatDetection: { telephone: false, email: false, address: false },
  // Paste the Google Search Console / Bing verification codes into these env vars when you set them up.
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } } : {}),
  },
};

export const viewport: Viewport = {
  themeColor: "#7a1f12",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${body.variable} ${serif.variable} ${display.variable}`}>
      <body>
        <SvgDefs />
        {children}
        <ShareButton />
      </body>
    </html>
  );
}
