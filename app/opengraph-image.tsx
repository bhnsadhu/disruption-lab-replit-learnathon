import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { event } from "@/data/event";
import { projects } from "@/lib/projects";

export const alt = `Built with Replit — Disruption Lab × Replit Learnathon at ${event.school}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FONTS = path.join(process.cwd(), "node_modules/geist/dist/fonts");

export default async function OgImage() {
  const count = projects.length;
  const [black, mono] = await Promise.all([
    readFile(path.join(FONTS, "geist-sans/Geist-Black.ttf")),
    readFile(path.join(FONTS, "geist-mono/GeistMono-Bold.ttf")),
  ]);

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
          fontFamily: "Geist",
        }}
      >
        <div
          style={{
            display: "flex",
            background: "#ccff00",
            borderBottom: "6px solid #171512",
            padding: "14px 48px",
            fontFamily: "Geist Mono",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          BUILT TO LEARN // BUILT TO SHARE // BUILT WITH REPLIT
        </div>
        <div style={{ display: "flex", flexDirection: "column", padding: "48px 64px", flex: 1 }}>
          <div style={{ display: "flex", gap: 16 }}>
            <div
              style={{
                display: "flex",
                background: "#171512",
                color: "#f3eddf",
                padding: "10px 18px",
                fontFamily: "Geist Mono",
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              DISRUPTION LAB × REPLIT LEARNATHON
            </div>
            {count === 0 && (
              <div
                style={{
                  display: "flex",
                  background: "#ccff00",
                  color: "#171512",
                  border: "3px solid #171512",
                  padding: "7px 16px",
                  fontFamily: "Geist Mono",
                  fontSize: 26,
                  fontWeight: 700,
                }}
              >
                FREE · NO EXPERIENCE NEEDED
              </div>
            )}
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
            {count > 0
              ? `${count} live builds · ${event.school} · Nov 2026`
              : `Build day · Nov 7 2026 · CIF Monumental Steps, ${event.school}`}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: black, weight: 900, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 700, style: "normal" },
      ],
    },
  );
}
