import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import PageShell from "@/components/layout/PageShell";
import ReadingGuide from "@/components/reading-guide/ReadingGuide";

export const metadata: Metadata = pageMetadata({
  title: "How to Read Hanuman Chalisa - Simple Paath Guide",
  absoluteTitle: true,
  description:
    "A simple guide to reciting the Hanuman Chalisa: listen to the audio, read along in Hindi or Hinglish as each verse lights up, and keep count of your paath.",
  path: "/guide",
  type: "article",
});

export default function GuidePage() {
  return (
    <PageShell
      path="/guide"
      eyebrow="॥ विधि ॥"
      title="How to read"
      description="A few simple steps to listen, read along and keep count of your paath."
    >
      <ReadingGuide />
    </PageShell>
  );
}
