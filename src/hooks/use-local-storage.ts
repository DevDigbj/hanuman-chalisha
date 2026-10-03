"use client";
import { useCallback, useSyncExternalStore } from "react";

// Small localStorage-backed store. Falls back to memory when storage is unavailable
// (private mode, restricted iframes) so the choice still lasts for the visit.
const memory = new Map<string, string>();
const listeners = new Set<() => void>();

const read = (key: string): string | null => {
  try { return window.localStorage.getItem(key) ?? memory.get(key) ?? null; } catch { return memory.get(key) ?? null; }
};
const write = (key: string, value: string) => {
  memory.set(key, value);
  try { window.localStorage.setItem(key, value); } catch { /* memory fallback already set */ }
  listeners.forEach((listener) => listener());
};
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => { listeners.delete(listener); window.removeEventListener("storage", listener); };
};

export function useStoredValue<T>(key: string, fallback: T, parse: (raw: string) => T | undefined) {
  const raw = useSyncExternalStore(subscribe, () => read(key), () => null);
  const value = raw === null ? fallback : parse(raw) ?? fallback;
  const setValue = useCallback((next: T) => write(key, String(next)), [key]);
  return [value, setValue] as const;
}
