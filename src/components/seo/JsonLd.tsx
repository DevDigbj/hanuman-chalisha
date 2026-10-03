import { AUDIO_DURATION_ISO, PUBLISHER, SITE_DESCRIPTION, SITE_NAME, SITE_NAME_HI, SITE_URL, absoluteUrl, jsonLd } from "@/lib/site";

/** Structured data for the home page: the website, the hymn and its recording. */
export default function JsonLd() {
  const hymnId = `${SITE_URL}/#hymn`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: absoluteUrl("/"),
        name: SITE_NAME,
        alternateName: [SITE_NAME_HI, "Hanuman Chalisa", "हनुमान चालीसा"],
        description: SITE_DESCRIPTION,
        inLanguage: ["en-IN", "hi"],
        publisher: { "@type": "Organization", name: PUBLISHER.name, url: PUBLISHER.url },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: absoluteUrl("/"),
        name: "Shri Hanuman Chalisa in Hindi & Hinglish - Lyrics & Audio",
        description: SITE_DESCRIPTION,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": hymnId },
        primaryImageOfPage: absoluteUrl("/opengraph-image"),
        inLanguage: "en-IN",
      },
      {
        "@type": "CreativeWork",
        "@id": hymnId,
        name: "Hanuman Chalisa",
        alternateName: ["Shri Hanuman Chalisa", "श्री हनुमान चालीसा"],
        description: "A devotional hymn of forty chaupais, framed by dohas, in praise of Lord Hanuman.",
        author: { "@type": "Person", name: "Goswami Tulsidas" },
        inLanguage: "awa",
        genre: "Devotional hymn",
        about: { "@type": "Thing", name: "Hanuman" },
        url: absoluteUrl("/hanuman-chalisa-lyrics"),
      },
      {
        "@type": "AudioObject",
        name: "Hanuman Chalisa recitation",
        description: "Full recitation of the Hanuman Chalisa with music.",
        contentUrl: absoluteUrl("/audio/hanuman-chalisa.mp3"),
        encodingFormat: "audio/mpeg",
        duration: AUDIO_DURATION_ISO,
        inLanguage: "hi",
        about: { "@id": hymnId },
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(data)} />;
}
