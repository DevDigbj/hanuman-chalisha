import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import PageShell from "@/components/layout/PageShell";
import PanditProfile from "@/components/pandit/PanditProfile";
import { allRituals, pandit } from "@/data/pandit";
import { absoluteUrl, jsonLd } from "@/lib/site";

const path = `/${pandit.slug}`;
const description =
  "Pandit Mankeshwar Upadhyay - Vedic Purohit with 43 years of experience. Vivah, Upanayan and other sanskars, Saraswati, Lakshmi Narayan and Durga puja, Pind Daan, astrology and Vastu.";

export const metadata: Metadata = pageMetadata({
  title: "Pandit Mankeshwar Upadhyay - Vedic Purohit, 43 Years",
  absoluteTitle: true,
  description,
  path,
  type: "profile",
  keywords: ["Pandit Mankeshwar Upadhyay", "Vedic Purohit", "Pandit ji for puja", "Vivah sanskar", "Upanayan sanskar", "Satyanarayan katha", "Pind daan"],
});

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: pandit.name,
  jobTitle: pandit.title,
  description,
  url: absoluteUrl(path),
  knowsAbout: ["Astrology", "Vastu Shastra", ...allRituals],
  ...(pandit.contact.phone ? { telephone: pandit.contact.phone } : {}),
};

export default function PanditPage() {
  return (
    <PageShell
      path={path}
      breadcrumb={false}
      eyebrow="॥ वैदिक पुरोहित ॥"
      title="Pandit Mankeshwar Upadhyay"
      description="Vedic Purohit with 43 years of experience - sanskars, pujas, astrology and Vastu, performed with devotion and full vidhi."
    >
      <PanditProfile />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(personLd)} />
    </PageShell>
  );
}
