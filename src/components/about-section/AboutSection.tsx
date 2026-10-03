import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

const cards = [
  {
    glyph: "४०",
    title: "A forty-verse hymn",
    text: "Written in Awadhi, it has forty chaupais framed by dohas, praising Hanuman’s devotion, wisdom, courage and selfless service to Shri Ram.",
  },
  {
    glyph: "तु",
    title: "By Goswami Tulsidas",
    text: "Traditionally attributed to the 16th-century poet-saint Tulsidas, who also composed the Ramcharitmanas.",
  },
  {
    glyph: "अ",
    title: "Hindi & Hinglish",
    text: "Read the original Devanagari, a Roman transliteration, or both together. Switch any time without interrupting playback.",
  },
];

export default function AboutSection() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="shell">
        <SectionHeading id="about-title" eyebrow="॥ परिचय ॥" title="About the Hanuman Chalisa">
          The Hanuman Chalisa is one of the most beloved devotional hymns, recited daily in homes and temples across the world.
        </SectionHeading>
        <div className="card-grid">
          {cards.map((card) => (
            <article className="info-card" key={card.title}>
              <span className="info-glyph" lang="hi" aria-hidden="true">{card.glyph}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
        <p className="section-link"><Link href="/hanuman-chalisa-lyrics">Read the complete Hanuman Chalisa lyrics in Hindi & English →</Link></p>
      </div>
    </section>
  );
}
