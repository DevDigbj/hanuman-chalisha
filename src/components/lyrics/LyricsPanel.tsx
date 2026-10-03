"use client";
import Link from "next/link";
import { Fragment, type CSSProperties, type RefObject } from "react";
import { hanumanChalisa } from "@/data/hanuman-chalisa";
import type { ChalisaVerse, FontScale, Language } from "@/types/lyrics";
import { LotusDivider, Mandala, PauseIcon, PlayIcon } from "@/components/ui/Icons";

interface LyricsPanelProps {
  open: boolean;
  scrollerRef: RefObject<HTMLDivElement | null>;
  language: Language;
  onLanguageChange: (language: Language) => void;
  fontScale: FontScale;
  onFontScaleChange: (scale: FontScale) => void;
  follow: boolean;
  onFollowChange: (follow: boolean) => void;
  activeVerse: number;
  /** Last verse that has started (-1 before the first); verses before it are shown as recited. */
  position: number;
  progress: number;
  playing: boolean;
  status: string;
  onTogglePlay: () => void;
  onVerseSelect: (index: number) => void;
  registerVerse: (id: number, node: HTMLElement | null) => void;
}

const LANGUAGES: { value: Language; label: string; lang?: string }[] = [
  { value: "hindi", label: "हिंदी", lang: "hi" },
  { value: "hinglish", label: "Hinglish" },
  { value: "both", label: "Both" },
];
const SCALES: FontScale[] = ["sm", "md", "lg"];

// Group headings shown before the first verse of each part.
const GROUPS: Record<number, { hi: string; en: string }> = {
  0: { hi: "दोहा", en: "Opening Dohas" },
  2: { hi: "चौपाई", en: "The Forty Chaupais" },
  [hanumanChalisa.length - 1]: { hi: "दोहा", en: "Closing Doha" },
};

const DEVANAGARI_DIGITS = "०१२३४५६७८९";
const toDevanagari = (n: number) => String(n).replace(/\d/g, (d) => DEVANAGARI_DIGITS[Number(d)]);

/** Colours the danda marks (। ॥) like a hand-written manuscript. */
function Line({ text }: { text: string }) {
  return (
    <span className="verse-line">
      {text.split(/([।॥])/).map((part, i) => (part === "।" || part === "॥" ? <span key={i} className="danda">{part}</span> : part))}
    </span>
  );
}

function VerseLines({ verse, language }: { verse: ChalisaVerse; language: Language }) {
  return (
    <>
      {language !== "hinglish" && (
        <span className="verse-hindi" lang="hi">
          <Line text={verse.hindi[0]} />
          <Line text={verse.hindi[1]} />
        </span>
      )}
      {language !== "hindi" && (
        <span className={`verse-roman${language === "both" ? " secondary" : ""}`} lang="hi-Latn">
          <span className="verse-line">{verse.hinglish[0]}</span>
          <span className="verse-line">{verse.hinglish[1]}</span>
        </span>
      )}
    </>
  );
}

/** Gold corner flourish for the manuscript frame. */
const Corner = ({ className }: { className: string }) => (
  <svg className={`lp-corner ${className}`} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <path d="M2 30V10a8 8 0 0 1 8-8h20" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8 26V14a6 6 0 0 1 6-6h12" fill="none" stroke="currentColor" strokeWidth="0.9" opacity=".7" />
    <path d="M14 14c4 0 7 3 7 7-4 0-7-3-7-7Z" fill="currentColor" opacity=".85" />
    <circle cx="34" cy="2" r="1.8" fill="currentColor" /><circle cx="2" cy="34" r="1.8" fill="currentColor" />
  </svg>
);

