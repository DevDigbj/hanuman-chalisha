export type Language = "hindi" | "hinglish" | "both";
export type FontScale = "sm" | "md" | "lg";
export interface ChalisaVerse {
  id: number;
  kind: "doha" | "chaupai";
  number: number;
  hindi: [string, string];
  hinglish: [string, string];
  label: string;
}
