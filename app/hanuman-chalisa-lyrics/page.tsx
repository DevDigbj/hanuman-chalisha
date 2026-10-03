import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import PageShell from "@/components/layout/PageShell";
import { LotusDivider } from "@/components/ui/Icons";
import { hanumanChalisa } from "@/data/hanuman-chalisa";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL, absoluteUrl, jsonLd } from "@/lib/site";

const path = "/hanuman-chalisa-lyrics";

export const metadata: Metadata = pageMetadata({
  title: "Hanuman Chalisa Lyrics in Hindi & English | Full Text",
  absoluteTitle: true,
  description:
    "Complete Shri Hanuman Chalisa lyrics - all 2 opening dohas, 40 chaupais and the closing doha - in Hindi (हनुमान चालीसा) and English transliteration, with audio to read along.",
  path,
  type: "article",
  keywords: ["Hanuman Chalisa lyrics", "हनुमान चालीसा लिरिक्स", "Hanuman Chalisa in Hindi", "Hanuman Chalisa in English", "Hanuman Chalisa Hinglish", "Hanuman Chalisa full text"],
});

const GROUPS: Record<number, { hi: string; en: string }> = {
  0: { hi: "॥ दोहा ॥", en: "Opening Dohas" },
  2: { hi: "॥ चौपाई ॥", en: "Chaupais" },
  [hanumanChalisa.length - 1]: { hi: "॥ दोहा ॥", en: "Closing Doha" },
};

const DIGITS = "०१२३४५६७८९";
const toDevanagari = (n: number) => String(n).replace(/\d/g, (d) => DIGITS[Number(d)]);

const lyricsLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": `${SITE_URL}/#hymn`,
  name: "Hanuman Chalisa",
  alternateName: ["Shri Hanuman Chalisa", "श्री हनुमान चालीसा"],
  author: { "@type": "Person", name: "Goswami Tulsidas" },
  inLanguage: "awa",
  genre: "Devotional hymn",
  url: absoluteUrl(path),
  text: hanumanChalisa.map((v) => `${v.hindi[0]} ${v.hindi[1]}`).join("\n"),
  audio: { "@type": "AudioObject", contentUrl: absoluteUrl("/audio/hanuman-chalisa.mp3"), encodingFormat: "audio/mpeg" },
};

export default function LyricsPage() {
  return (
    <PageShell
      path={path}
      eyebrow="॥ श्री हनुमान चालीसा ॥"
      title="Hanuman Chalisa Lyrics"
      description="The complete Hanuman Chalisa - 2 opening dohas, 40 chaupais and the closing doha - in Hindi and in English (Hinglish) transliteration."
    >
      <section className="section lyrics-page" aria-label="Hanuman Chalisa lyrics">
        <div className="shell lyrics-page-inner">
          <nav className="lyrics-jump" aria-label="Jump to">
            <a href="#hindi" lang="hi">हिंदी में पढ़ें</a>
            <a href="#hinglish">Read in English (Hinglish)</a>
            <Link href="/#lyrics" className="primary">▶ Listen with lyrics</Link>
          </nav>

          <article className="lyrics-sheet" id="hindi" lang="hi" aria-labelledby="hindi-title">
            <h2 id="hindi-title">श्री हनुमान चालीसा <small>हिंदी</small></h2>
            <p className="lyrics-invocation">॥ श्री गणेशाय नमः ॥</p>
            {hanumanChalisa.map((verse) => (
              <Fragment key={verse.id}>
                {GROUPS[verse.id] && <h3 className="lyrics-group">{GROUPS[verse.id].hi}</h3>}
                <p className={`lyrics-verse ${verse.kind}`}>
                  {verse.hindi[0]}<br />
                  {verse.kind === "chaupai" ? (
                    <>{verse.hindi[1].replace(/\s*॥\s*$/, "")} <span className="lyrics-num">॥{toDevanagari(verse.number)}॥</span></>
                  ) : verse.hindi[1]}
                </p>
              </Fragment>
            ))}
            <LotusDivider />
            <p className="lyrics-jaikara">सियावर रामचन्द्र की जय । पवनसुत हनुमान की जय ॥</p>
          </article>

          <article className="lyrics-sheet" id="hinglish" lang="hi-Latn" aria-labelledby="hinglish-title">
            <h2 id="hinglish-title">Shri Hanuman Chalisa <small>English / Hinglish</small></h2>
            <p className="lyrics-invocation">Shri Ganeshaya Namah</p>
            {hanumanChalisa.map((verse) => (
              <Fragment key={verse.id}>
                {GROUPS[verse.id] && <h3 className="lyrics-group">{GROUPS[verse.id].en}</h3>}
                <p className={`lyrics-verse ${verse.kind}`}>
                  {verse.hinglish[0]}<br />{verse.hinglish[1]}
                  {verse.kind === "chaupai" && <span className="lyrics-num"> ({verse.number})</span>}
                </p>
              </Fragment>
            ))}
            <LotusDivider />
            <p className="lyrics-jaikara">Siyavar Ramchandra ki jai. Pavansut Hanuman ki jai.</p>
          </article>

          <aside className="lyrics-cta">
            <p lang="hi">॥ जय श्री राम ॥</p>
            <h2>Recite along with the audio</h2>
            <p>On the home page each verse lights up as it is sung, so you can follow the paath at the singer’s pace.</p>
            <div className="lyrics-cta-links">
              <Link href="/#lyrics" className="primary">Listen with lyrics</Link>
              <Link href="/about">About the Chalisa</Link>
              <Link href="/faq">FAQ</Link>
            </div>
          </aside>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(lyricsLd)} />
    </PageShell>
  );
}
