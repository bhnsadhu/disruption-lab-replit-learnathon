import { event } from "@/data/event";
import { ReplitMark } from "./ReplitMark";

export function BrandLockup() {
  return (
    <div className="brandLockup">
      <small>PRESENTED BY</small>
      <div className="brandRow">
        <a className="brandChip" href={event.links.website} target="_blank" rel="noreferrer">
          <span className="brandWord">{event.host}</span>
        </a>
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
