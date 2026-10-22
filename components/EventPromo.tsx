"use client";

import { useState } from "react";
import { event, signupForm } from "@/data/event";
import { googleCalendarUrl, icsPath } from "@/lib/calendar";
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
        <span>{"{ build day: nov 7 }"}</span>
        <small>
          <i aria-hidden="true">▾</i> {open ? "CLICK TO CLOSE" : "CLICK FOR DETAILS"}
        </small>
      </button>
      <div className="eventPopover" role="dialog" data-lenis-prevent aria-label={`${event.name} details`}>
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
            <dt>SAVE IT</dt>
            <dd className="calLinks">
              <a href={googleCalendarUrl} target="_blank" rel="noreferrer">
                + Google Calendar
              </a>
              <a href={icsPath} download>
                + Apple / Outlook
              </a>
            </dd>
            <dt>FOOD</dt>
            <dd>{event.food ?? "To be announced"}</dd>
            <dt>AWARDS</dt>
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
            {signupForm && (
              <a href={signupForm} target="_blank" rel="noreferrer">
                {event.forms.pre ? "REGISTER ↗" : "I'M INTERESTED ↗"}
              </a>
            )}
            <a className="secondary" href="#guide" onClick={() => setOpen(false)}>
              FULL GUIDE ↓
            </a>
            <a className="secondary" href={event.mapsUrl} target="_blank" rel="noreferrer">
              GET DIRECTIONS ↗
            </a>
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
