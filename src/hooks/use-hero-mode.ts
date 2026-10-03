"use client";
import { useSyncExternalStore } from "react";

export type HeroMode = "audio" | "lyrics";

const MODE_EVENT = "chalisa:mode";

// The mode lives in the URL hash (/#lyrics) so it can be linked to from other pages
// and the phone's back button closes the lyrics view.
const subscribe = (listener: () => void) => {
  window.addEventListener("hashchange", listener);
  window.addEventListener("popstate", listener);
  window.addEventListener(MODE_EVENT, listener);
  return () => {
    window.removeEventListener(MODE_EVENT, listener);
    window.removeEventListener("hashchange", listener);
    window.removeEventListener("popstate", listener);
  };
};
const getMode = (): HeroMode => (window.location.hash === "#lyrics" ? "lyrics" : "audio");

export function setHeroMode(next: HeroMode) {
  if (getMode() === next) return;
  if (next === "lyrics") {
    window.history.pushState({ ...window.history.state, chalisaLyrics: true }, "", "#lyrics");
  } else if (window.history.state?.chalisaLyrics) {
    window.history.back(); // undo our own entry; fires popstate
    return;
  } else {
    window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
  }
  // A private event rather than a synthetic popstate, which Next's router would act on.
  window.dispatchEvent(new Event(MODE_EVENT));
}

export function useHeroMode() {
  const mode = useSyncExternalStore(subscribe, getMode, () => "audio" as HeroMode);
  return [mode, setHeroMode] as const;
}
