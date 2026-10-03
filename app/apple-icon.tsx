import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon for iPhone / iPad: the gada (mace) on maroon. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #8a2314, #3a0c09)" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: 16, height: 16, borderRadius: 999, background: "#f0a32a" }} />
          <div style={{ width: 70, height: 76, borderRadius: 999, background: "linear-gradient(135deg, #ffe08a, #f0a32a 55%, #b8560f)", marginTop: -4 }} />
          <div style={{ width: 14, height: 52, background: "#f8dc8f", borderRadius: 6, marginTop: -6 }} />
          <div style={{ width: 34, height: 12, background: "#f0a32a", borderRadius: 6 }} />
        </div>
      </div>
    ),
    size,
  );
}
