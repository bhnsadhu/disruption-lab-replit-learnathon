import { event } from "@/data/event";
import { ReplitMark } from "./ReplitMark";

export function BrandLockup() {
  return (
    <div className="brandLockup">
      <small>PRESENTED BY</small>
      <div className="brandRow">
        <span className="brandChip">
          {event.disruptionLabLogo ? (
            <img src={event.disruptionLabLogo} alt={event.host} />
          ) : (
            <span className="brandWord">
              {event.host}
              <sup>{event.school}</sup>
            </span>
          )}
        </span>
        <span className="brandX" aria-hidden="true">
          ×
        </span>
        <a className="brandChip" href={event.replitUrl} target="_blank" rel="noreferrer">
          <ReplitMark />
          <span className="brandWord">Replit</span>
        </a>
      </div>
    </div>
  );
}
