import { BrandLockup } from "@/components/BrandLockup";
import { EventPromo } from "@/components/EventPromo";
import { EventGuide } from "@/components/EventGuide";
import { ProjectCard, SlotCard } from "@/components/ProjectCard";
import { Terminal } from "@/components/Terminal";
import { event, signupForm } from "@/data/event";
import { projects } from "@/lib/projects";

const TICKER =
  `BUILT TO LEARN ✦ BUILT TO SHARE ✦ BUILT WITH REPLIT ✦ BUILT AT ${event.school.toUpperCase()} ✦ SHIPPED FROM THE CIF STEPS ✦ DISRUPTION LAB × REPLIT ✦ `;

const EMPTY_SLOTS = 6;

export default function Home() {
  const count = projects.length;
  const live = count > 0;
  const winners = projects.filter((p) => p.award).length;

  return (
    <main>
      <div className="ticker" aria-hidden="true">
        <span>{TICKER}</span>
        <span>{TICKER}</span>
      </div>

      <section className="hero">
        <BrandLockup />
        <div className="signalRow">
          <a className="signal" href={event.mapsUrl} target="_blank" rel="noreferrer">
            <i /> LIVE FROM THE {event.location.toUpperCase()} · NOV 7 · {event.time}
            <b>↗</b>
          </a>
        </div>
        <EventPromo />
        <h1>
          Built with <span>Replit</span>
        </h1>
        <p className="heroCopy">
          {live
            ? `${count} experiments. ${count} live builds. One gloriously overclocked wall of ideas.`
            : "One afternoon on the CIF steps. Idea to deployed app. Every build lands on this wall."}
        </p>
        <Terminal builds={count} />
        <div className="ctaRow">
          {signupForm && (
            <a className="cta" href={signupForm} target="_blank" rel="noreferrer">
              <span>I&apos;M IN</span>
              {event.forms.pre ? "REGISTER (REQUIRED TO ATTEND)" : "FILL OUT THE INTEREST FORM"}
              <b>↗</b>
            </a>
          )}
          <a className="ctaGhost" href="#guide">
            EVENT GUIDE ↓
          </a>
        </div>
        <a className="jump" href="#projects">
          ENTER THE WALL <span>↓</span>
        </a>
      </section>

      <EventGuide />

      <section className="wall" id="projects" aria-label="Learnathon project showcase">
        <div className="wallHeader">
          <p>PROJECT DIRECTORY</p>
          <span>
            {live
              ? `${count} BUILDS${winners ? ` · ${winners} WINNER${winners === 1 ? "" : "S"}` : ""} // ${event.dateShort}`
              : "WALL OPENS // NOV 7 2026"}
          </span>
        </div>
        <div className="grid">
          {live
            ? projects.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)
            : Array.from({ length: EMPTY_SLOTS }, (_, i) => (
                <SlotCard
                  key={i}
                  index={i}
                  href={event.forms.post ?? signupForm}
                  label={event.forms.post ? "SUBMIT YOUR BUILD ↗" : "SAVE YOUR SPOT ↗"}
                />
              ))}
        </div>
      </section>

      <footer>
        <div>
          <b>{live ? count : event.dateStamp}</b>
          <span>{live ? "LIVE BUILDS" : "BUILD DAY"}</span>
        </div>
        <p>
          Shipped from the CIF steps at the {event.name}, {event.school}
          <br />
          <strong>Powered by curiosity + Replit.</strong>
        </p>
        <a href="#">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
