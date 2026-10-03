"use client";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { buildTimeline, type MusicBreaks, type TimingMarks, type VerseMark } from "@/data/hanuman-chalisa";

/**
 * Works out which verse is being recited and, when `follow` is on, keeps it centred
 * inside the scrollable lyrics panel (without scrolling the page itself).
 *
 * - `activeVerse`: the verse being sung, or -1 during intro music and music breaks.
 * - `position`: the last verse that has started (used for previous / next).
 */
export function useLyricsSync(
  currentTime: number, duration: number, follow: boolean,
  marks?: TimingMarks | null, anchors?: Record<number, VerseMark>, breaks?: MusicBreaks,
) {
  const verseRefs = useRef<Record<number, HTMLElement | null>>({});
  const scrollerRef = useRef<HTMLDivElement>(null);
  const timeline = useMemo(() => buildTimeline(duration, marks, anchors, breaks), [duration, marks, anchors, breaks]);

  const { activeVerse, position } = useMemo(() => {
    let last = -1;
    for (let i = 0; i < timeline.length && timeline[i].start <= currentTime; i++) last = i;
    const singing = last >= 0 && currentTime < timeline[last].end;
    return { activeVerse: singing ? last : -1, position: last };
  }, [currentTime, timeline]);

  const scrollToVerse = useCallback((index: number, force = false) => {
    const scroller = scrollerRef.current;
    const target = verseRefs.current[index];
    if (!scroller || !target) return;
    const box = scroller.getBoundingClientRect();
    const rect = target.getBoundingClientRect();
    const margin = box.height * 0.2;
    if (!force && rect.top > box.top + margin && rect.bottom < box.bottom - margin) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scroller.scrollTo({
      top: scroller.scrollTop + rect.top - box.top - (box.height - rect.height) / 2,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, []);

  // Follow the recitation; during a music break, bring the upcoming verse into view.
  const followTarget = activeVerse >= 0 ? activeVerse : Math.min(position + 1, timeline.length - 1);
  useEffect(() => {
    if (follow && position >= 0) scrollToVerse(followTarget);
  }, [followTarget, position, follow, scrollToVerse]);

  const registerVerse = useCallback((id: number, node: HTMLElement | null) => { verseRefs.current[id] = node; }, []);
  return { activeVerse, position, timeline, registerVerse, scrollerRef, scrollToVerse };
}
