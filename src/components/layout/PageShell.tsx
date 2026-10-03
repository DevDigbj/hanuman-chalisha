import Link from "next/link";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Blessing from "@/components/blessing/Blessing";
import { Mandala } from "@/components/ui/Icons";
import { absoluteUrl, jsonLd } from "@/lib/site";

interface PageShellProps {
  title: string;
  eyebrow: string;
  description: string;
  path: string;
  /** Show the "Home › Page" trail above the title (default true). */
  breadcrumb?: boolean;
  children: React.ReactNode;
}


/** Layout for the inner pages: header, banner with breadcrumb, content, closing prayer and footer. */
export default function PageShell({ title, eyebrow, description, path, breadcrumb = true, children }: PageShellProps) {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: title, item: absoluteUrl(path) },
    ],
  };

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <main id="main">
        <section className="page-banner" aria-labelledby="page-title">
          <Mandala className="page-banner-mandala" />
          <div className="shell">
            {breadcrumb && (
              <nav className="breadcrumb" aria-label="Breadcrumb">
                <ol>
                  <li><Link href="/">Home</Link></li>
                  <li aria-current="page">{title}</li>
                </ol>
              </nav>
            )}
            <p className="eyebrow" lang="hi">{eyebrow}</p>
            <h1 id="page-title">{title}</h1>
            <p className="page-banner-text">{description}</p>
          </div>
        </section>
        {children}
        <Blessing />
      </main>
      <Footer />
      {breadcrumb && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbLd)} />}
    </>
  );
}
