import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Header from "@/components/header/Header";
import HeroSection from "@/components/hero-section/HeroSection";
import Footer from "@/components/footer/Footer";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Shri Hanuman Chalisa in Hindi & Hinglish | Lyrics & Audio",
  absoluteTitle: true,
  description:
    "Read the complete Shri Hanuman Chalisa (श्री हनुमान चालीसा) in Hindi or Hinglish and listen to the full recitation - each verse lights up as it is sung.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <main id="main" className="home">
        <HeroSection />
      </main>
      <Footer />
      <JsonLd />
    </>
  );
}
