import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { ChevronIcon } from "@/components/ui/Icons";
import { faqItems } from "@/data/faq";

export default function FAQ() {
  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="shell">
        <SectionHeading id="faq-title" eyebrow="॥ जिज्ञासा ॥" title="Frequently asked questions" />
        <div className="faq-list">
          {faqItems.map(([question, answer]) => (
            <details className="faq-item" key={question}>
              <summary>{question}<ChevronIcon className="faq-chevron" /></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
        <p className="section-link"><Link href="/hanuman-chalisa-lyrics">Read the full Hanuman Chalisa lyrics →</Link> · <Link href="/guide">How to read</Link></p>
      </div>
    </section>
  );
}
