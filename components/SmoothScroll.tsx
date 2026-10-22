"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/** Eased wheel scrolling for the whole page. Touch stays native; reduced-motion users get plain scroll. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // a touch tighter than the default 0.1 so the wheel doesn't feel floaty
    const lenis = new Lenis({ autoRaf: true, lerp: 0.12 });
    // fast start, soft landing, like the reveal curve in globals.css
    const jump = { duration: 0.9, easing: (t: number) => 1 - (1 - t) ** 4 };

    // Lenis's own `anchors` option doesn't cancel the native jump, so the two fight; take in-page links over here
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href")!;
      e.preventDefault();
      lenis.scrollTo(hash === "#" ? 0 : hash, jump);
      history.pushState(null, "", hash === "#" ? location.pathname + location.search : hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
