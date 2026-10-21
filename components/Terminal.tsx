"use client";

import { useEffect, useState } from "react";
import { event } from "@/data/event";

// Nov 7 2026 is after DST ends, so Champaign is on CST (UTC-6)
const START = Date.parse(`${event.date}T12:00:00-06:00`);
const END = Date.parse(`${event.date}T14:45:00-06:00`);

const pad = (n: number) => String(n).padStart(2, "0");

function status(now: number, builds: number) {
  if (now < START) {
    let s = Math.floor((START - now) / 1000);
    const d = Math.floor(s / 86400);
    s %= 86400;
    const h = Math.floor(s / 3600);
    s %= 3600;
    const m = Math.floor(s / 60);
    s %= 60;
    return `T-MINUS ${d}D ${pad(h)}H ${pad(m)}M ${pad(s)}S → BUILD DAY`;
  }
  if (now < END) return "● LIVE NOW ON THE CIF STEPS. GO BUILD.";
  return builds > 0 ? `SHIPPED. ${builds} BUILDS ON THE WALL.` : "SHIPPED. WALL LOADING…";
}

export function Terminal({ builds }: { builds: number }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="terminalLine">
      <div>
        <b>~/uiuc/learnathon</b>
        <span>$ ship imagination --to=internet</span>
      </div>
      <div>
        <b>status</b>
        <span suppressHydrationWarning>
          {now === null ? "T-MINUS --D --H --M --S → BUILD DAY" : status(now, builds)}
        </span>
        <em>▮</em>
      </div>
    </div>
  );
}
