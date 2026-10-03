"use client";
import { useCallback, useEffect, useRef } from "react";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import { useLyricsSync } from "@/hooks/use-lyrics-sync";
import { useStoredValue } from "@/hooks/use-local-storage";
import { useHeroMode, type HeroMode } from "@/hooks/use-hero-mode";
import { useVerseTimings } from "@/hooks/use-verse-timings";
import { hanumanChalisa } from "@/data/hanuman-chalisa";
import type { FontScale, Language } from "@/types/lyrics";
import { BookIcon, HeadphonesIcon, Mandala } from "@/components/ui/Icons";
import PlayerBar from "@/components/player/PlayerBar";
import { progressPercent } from "@/components/player/shared";
import LyricsPanel from "@/components/lyrics/LyricsPanel";
import HeroArt from "./HeroArt";
import PushpaVarsha, { type PushpaVarshaHandle } from "@/components/pushpa-varsha/PushpaVarsha";

const parseLanguage = (raw: string) => (raw === "hindi" || raw === "hinglish" || raw === "both" ? raw : undefined);
const parseScale = (raw: string) => (raw === "sm" || raw === "md" || raw === "lg" ? raw : undefined);
const parseCount = (raw: string) => { const n = Number.parseInt(raw, 10); return Number.isFinite(n) && n >= 0 ? n : undefined; };
const parseBool = (raw: string) => raw === "true";

const isInteractive = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|SELECT|TEXTAREA|BUTTON|SUMMARY|A)$/.test(target.tagName));

const MODES: { value: HeroMode; label: string; Icon: typeof HeadphonesIcon }[] = [
  { value: "audio", label: "Audio", Icon: HeadphonesIcon },
  { value: "lyrics", label: "Lyrics", Icon: BookIcon },
];

