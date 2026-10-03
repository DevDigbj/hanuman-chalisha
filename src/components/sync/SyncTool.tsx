"use client";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import { useStoredValue } from "@/hooks/use-local-storage";
import { useVerseTimings } from "@/hooks/use-verse-timings";
import { hanumanChalisa, isCompleteTimings, type TimingMarks } from "@/data/hanuman-chalisa";
import { PauseIcon, PlayIcon, RestartIcon } from "@/components/ui/Icons";
import { formatTime, progressPercent } from "@/components/player/shared";

// People tap slightly after they hear a verse begin; pull each mark back by this much.
const TAP_DELAY = 0.3;
const DRAFT_KEY = "chalisa-sync-draft";
const round = (n: number) => Math.max(0, Math.round(n * 10) / 10);
const formatPrecise = (t: number) => `${Math.floor(t / 60)}:${(t % 60).toFixed(1).padStart(4, "0")}`;

const parseDraft = (raw: string): TimingMarks | undefined => {
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value) ? (value as TimingMarks) : undefined;
  } catch {
    return undefined;
  }
};

const toCode = (marks: TimingMarks) =>
  `export const VERSE_TIMINGS: TimingMarks | null = [\n${marks
    .map((m, i) => `  { start: ${m.start}${m.end !== undefined ? `, end: ${m.end}` : ""} }, // ${hanumanChalisa[i].label}`)
    .join("\n")}\n];`;

export default function SyncTool() {
  const { audioRef, ...player } = useAudioPlayer();
  const { source, saveDeviceMarks } = useVerseTimings();
  const [draftRaw, setDraftRaw] = useStoredValue<string>(DRAFT_KEY, "[]", (raw) => raw);
  const marks = useMemo(() => parseDraft(draftRaw) ?? [], [draftRaw]);
  const setMarks = useCallback((next: TimingMarks) => setDraftRaw(JSON.stringify(next)), [setDraftRaw]);
  const [copied, setCopied] = useState(false);

  const nextIndex = marks.length;
  const complete = isCompleteTimings(marks);
  const last = marks[marks.length - 1];
  const nextVerse = hanumanChalisa[Math.min(nextIndex, hanumanChalisa.length - 1)];

  const timeRef = useRef(player.currentTime);
  useEffect(() => { timeRef.current = player.currentTime; }, [player.currentTime]);

  const markStart = useCallback(() => {
    if (nextIndex >= hanumanChalisa.length) return;
    setMarks([...marks, { start: round(timeRef.current - TAP_DELAY) }]);
  }, [marks, nextIndex, setMarks]);

  const markBreak = useCallback(() => {
    if (!last || last.end !== undefined) return;
    setMarks([...marks.slice(0, -1), { ...last, end: round(timeRef.current - TAP_DELAY) }]);
  }, [last, marks, setMarks]);

  const undo = useCallback(() => {
    if (!last) return;
    if (last.end !== undefined) setMarks([...marks.slice(0, -1), { start: last.start }]);
    else setMarks(marks.slice(0, -1));
  }, [last, marks, setMarks]);

  const nudge = (index: number, delta: number) =>
    setMarks(marks.map((m, i) => (i === index ? { ...m, start: round(m.start + delta) } : m)));

  // Keyboard: Space play/pause, Enter = verse starts, B = music break, Backspace = undo, arrows = ±5 s.
  const { togglePlayback, seek } = player;
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const typing = event.target instanceof Element && event.target.closest("input, textarea, select");
      if (event.altKey || event.ctrlKey || event.metaKey || typing) return;
      const key = event.key.toLowerCase();
      if (key === " ") { event.preventDefault(); togglePlayback(); }
      else if (key === "enter") { event.preventDefault(); markStart(); }
      else if (key === "b") markBreak();
      else if (key === "backspace") { event.preventDefault(); undo(); }
      else if (key === "arrowleft") seek(timeRef.current - 5);
      else if (key === "arrowright") seek(timeRef.current + 5);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [togglePlayback, seek, markStart, markBreak, undo]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(toCode(marks));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="section sync">
      <div className="shell sync-grid">
        <audio ref={audioRef} src="/audio/hanuman-chalisa.mp3" preload="metadata" />

        <div className="sync-card">
          <ol className="sync-steps">
            <li>Press play and listen.</li>
            <li>Tap <strong>Verse starts</strong> the moment each verse begins.</li>
            <li>If music plays before the next verse, tap <strong>Music break</strong> when the singing stops.</li>
            <li>After all {hanumanChalisa.length} verses, preview it on the home page and copy the result into <code>src/data/verse-timings.ts</code>.</li>
          </ol>

          <div className="sync-player">
            <button type="button" className="pb-play" aria-label={player.playing ? "Pause" : "Play"} onClick={player.togglePlayback}>
              {player.playing ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
            </button>
            <button type="button" className="sync-small" onClick={() => seek(timeRef.current - 5)}>−5s</button>
            <input
              className="range" type="range" aria-label="Audio position" min={0} max={player.duration || 1} step={0.1}
              value={Math.min(player.currentTime, player.duration || 1)}
              style={{ "--fill": `${progressPercent(player.currentTime, player.duration)}%` } as CSSProperties}
              onChange={(event) => seek(Number(event.target.value))}
            />
            <span className="sync-time">{formatTime(player.currentTime)} / {formatTime(player.duration)}</span>
            <button type="button" className="sync-small" aria-label="Back to start" onClick={() => seek(0)}><RestartIcon size={14} /></button>
          </div>

          <div className="sync-next" aria-live="polite">
            {complete ? (
              <p className="sync-done">All {hanumanChalisa.length} verses are marked. 🙏</p>
            ) : (
              <>
                <span className="sync-next-label">Next: {nextVerse.label} ({nextIndex + 1} of {hanumanChalisa.length})</span>
                <span className="sync-next-text" lang="hi">{nextVerse.hindi[0]}<br />{nextVerse.hindi[1]}</span>
              </>
            )}
          </div>

          <div className="sync-actions">
            <button type="button" className="sync-primary" onClick={markStart} disabled={complete}>Verse starts <kbd>Enter</kbd></button>
            <button type="button" className="sync-secondary" onClick={markBreak} disabled={!last || last.end !== undefined}>Music break <kbd>B</kbd></button>
            <button type="button" className="sync-secondary" onClick={undo} disabled={!last}>Undo <kbd>⌫</kbd></button>
          </div>

          <div className="sync-progress" style={{ "--fill": `${(nextIndex / hanumanChalisa.length) * 100}%` } as CSSProperties}>
            <span>{nextIndex} / {hanumanChalisa.length} verses marked</span>
          </div>

          {complete && (
            <div className="sync-finish">
              <div className="sync-actions">
                <button type="button" className="sync-primary" onClick={() => saveDeviceMarks(marks)}>Use on this device</button>
                <button type="button" className="sync-secondary" onClick={copyCode}>{copied ? "Copied ✓" : "Copy for verse-timings.ts"}</button>
              </div>
              <textarea className="sync-code" readOnly value={toCode(marks)} aria-label="Timings code" rows={6} />
            </div>
          )}

          <p className="sync-source">
            Home page is using: <strong>{source === "device" ? "timings saved on this device" : source === "published" ? "published timings" : "analysed anchor timings"}</strong>
            {source === "device" && <> · <button type="button" className="link-btn" onClick={() => saveDeviceMarks(null)}>Clear device timings</button></>}
            {" · "}<Link href="/#lyrics">Open lyrics</Link>
          </p>
          {marks.length > 0 && <button type="button" className="link-btn danger" onClick={() => setMarks([])}>Start over</button>}
        </div>

        <ol className="sync-list" aria-label="Marked verses">
          {hanumanChalisa.map((verse, i) => {
            const mark = marks[i];
            return (
              <li key={verse.id} className={mark ? "marked" : i === nextIndex ? "current" : ""}>
                <span className="sync-list-label">{verse.label}</span>
                {mark ? (
                  <span className="sync-list-time">
                    <button type="button" aria-label={`Play ${verse.label}`} onClick={() => { seek(mark.start); if (!player.playing) void player.play(); }}>{formatPrecise(mark.start)}</button>
                    {mark.end !== undefined && <small>♪ {formatPrecise(mark.end)}</small>}
                    <button type="button" aria-label="Earlier by half a second" onClick={() => nudge(i, -0.5)}>−½</button>
                    <button type="button" aria-label="Later by half a second" onClick={() => nudge(i, 0.5)}>+½</button>
                  </span>
                ) : <span className="sync-list-time muted">-</span>}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
