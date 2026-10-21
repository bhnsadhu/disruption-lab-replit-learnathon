import type { Prize } from "@/lib/types";

export const event = {
  name: "Disruption Lab × Replit Learnathon",
  shortName: "UIUC Learnathon",
  host: "Disruption Lab @ UIUC",
  school: "UIUC",
  date: "2026-11-07",
  dateLabel: "Saturday, Nov 7, 2026",
  dateShort: "NOV 2026",
  dateStamp: "11.07",
  time: "12:00 – 2:45 PM",
  location: "CIF Monumental Steps",
  locationDetail: "Campus Instructional Facility, UIUC",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Campus+Instructional+Facility+University+of+Illinois+Urbana-Champaign",
  replitUrl: "https://replit.com",
  /** Drop a logo at public/brand/disruption-lab.png (or .svg) and set the path here. */
  disruptionLabLogo: null as string | null,
  /** Fill in once prizes are announced, in display order (Grand Prize first). */
  prizes: [] as Prize[],
};