export default function HeroSection() {
  const [mode, setMode] = useHeroMode();
  const [language, setLanguage] = useStoredValue<Language>("chalisa-language", "hindi", parseLanguage);
  const [fontScale, setFontScale] = useStoredValue<FontScale>("chalisa-font-scale", "md", parseScale);
  const [follow, setFollow] = useStoredValue<boolean>("chalisa-follow", true, parseBool);
  const [paathCount, setPaathCount] = useStoredValue<number>("chalisa-paath-count", 0, parseCount);

  const countRef = useRef(paathCount);
  useEffect(() => { countRef.current = paathCount; }, [paathCount]);
  const onComplete = useCallback(() => setPaathCount(countRef.current + 1), [setPaathCount]);

  const { audioRef, ...player } = useAudioPlayer(onComplete);
  const lyricsOpen = mode === "lyrics";
  const { marks, anchors, breaks } = useVerseTimings();
  const { activeVerse, position, timeline, registerVerse, scrollerRef, scrollToVerse } =
    useLyricsSync(player.currentTime, player.duration, follow && lyricsOpen, marks, anchors, breaks);

  // Don't highlight the first verse until the recitation has actually started.
  const started = player.playing || player.currentTime > 0;
  const highlighted = started ? activeVerse : -1;

  // Pushpa varsha: a shower of flowers when the closing doha completes the paath.
  // Only on natural playback - not when seeking past it.
  const varshaRef = useRef<PushpaVarshaHandle>(null);
  const lastSung = useRef(-1);
  const isPlaying = player.playing;
  useEffect(() => {
    const previous = lastSung.current;
    lastSung.current = activeVerse;
    const closingDoha = hanumanChalisa.length - 1;
    if (isPlaying && previous === closingDoha && activeVerse === -1 && position === closingDoha) {
      varshaRef.current?.shower(120, true);
    }
  }, [activeVerse, position, isPlaying]);

  // Opening the lyrics: bring the hero into view and jump to the current verse.
  useEffect(() => {
    if (!lyricsOpen) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (highlighted >= 0) scrollToVerse(highlighted, true);
    // Only when the mode changes, not on every verse change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lyricsOpen]);

  // Any "/#lyrics" link on this page (header, footer) opens the lyrics layer in place.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href="/#lyrics"], a[href="#lyrics"]');
      if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      event.preventDefault();
      event.stopPropagation();
      setMode("lyrics");
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [setMode]);

  // Keyboard shortcuts: Space / K to play-pause, arrows to skip 5 seconds, Esc closes the lyrics.
  const { togglePlayback, seek, currentTime, play } = player;
  const timeRef = useRef(currentTime);
  useEffect(() => { timeRef.current = currentTime; }, [currentTime]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      // Escape closes the lyrics, unless the header menu is open (it handles Escape itself).
      if (event.key === "Escape") { if (!document.documentElement.dataset.menuOpen) setMode("audio"); return; }
      if (event.altKey || event.ctrlKey || event.metaKey || isInteractive(event.target)) return;
      if (event.key === " " || event.key.toLowerCase() === "k") { event.preventDefault(); togglePlayback(); }
      else if (event.key === "ArrowRight") seek(timeRef.current + 5);
      else if (event.key === "ArrowLeft") seek(timeRef.current - 5);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [togglePlayback, seek, setMode]);

  const goToVerse = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(hanumanChalisa.length - 1, index));
    seek(timeline[clamped].start);
  }, [seek, timeline]);

  const previous = useCallback(() => {
    // Like most players: go to the start of the current verse first, then the previous one.
    if (position >= 0 && currentTime - timeline[position].start > 3) goToVerse(position);
    else goToVerse(position - 1);
  }, [position, currentTime, timeline, goToVerse]);
  const next = useCallback(() => goToVerse(position + 1), [position, goToVerse]);

  const playVerse = useCallback((index: number) => {
    goToVerse(index);
    if (!player.playing) void play();
  }, [goToVerse, player.playing, play]);

  // During intro music or a music break, show what's coming next.
  const upcoming = Math.min(position + 1, hanumanChalisa.length - 1);
  const status = player.buffering
    ? "Loading…"
    : highlighted >= 0
      ? hanumanChalisa[highlighted].label
      : !started
        ? "Tap play to begin"
        : position >= hanumanChalisa.length - 1
          ? "♪ Music · जय श्री राम"
          : `♪ Music · next: ${hanumanChalisa[upcoming].label}`;

  return (
    <>
      <section className={`hero mode-${mode}`} aria-labelledby="hero-title">
        <audio ref={audioRef} src="/audio/hanuman-chalisa.mp3" preload="metadata" />
        <div className="hero-rays" aria-hidden="true" />
        <Mandala className="hero-mandala" />

        <div className="mode-switch" role="group" aria-label="Choose how to follow the Chalisa">
          {MODES.map(({ value, label, Icon }) => (
            <button key={value} type="button" aria-pressed={mode === value} onClick={() => setMode(value)}>
              <Icon size={16} /> {label}
            </button>
          ))}
          <span className="mode-thumb" aria-hidden="true" />
        </div>

        <div className="hero-stage">
          <div className="shell hero-inner" inert={lyricsOpen}>
            <div className="hero-content">
              <p className="hero-mantra" lang="hi">॥ ॐ श्री हनुमते नमः ॥</p>
              <h1 id="hero-title" lang="hi">श्री हनुमान चालीसा</h1>
              <blockquote className="hero-verse" lang="hi">
                संकट कटै मिटै सब पीरा । जो सुमिरै हनुमत बलबीरा ॥
              </blockquote>
              <p className="hero-sub">
                Whoever remembers the mighty Hanuman, every hardship is cut away and all pain fades.
                Sit with a quiet heart, listen to His glory, and let each verse become your prayer.
              </p>
              <ul className="hero-facts" aria-label="About the hymn">
                <li><strong>40</strong><span>Verses of praise</span></li>
                <li><strong>3</strong><span>Sacred dohas</span></li>
                <li><strong lang="hi">तुलसीदास</strong><span>Offered by</span></li>
              </ul>
            </div>
            <HeroArt />
          </div>

          <LyricsPanel
            open={lyricsOpen}
            scrollerRef={scrollerRef}
            language={language}
            onLanguageChange={setLanguage}
            fontScale={fontScale}
            onFontScaleChange={setFontScale}
            follow={follow}
            onFollowChange={setFollow}
            activeVerse={highlighted}
            position={started ? position : -1}
            progress={progressPercent(player.currentTime, player.duration)}
            playing={player.playing}
            status={status}
            onTogglePlay={player.togglePlayback}
            onVerseSelect={playVerse}
            registerVerse={registerVerse}
          />
        </div>
      </section>

      <PushpaVarsha ref={varshaRef} />

      <PlayerBar
        visible={!lyricsOpen}
        player={player}
        activeVerse={highlighted}
        status={status}
        onPrevious={previous}
        onNext={next}
        paathCount={paathCount}
        onPaathAdd={() => setPaathCount(paathCount + 1)}
        onPaathReset={() => setPaathCount(0)}
      />
    </>
  );
}
