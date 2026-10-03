import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import SyncTool from "@/components/sync/SyncTool";

export const metadata: Metadata = {
  title: "Sync lyrics to the recording",
  robots: { index: false, follow: false },
  alternates: { canonical: "/sync" },
};

export default function SyncPage() {
  return (
    <PageShell
      path="/sync"
      eyebrow="॥ ताल मिलान ॥"
      title="Sync lyrics"
      description="Mark when each verse begins in the recording so the lyrics highlight in step with the singer, music breaks included."
    >
      <SyncTool />
    </PageShell>
  );
}
