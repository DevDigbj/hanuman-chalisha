import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Diya } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="shell not-found">
        <Diya className="pandit-visit-diya" />
        <p className="eyebrow" lang="hi">॥ जय श्री राम ॥</p>
        <h1>This page could not be found</h1>
        <p>The page may have moved. Continue your paath from one of these pages.</p>
        <div className="lyrics-cta-links">
          <Link href="/" className="primary">Listen to the Chalisa</Link>
          <Link href="/hanuman-chalisa-lyrics">Read the lyrics</Link>
          <Link href="/about">About</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
