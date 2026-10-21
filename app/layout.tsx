import type { Metadata } from "next";
import { event } from "@/data/event";
import { projects } from "@/lib/projects";
import "./globals.css";

const title = `Built with Replit — ${event.school} Learnathon Wall`;
const description =
  projects.length > 0
    ? `${projects.length} live projects built at the Disruption Lab × Replit Learnathon at ${event.school}.`
    : `Every project built at the Disruption Lab × Replit Learnathon at ${event.school}, Nov 7 2026.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://learnathon.bhanusadhu.com"),
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
