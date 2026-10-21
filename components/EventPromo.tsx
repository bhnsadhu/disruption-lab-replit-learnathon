"use client";

import { useState } from "react";
import { event } from "@/data/event";
import { ReplitMark } from "./ReplitMark";

export function EventPromo() {
  const prizes = event.prizes;
  const [open, setOpen] = useState(false);

  return (
    <div className={open ? "eventPromo open" : "eventPromo"}>
      <button
        type="button"
        className="eventSticker"
        aria-label="Show event details"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {"{ build day: nov 7 }"}
      </button>
      <div className="eventPopover" role="dialog" aria-label={`${event.name} details`}>
        <div className="eventInfo">
          <span className="eventPill">LEARNATHON</span>
          <strong>{event.name}</strong>
          <dl className="eventFacts">
            <dt>DATE</dt>
            <dd>{event.dateLabel}</dd>
            <dt>TIME</dt>
            <dd>{event.time}</dd>
            <dt>WHERE</dt>
            <dd>
              {event.location}
              <small>{event.locationDetail}</small>
            </dd>
            <dt>PRIZES</dt>
            <dd>
              {prizes.length === 0
                ? "To be announced"
                : prizes.map((p) => (
                    <span key={p.name} style={{ display: "block" }}>
                      {p.name}
                      {p.reward ? ` — ${p.reward}` : ""}
                    </span>
                  ))}
            </dd>
          </dl>
          <span className="eventActions">
            <a href={event.mapsUrl} target="_blank" rel="noreferrer">
              GET DIRECTIONS ↗
            </a>
            <span>🏆 Winners get flagged right here on the wall.</span>
          </span>
        </div>
        <span className="eventArt" aria-hidden="true">
          <ReplitMark />
          <b>{event.dateStamp}</b>
          <small>BUILD DAY</small>
        </span>
      </div>
    </div>
  );
}
