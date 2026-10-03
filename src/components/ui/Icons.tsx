import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const Svg = ({ size = 20, children, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
    {children}
  </svg>
);

export const PlayIcon = (p: IconProps) => <Svg {...p}><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" fill="currentColor" stroke="none" /></Svg>;
export const PauseIcon = (p: IconProps) => <Svg {...p}><rect x="6" y="4" width="4" height="16" rx="1.2" fill="currentColor" stroke="none" /><rect x="14" y="4" width="4" height="16" rx="1.2" fill="currentColor" stroke="none" /></Svg>;
export const PrevIcon = (p: IconProps) => <Svg {...p}><path d="M19 20 9 12l10-8v16Z" fill="currentColor" /><path d="M5 19V5" /></Svg>;
export const NextIcon = (p: IconProps) => <Svg {...p}><path d="m5 4 10 8-10 8V4Z" fill="currentColor" /><path d="M19 5v14" /></Svg>;
export const RestartIcon = (p: IconProps) => <Svg {...p}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></Svg>;
export const RepeatIcon = (p: IconProps) => <Svg {...p}><path d="m17 2 4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" /><path d="m7 22-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" /></Svg>;
export const VolumeIcon = (p: IconProps) => <Svg {...p}><path d="M11 5 6 9H2v6h4l5 4V5Z" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></Svg>;
export const MuteIcon = (p: IconProps) => <Svg {...p}><path d="M11 5 6 9H2v6h4l5 4V5Z" /><path d="m22 9-6 6" /><path d="m16 9 6 6" /></Svg>;
export const ArrowDownIcon = (p: IconProps) => <Svg {...p}><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></Svg>;
export const MoreIcon = (p: IconProps) => <Svg {...p}><circle cx="5" cy="12" r="1.6" fill="currentColor" /><circle cx="12" cy="12" r="1.6" fill="currentColor" /><circle cx="19" cy="12" r="1.6" fill="currentColor" /></Svg>;
export const MenuIcon = (p: IconProps) => <Svg {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Svg>;
export const CloseIcon = (p: IconProps) => <Svg {...p}><path d="M18 6 6 18M6 6l12 12" /></Svg>;
export const HeadphonesIcon = (p: IconProps) => <Svg {...p}><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" /></Svg>;
export const BookIcon = (p: IconProps) => <Svg {...p}><path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2Z" /><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7Z" /></Svg>;
export const ChevronIcon =(p: IconProps) => <Svg {...p}><path d="m6 9 6 6 6-6" /></Svg>;

/** Hanuman ji's gada (mace) - used as the brand mark. */
export const GadaIcon = ({ size = 28, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false" {...props}>
    <rect x="14.6" y="17" width="2.8" height="12" rx="1.2" fill="#8a3b12" />
    <rect x="13.4" y="27.5" width="5.2" height="2.5" rx="1.2" fill="url(#gada-gold)" />
    <ellipse cx="16" cy="11" rx="8" ry="8.6" fill="url(#gada-gold)" />
    <path d="M8.4 11h15.2M16 2.6v16.8M10.4 5.2l11.2 11.6M21.6 5.2 10.4 16.8" stroke="#b8560f" strokeWidth=".9" opacity=".55" />
    <circle cx="16" cy="2.4" r="1.6" fill="url(#gada-gold)" />
  </svg>
);

/** Concentric lotus mandala, drawn with currentColor. */
export function Mandala({ className }: { className?: string }) {
  const ring = (count: number, radius: number, width: number, height: number, key: string) =>
    Array.from({ length: count }, (_, i) => (
      <path key={`${key}${i}`} transform={`rotate(${(i * 360) / count}) translate(0 ${-radius})`}
        d={`M0 0C${width} ${-height * 0.35} ${width * 0.55} ${-height} 0 ${-height}C${-width * 0.55} ${-height} ${-width} ${-height * 0.35} 0 0Z`} />
    ));
  return (
    <svg className={className} viewBox="-200 -200 400 400" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true" focusable="false">
      <circle r="30" /><circle r="38" strokeDasharray="2 5" />
      {ring(8, 38, 16, 42, "a")}
      <circle r="82" />
      {ring(16, 82, 13, 42, "b")}
      {ring(16, 82, 7, 26, "c")}
      <circle r="126" /><circle r="132" strokeDasharray="1 6" />
      {ring(32, 132, 9, 30, "d")}
      <circle r="164" />
      {Array.from({ length: 48 }, (_, i) => <circle key={`e${i}`} r="2.6" transform={`rotate(${i * 7.5}) translate(0 -178)`} fill="currentColor" stroke="none" />)}
      <circle r="192" strokeDasharray="3 4" />
    </svg>
  );
}

/** A lit diya (oil lamp) with a flickering flame. */
export function Diya({ className }: { className?: string }) {
  return (
    <svg className={`diya ${className ?? ""}`} viewBox="0 0 64 56" aria-hidden="true" focusable="false">
      <circle className="diya-glow" cx="32" cy="20" r="20" fill="url(#diya-glow)" />
      <path className="diya-flame" d="M32 4c5 7 7 12 4.6 17.4A5 5 0 0 1 32 24.5a5 5 0 0 1-4.6-3.1C25 16 27 11 32 4Z" fill="url(#diya-flame)" />
      <path d="M6 30c6 0 14 2 26 2s20-2 26-2c-2 12-12 20-26 20S8 42 6 30Z" fill="url(#diya-bowl)" />
      <path d="M10 32c7 1.2 14 1.8 22 1.8S47 33.2 54 32" stroke="#ffd58a" strokeWidth="1.4" fill="none" opacity=".8" />
      <circle cx="20" cy="41" r="1.6" fill="#ffd58a" /><circle cx="32" cy="44" r="1.6" fill="#ffd58a" /><circle cx="44" cy="41" r="1.6" fill="#ffd58a" />
    </svg>
  );
}

/** Ornamental lotus divider used under section headings. */
export function LotusDivider({ className }: { className?: string }) {
  return (
    <div className={`lotus-divider ${className ?? ""}`} aria-hidden="true">
      <span />
      <svg viewBox="0 0 40 24" width="40" height="24" focusable="false">
        <path d="M20 22C12 20 6 14 4 8c7 1 13 6 16 14Z" fill="currentColor" opacity=".55" />
        <path d="M20 22c8-2 14-8 16-14-7 1-13 6-16 14Z" fill="currentColor" opacity=".55" />
        <path d="M20 1.5c5 6 5 14 0 20.5-5-6.5-5-14.5 0-20.5Z" fill="currentColor" />
      </svg>
      <span />
    </div>
  );
}

/** Shared gradients for the brand mark and diya - rendered once in the layout. */
export function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
      <linearGradient id="gada-gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ffe08a" /><stop offset=".55" stopColor="#f0a32a" /><stop offset="1" stopColor="#b8560f" />
      </linearGradient>
        <radialGradient id="diya-glow"><stop offset="0" stopColor="#ffd36b" stopOpacity=".75" /><stop offset="1" stopColor="#ffb02e" stopOpacity="0" /></radialGradient>
        <linearGradient id="diya-flame" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#ff6a00" /><stop offset=".6" stopColor="#ffc53d" /><stop offset="1" stopColor="#fff4c2" /></linearGradient>
        <linearGradient id="diya-bowl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e9963a" /><stop offset="1" stopColor="#9c3d0e" /></linearGradient>
      </defs>
    </svg>
  );
}
