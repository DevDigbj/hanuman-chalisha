import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import PageShell from "@/components/layout/PageShell";
import FAQ from "@/components/faq/FAQ";
import { faqItems } from "@/data/faq";
import { jsonLd } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Hanuman Chalisa FAQ - Verses, Timing & Recitation",
  absoluteTitle: true,
  description:
    "Answers to common questions about the Hanuman Chalisa: how many verses it has, when to recite it, how long it takes, and reading it in Hindi or Hinglish.",
  path: "/faq",
});

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
};

export default function FaqPage() {
  return (
    <PageShell
      path="/faq"
      eyebrow="॥ जिज्ञासा ॥"
      title="FAQ"
      description="Common questions about the Hanuman Chalisa and this reader."
    >
      <FAQ />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqLd)} />
    </PageShell>
  );
}
