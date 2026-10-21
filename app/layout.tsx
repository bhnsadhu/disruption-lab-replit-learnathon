import type { Metadata } from "next";
import { event } from "@/data/event";
import { projects } from "@/lib/projects";
import "./globals.css";

const SITE = event.siteUrl;
const live = projects.length > 0;

// Before the event the link gets texted around to hype it; after, it shows off the builds.
const title = live
  ? `Built with Replit — ${projects.length} builds from the ${event.school} Learnathon`
  : `${event.name} · Nov 7 @ ${event.school}`;
const description = live
  ? `${projects.length} live apps built at the ${event.name} at ${event.school}. Click through and try them.`
  : `Free build day, no coding experience needed. Sat Nov 7, ${event.time} on the ${event.location}. Every app built lands on the wall.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: SITE,
    siteName: `${event.school} Learnathon`,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
