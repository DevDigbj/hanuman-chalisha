import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import PageShell from "@/components/layout/PageShell";
import AboutSection from "@/components/about-section/AboutSection";
import SignificanceSection from "@/components/significance-section/SignificanceSection";

export const metadata: Metadata = pageMetadata({
  title: "About Hanuman Chalisa - Meaning, History & Significance",
  absoluteTitle: true,
  description:
    "What is the Hanuman Chalisa? Learn about Goswami Tulsidas’s hymn of 40 chaupais and 3 dohas, its Awadhi language, and why devotees recite it on Tuesdays and Saturdays.",
  path: "/about",
  type: "article",
});

export default function AboutPage() {
  return (
    <PageShell
      path="/about"
      eyebrow="॥ परिचय ॥"
      title="About"
      description="The hymn of forty verses in praise of Shri Hanuman, and why it is so dear to devotees."
    >
      <AboutSection />
      <SignificanceSection />
    </PageShell>
  );
}
