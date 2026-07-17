"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import type { WithChildren } from "@/types";

const NAVBAR_OFFSET = 64; // matches the fixed Navbar's height (h-16)

interface LenisContextValue {
  /** Pauses/resumes Lenis — use while a mobile menu or modal is open so it can't scroll underneath. */
  setPaused: (paused: boolean) => void;
}

const LenisContext = createContext<LenisContextValue | null>(null);

/** Access to pause/resume smooth scrolling, e.g. while a mobile menu is open. No-ops safely if Lenis isn't active (reduced motion). */
export function useLenisControls(): LenisContextValue {
  const context = useContext(LenisContext);
  return context ?? { setPaused: () => {} };
}

export function SmoothScrollProvider({ children }: WithChildren) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });
    lenisRef.current = lenis;

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    // Same-page hash links (Navbar, Hero's scroll indicator, Footer, Contact)
    // need to go through Lenis explicitly — a native anchor jump would
    // otherwise snap past Lenis's virtualized scroll position.
    function handleAnchorClick(event: MouseEvent) {
      const target = (event.target as HTMLElement).closest("a[href^='#']");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || href === "#") return;

      const destination = document.querySelector(href);
      if (!destination) return;

      event.preventDefault();
      lenis.scrollTo(destination as HTMLElement, { offset: -NAVBAR_OFFSET });
    }

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const setPaused = useCallback((paused: boolean) => {
    if (paused) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, []);

  return <LenisContext.Provider value={{ setPaused }}>{children}</LenisContext.Provider>;
}
