import type { TimingMarks, VerseMark } from "./hanuman-chalisa";

/**
 * Known points in /audio/hanuman-chalisa.mp3 (seconds), found by analysing the recording's
 * pitch and loudness. Verses between anchors are spread out by their length, so every
 * anchor added here makes the highlighting more accurate. `end` marks where singing stops
 * before a music break. Keys are verse indexes: 0-1 opening dohas, 2-41 chaupais 1-40,
 * 42 closing doha.
 *
 *  0.0 -  4.0  bell / intro
 *  4.1 - 25.3  Opening Doha 1 (solo, four slow phrases)
 * 26.0 - 51.8  Opening Doha 2
 * 51.8 - 57.5  music break
 * 57.6         Chaupai 1 - chorus and rhythm begin. From here the chaupais keep a steady
 *              beat: 10.45 s each (two 5.2 s lines), with 5.3 s of music after every
 *              4th one (see MUSIC_AFTER_CHAUPAI). 57.6 + 40 x 10.45 + 10 x 5.3 = 528.6,
 *              exactly where the closing doha was found to start.
 * 528.6- 564.5 Closing Doha
 * 564.5- end   closing music
 */
export const VERSE_ANCHORS: Record<number, VerseMark> = {
  0: { start: 4.1, end: 25.3 },
  1: { start: 26.0, end: 51.8 },
  2: { start: 57.6 },
  42: { start: 528.6, end: 564.5 },
};

/**
 * Music breaks inside the chaupais: chaupai number -> seconds of music after it.
 * In this recording there is a 5.3 s interlude after Chaupai 2, then after every 4 chaupais
 * (6, 10, 14 ... 38) - measured from the recording's 47.1 s repeating cycle
 * (4 chaupais x 10.45 s + 5.3 s). During a break nothing is highlighted and the player
 * shows "♪ Music · next: …".
 */
export const MUSIC_AFTER_CHAUPAI: Record<number, number> = Object.fromEntries(
  [2, 6, 10, 14, 18, 22, 26, 30, 34, 38].map((chaupai) => [chaupai, 5.3]),
);

/**
 * Exact timings for every verse, recorded at /sync (one entry per verse, 43 in all).
 * When set, these replace the anchors and breaks above. Leave as null to use them.
 */
export const VERSE_TIMINGS: TimingMarks | null = null;