export default function LyricsPanel(props: LyricsPanelProps) {
  const {
    open, scrollerRef, language, onLanguageChange, fontScale, onFontScaleChange, follow, onFollowChange,
    activeVerse, position, progress, playing, status, onTogglePlay, onVerseSelect, registerVerse,
  } = props;
  const scaleIndex = SCALES.indexOf(fontScale);
  // Verses before the one being sung (or, during a music break, up to the last one sung).
  const recitedUntil = activeVerse >= 0 ? activeVerse : position + 1;

  return (
    <div className={`lyrics-panel${open ? " open" : ""}`} data-scale={fontScale} role="region" aria-labelledby="lyrics-title" aria-hidden={!open} inert={!open}>
      <div className="lp-head">
        <div className="lp-banner">
          <Mandala className="lp-banner-mandala" />
          <h2 id="lyrics-title" lang="hi">श्री हनुमान चालीसा</h2>
          <button type="button" className="lp-play" onClick={onTogglePlay} aria-label={playing ? "Pause recitation" : "Play recitation"}>
            {playing ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
            <span>{status}</span>
          </button>
          <span className="lp-progress" style={{ "--fill": `${progress}%` } as CSSProperties} aria-hidden="true" />
        </div>
        <div className="lp-tools">
          <div className="segmented" role="group" aria-label="Lyrics language">
            {LANGUAGES.map((item) => (
              <button key={item.value} type="button" lang={item.lang} aria-pressed={language === item.value} onClick={() => onLanguageChange(item.value)}>{item.label}</button>
            ))}
          </div>
          <div className="segmented" role="group" aria-label="Text size">
            <button type="button" aria-label="Smaller text" disabled={scaleIndex <= 0} onClick={() => onFontScaleChange(SCALES[scaleIndex - 1])}>A−</button>
            <button type="button" aria-label="Larger text" disabled={scaleIndex >= SCALES.length - 1} onClick={() => onFontScaleChange(SCALES[scaleIndex + 1])}>A+</button>
          </div>
          <label className="switch">
            <input type="checkbox" checked={follow} onChange={(event) => onFollowChange(event.target.checked)} />
            <span className="switch-track" aria-hidden="true" />
            Follow
          </label>
        </div>
      </div>

      <div className="lp-body">
        <Mandala className="lp-watermark" />
        <Corner className="tl" /><Corner className="tr" /><Corner className="bl" /><Corner className="br" />

        <div className="lp-scroll" ref={scrollerRef} tabIndex={0} aria-label="Lyrics">
          <p className="invocation" lang="hi">॥ श्री गणेशाय नमः ॥</p>
          <p className="invocation-sub" lang="hi">॥ श्री हनुमते नमः ॥</p>
          <ol className="verses">
            {hanumanChalisa.map((verse) => {
              const active = activeVerse === verse.id;
              const recited = verse.id < recitedUntil && !active;
              const group = GROUPS[verse.id];
              return (
                <Fragment key={verse.id}>
                  {group && (
                    <li className="verse-group" aria-hidden="true">
                      <span className="vg-line" />
                      <span className="vg-title"><span lang="hi">॥ {group.hi} ॥</span><small>{group.en}</small></span>
                      <span className="vg-line" />
                    </li>
                  )}
                  <li className={`verse-item ${verse.kind}`}>
                    <button
                      type="button"
                      className={`verse ${verse.kind}${active ? " active" : ""}${recited ? " recited" : ""}`}
                      ref={(node) => registerVerse(verse.id, node)}
                      onClick={() => onVerseSelect(verse.id)}
                      aria-current={active ? "true" : undefined}
                    >
                      <span className="verse-badge" aria-hidden="true" lang="hi">
                        {verse.kind === "doha" ? "दोहा" : toDevanagari(verse.number)}
                      </span>
                      <span className="sr-only">{verse.label}. Play from here: </span>
                      <VerseLines verse={verse} language={language} />
                      {active && playing && <span className="now-playing" aria-hidden="true"><i /><i /><i /> Now reciting</span>}
                    </button>
                  </li>
                </Fragment>
              );
            })}
          </ol>
          <div className="reader-end" lang="hi">
            <LotusDivider />
            <p className="jaikara">सियावर रामचन्द्र की जय ।<br />पवनसुत हनुमान की जय ॥</p>
            <p className="jaikara-sub">॥ इति ॥</p>
            <Link className="lyrics-panel-link" href="/hanuman-chalisa-lyrics">Read the full lyrics page (Hindi & English)</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
