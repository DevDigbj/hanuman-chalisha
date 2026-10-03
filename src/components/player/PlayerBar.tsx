"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { hanumanChalisa } from "@/data/hanuman-chalisa";
import { MoreIcon, MuteIcon, NextIcon, PauseIcon, PlayIcon, PrevIcon, RepeatIcon, VolumeIcon } from "@/components/ui/Icons";
import { formatTime, progressPercent, type Player } from "./shared";

interface PlayerBarProps {
  visible: boolean;
  player: Player;
  activeVerse: number;
  status: string;
  onPrevious: () => void;
  onNext: () => void;
  paathCount: number;
  onPaathAdd: () => void;
  onPaathReset: () => void;
}

const SPEEDS = [0.75, 1, 1.25, 1.5];

/** Slim audio player pinned just above the phone's browser toolbar. */
export default function PlayerBar({ visible, player, activeVerse, status, onPrevious, onNext, paathCount, onPaathAdd, onPaathReset }: PlayerBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const verse = activeVerse >= 0 ? hanumanChalisa[activeVerse] : null;
  const percent = progressPercent(player.currentTime, player.duration);

  // Close the options pop-over on outside click or Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (event: PointerEvent) => { if (!barRef.current?.contains(event.target as Node)) setMenuOpen(false); };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onPointer); document.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  return (
    <div
      ref={barRef}
      className={`player-bar${visible ? " visible" : ""}${player.playing ? " is-playing" : ""}`}
      role="region" aria-label="Audio player" aria-hidden={!visible} inert={!visible}
    >
      <input
        className="pb-seek"
        aria-label="Audio position"
        aria-valuetext={`${formatTime(player.currentTime)} of ${formatTime(player.duration)}`}
        type="range" min={0} max={player.duration || 1} step={0.1}
        value={Math.min(player.currentTime, player.duration || 1)}
        style={{ "--fill": `${percent}%` } as CSSProperties}
        onChange={(event) => player.seek(Number(event.target.value))}
      />

      <div className="pb-row">
        <button type="button" className="pb-play" aria-label={player.playing ? "Pause" : "Play"} onClick={player.togglePlayback}>
          {player.playing ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
        </button>
        <div className="pb-meta">
          <span className="pb-status" aria-live="polite">
            {status}<span className="pb-time"> · {formatTime(player.currentTime)} / {formatTime(player.duration)}</span>
          </span>
          <span className="pb-line" lang="hi">{verse ? verse.hindi[0] : "श्री हनुमान चालीसा"}</span>
        </div>
        <button type="button" className="pb-btn hide-xs" aria-label="Previous verse" onClick={onPrevious}><PrevIcon size={16} /></button>
        <button type="button" className="pb-btn" aria-label="Next verse" onClick={onNext}><NextIcon size={16} /></button>
        <button type="button" className="pb-btn" aria-label="More options" aria-expanded={menuOpen} aria-controls="pb-menu" onClick={() => setMenuOpen((v) => !v)}><MoreIcon size={16} /></button>
      </div>

      {player.error && <p className="pb-error" role="alert">{player.error}</p>}

      <div id="pb-menu" className={`pb-menu${menuOpen ? " open" : ""}`} inert={!menuOpen} role="group" aria-label="Player options">
        <div className="pb-menu-row">
          <span className="pb-menu-label">Speed</span>
          <div className="speed" role="group" aria-label="Playback speed">
            {SPEEDS.map((speed) => (
              <button key={speed} type="button" aria-pressed={player.speed === speed} onClick={() => player.setSpeed(speed)}>{speed}×</button>
            ))}
          </div>
        </div>
        <div className="pb-menu-row">
          <button type="button" className="pb-btn" aria-label={player.isMuted ? "Unmute" : "Mute"} onClick={player.toggleMute}>
            {player.isMuted || player.volume === 0 ? <MuteIcon size={16} /> : <VolumeIcon size={16} />}
          </button>
          <input
            className="range"
            aria-label="Volume" type="range" min={0} max={1} step={0.05}
            value={player.isMuted ? 0 : player.volume}
            style={{ "--fill": `${(player.isMuted ? 0 : player.volume) * 100}%` } as CSSProperties}
            onChange={(event) => player.setVolume(Number(event.target.value))}
          />
        </div>
        <div className="pb-menu-row">
          <button type="button" className="chip-toggle" aria-pressed={player.loop} onClick={player.toggleLoop}><RepeatIcon size={14} /> Repeat</button>
          <div className="paath" title="Recitations completed on this device">
            <span lang="hi">पाठ</span>
            <output aria-live="polite">{paathCount}</output>
            <button type="button" className="chip" onClick={onPaathAdd} aria-label="Add one recitation">+1</button>
            {paathCount > 0 && <button type="button" className="chip ghost" onClick={onPaathReset} aria-label="Reset recitation count">↺</button>}
          </div>
        </div>
      </div>
    </div>
  );
}
