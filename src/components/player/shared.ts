import type { useAudioPlayer } from "@/hooks/use-audio-player";

export type Player = Omit<ReturnType<typeof useAudioPlayer>, "audioRef">;

export const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const value = Math.floor(seconds);
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
};

export const progressPercent = (current: number, duration: number) =>
  duration > 0 ? Math.min(100, (current / duration) * 100) : 0;
