"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export function useAudioPlayer(onComplete?: () => void) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const completeRef = useRef(onComplete);
  const [playing, setPlaying] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { completeRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    let lastTime = 0;
    const onTime = () => {
      // When looping, "ended" never fires - detect the jump from the end back to the start.
      if (audio.loop && lastTime > audio.duration - 1.5 && audio.currentTime < 1.5) completeRef.current?.();
      lastTime = audio.currentTime;
      setCurrentTime(audio.currentTime);
    };
    const onDuration = () => { if (Number.isFinite(audio.duration)) setDuration(audio.duration); };
    const onPlay = () => { setPlaying(true); setError(""); };
    const onPause = () => setPlaying(false);
    const onWaiting = () => setBuffering(true);
    const onReady = () => setBuffering(false);
    const onEnded = () => { setPlaying(false); completeRef.current?.(); };
    const onError = () => { setPlaying(false); setBuffering(false); setError("Audio could not be loaded. Please check your connection and try again."); };
    // Metadata may already be loaded before this effect runs (cached audio).
    if (audio.readyState >= 1) onDuration();
    const events: [string, () => void][] = [
      ["timeupdate", onTime], ["loadedmetadata", onDuration], ["durationchange", onDuration],
      ["play", onPlay], ["pause", onPause], ["ended", onEnded], ["error", onError],
      ["waiting", onWaiting], ["playing", onReady], ["canplay", onReady],
    ];
    events.forEach(([name, handler]) => audio.addEventListener(name, handler));
    return () => events.forEach(([name, handler]) => audio.removeEventListener(name, handler));
  }, []);

  useEffect(() => { if (audioRef.current) audioRef.current.volume = volume; }, [volume]);
  useEffect(() => { if (audioRef.current) audioRef.current.playbackRate = speed; }, [speed]);
  useEffect(() => { if (audioRef.current) audioRef.current.muted = isMuted; }, [isMuted]);
  useEffect(() => { if (audioRef.current) audioRef.current.loop = loop; }, [loop]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    setError("");
    try { await audio.play(); } catch (err) {
      if ((err as DOMException)?.name !== "AbortError") setError("Playback is unavailable right now. Please try again in a moment.");
    }
  }, []);

  const togglePlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void play(); else audio.pause();
  }, [play]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const max = Number.isFinite(audio.duration) ? audio.duration : time;
    audio.currentTime = Math.max(0, Math.min(time, max));
    setCurrentTime(audio.currentTime);
  }, []);

  const setVolume = useCallback((next: number) => {
    setVolumeState(next);
    setIsMuted(next === 0);
  }, []);
  const toggleMute = useCallback(() => setIsMuted((muted) => !muted), []);
  const toggleLoop = useCallback(() => setLoop((value) => !value), []);
  const restart = useCallback(() => { seek(0); void play(); }, [seek, play]);

  return {
    audioRef, playing, buffering, currentTime, duration, volume, setVolume, isMuted, toggleMute,
    speed, setSpeed, loop, toggleLoop, error, play, togglePlayback, seek, restart,
  };
}
