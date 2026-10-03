"use client";
import { useMemo } from "react";
import { isCompleteTimings, type MusicBreaks, type TimingMarks } from "@/data/hanuman-chalisa";
import { MUSIC_AFTER_CHAUPAI, VERSE_ANCHORS, VERSE_TIMINGS } from "@/data/verse-timings";
import { useStoredValue } from "./use-local-storage";

export const DEVICE_TIMINGS_KEY = "chalisa-timings";

const parseRaw = (raw: string) => raw;

// Chaupai n is verse index n + 1 (after the two opening dohas).
const MUSIC_BREAKS: MusicBreaks = Object.fromEntries(
  Object.entries(MUSIC_AFTER_CHAUPAI).map(([chaupai, seconds]) => [Number(chaupai) + 1, seconds]),
);

/**
 * Exact verse timings: ones recorded on this device at /sync take priority (so they can be
 * checked before publishing), then the published VERSE_TIMINGS. Otherwise the timeline is
 * built from the analysed VERSE_ANCHORS and MUSIC_AFTER_CHAUPAI breaks.
 */
export function useVerseTimings() {
  const [raw, setRaw] = useStoredValue<string>(DEVICE_TIMINGS_KEY, "", parseRaw);
  const deviceMarks = useMemo(() => {
    if (!raw) return null;
    try {
      const parsed: unknown = JSON.parse(raw);
      return isCompleteTimings(parsed as TimingMarks) ? (parsed as TimingMarks) : null;
    } catch {
      return null;
    }
  }, [raw]);

  const saveDeviceMarks = (marks: TimingMarks | null) => setRaw(marks ? JSON.stringify(marks) : "");
  const marks = deviceMarks ?? (isCompleteTimings(VERSE_TIMINGS) ? VERSE_TIMINGS : null);
  return { marks, anchors: VERSE_ANCHORS, breaks: MUSIC_BREAKS, source: deviceMarks ? "device" : marks ? "published" : "estimate", saveDeviceMarks } as const;
}
