import { ImageResponse } from "next/og";

export const alt = "Shri Hanuman Chalisa - read and listen in Hindi & Hinglish";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          background: "radial-gradient(circle at 50% 40%, #f59e0b 0%, #b3261e 38%, #5c1410 70%, #3a0c09 100%)",
          color: "#fff6d6", fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", width: 150, height: 150, borderRadius: 999, border: "4px solid #f8dc8f", alignItems: "center", justifyContent: "center", marginBottom: 36 }}>
          <div style={{ display: "flex", width: 96, height: 96, borderRadius: 999, background: "linear-gradient(135deg, #ffe08a, #f0a32a, #b8560f)" }} />
        </div>
        <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: 2 }}>Shri Hanuman Chalisa</div>
        <div style={{ fontSize: 36, color: "#f8dc8f", marginTop: 18 }}>Read & listen in Hindi and Hinglish</div>
        <div style={{ fontSize: 28, color: "#ecd1b5", marginTop: 34, letterSpacing: 8 }}>JAI SHRI RAM</div>
      </div>
    ),
    size,
  );
}
