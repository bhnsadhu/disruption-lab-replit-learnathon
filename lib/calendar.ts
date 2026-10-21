import { event } from "@/data/event";

const SITE = "https://learnathon.bhanusadhu.com";

/** "2026-11-07T12:00:00-06:00" → "20261107T180000Z" */
const utcStamp = (iso: string) =>
  new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

const title = event.name;
const location = `${event.location}, ${event.locationDetail}`;
const details = `Build something real with Replit, then get it on the wall. Event guide: ${SITE}`;

export const googleCalendarUrl =
  "https://calendar.google.com/calendar/render?" +
  new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${utcStamp(event.start)}/${utcStamp(event.end)}`,
    details,
    location,
  }).toString();

export const icsPath = "/learnathon.ics";

// RFC 5545 text escaping
const esc = (s: string) => s.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");

// RFC 5545: lines over 75 octets continue on the next line after a leading space
const enc = new TextEncoder();
function fold(line: string) {
  const out: string[] = [];
  let cur = "";
  for (const ch of line) {
    const limit = out.length ? 74 : 75;
    if (enc.encode(cur + ch).length > limit) {
      out.push(cur);
      cur = "";
    }
    cur += ch;
  }
  out.push(cur);
  return out.join("\r\n ");
}

export const icsFile = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//Disruption Lab//UIUC Learnathon//EN",
  "CALSCALE:GREGORIAN",
  "METHOD:PUBLISH",
  "BEGIN:VEVENT",
  `UID:learnathon-${event.date}@learnathon.bhanusadhu.com`,
  "DTSTAMP:20261021T000000Z",
  `DTSTART:${utcStamp(event.start)}`,
  `DTEND:${utcStamp(event.end)}`,
  `SUMMARY:${esc(title)}`,
  `LOCATION:${esc(location)}`,
  `DESCRIPTION:${esc(details)}`,
  `URL:${SITE}`,
  "END:VEVENT",
  "END:VCALENDAR",
  "",
]
  .map(fold)
  .join("\r\n");
