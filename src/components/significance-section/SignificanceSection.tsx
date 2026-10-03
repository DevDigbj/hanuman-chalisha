import SectionHeading from "@/components/ui/SectionHeading";
import { Mandala } from "@/components/ui/Icons";

const virtues = [
  { hi: "बल", en: "Strength", text: "Courage and steadfastness to face life’s difficulties." },
  { hi: "बुद्धि", en: "Wisdom", text: "Clarity of mind and right understanding." },
  { hi: "विद्या", en: "Knowledge", text: "Learning that is used in service of others." },
  { hi: "भक्ति", en: "Devotion", text: "Humble, loving surrender, as Hanuman ji showed to Shri Ram." },
];

export default function SignificanceSection() {
  return (
    <section className="section significance" id="significance" aria-labelledby="significance-title">
      <Mandala className="significance-mandala" />
      <div className="shell">
        <SectionHeading id="significance-title" eyebrow="॥ महिमा ॥" title="Traditional significance" light>
          Devotees recite the Chalisa as an expression of faith and remembrance, often on Tuesdays and Saturdays, at sunrise or in the evening.
        </SectionHeading>
        <blockquote className="significance-quote" lang="hi">
          “बल बुद्धि विद्या देहु मोहिं, हरहु कलेस बिकार॥”
          <cite>Grant me strength, wisdom and knowledge, and remove my sorrows and impurities.</cite>
        </blockquote>
        <div className="virtue-grid">
          {virtues.map((virtue) => (
            <article className="virtue" key={virtue.en}>
              <span className="virtue-hi" lang="hi">{virtue.hi}</span>
              <h3>{virtue.en}</h3>
              <p>{virtue.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
