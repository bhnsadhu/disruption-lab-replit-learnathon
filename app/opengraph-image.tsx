import { ImageResponse } from "next/og";
import { projects } from "@/lib/projects";

export const alt = "Built with Replit — Disruption Lab × Replit Learnathon at UIUC";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const count = projects.length;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#ff5f05",
          color: "#171512",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            background: "#ccff00",
            borderBottom: "6px solid #171512",
            padding: "14px 48px",
            fontSize: 24,
            fontWeight: 900,
            letterSpacing: 2,
          }}
        >
          BUILT TO LEARN // BUILT TO SHARE // BUILT WITH REPLIT // BUILT AT UIUC
        </div>
        <div style={{ display: "flex", flexDirection: "column", padding: "48px 64px", flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              background: "#171512",
              color: "#f3eddf",
              padding: "10px 18px",
              fontSize: 26,
              fontWeight: 900,
            }}
          >
            DISRUPTION LAB × REPLIT LEARNATHON
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 150,
              fontWeight: 900,
              lineHeight: 0.85,
              letterSpacing: -10,
              marginTop: 40,
            }}
          >
            <span>BUILT WITH</span>
            <span style={{ color: "#f3eddf", textShadow: "8px 8px 0 #171512" }}>REPLIT</span>
          </div>
          <div style={{ display: "flex", marginTop: "auto", fontSize: 32, fontWeight: 800 }}>
            {count > 0 ? `${count} live builds · UIUC · Nov 2026` : "Build day · Nov 7 2026 · CIF Steps, UIUC"}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
