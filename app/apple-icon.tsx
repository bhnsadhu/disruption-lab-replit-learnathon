import { ImageResponse } from "next/og";

// Illinois block I. iOS uses this for link previews in Messages and home-screen shortcuts (it ignores SVG favicons)
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#13294b", // Illini blue
        }}
      >
        <svg width="112" height="112" viewBox="0 0 24 24" fill="#ff5f05">
          <path d="M3 1h18v5h-3v2h-2v8h2v2h3v5H3v-5h3v-2h2V8H6V6H3z" />
        </svg>
      </div>
    ),
    size,
  );
}
