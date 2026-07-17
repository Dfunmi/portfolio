"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SESSION_KEY = "portfolio-loaded";
const MIN_VISIBLE_MS = 500;

/**
 * Shows a brief branded splash on the first load of a session, then
 * fades out. Deliberately short (500ms floor, not seconds) — this is a
 * polish detail, not a gate people have to wait through. Gated by
 * sessionStorage so navigating between "/" and "/design-system" (or
 * clicking anchor links) never replays it, and skipped entirely for
 * prefers-reduced-motion rather than just speeding up.
 */
export function LoadingScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadyLoaded = sessionStorage.getItem(SESSION_KEY);

    if (prefersReducedMotion || alreadyLoaded) return;

    // Intentional: this only runs once on mount, gating client-only browser
    // APIs (matchMedia, sessionStorage) that don't exist during SSR. A lazy
    // useState initializer would cause a real hydration mismatch here since
    // the server has no window to read from — this must run post-hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
    sessionStorage.setItem(SESSION_KEY, "true");

    const timer = setTimeout(() => setVisible(false), MIN_VISIBLE_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          aria-hidden="true"
        >
          <motion.span
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex size-12 items-center justify-center rounded-lg bg-accent font-mono text-lg font-semibold text-accent-foreground"
          >
            O
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
