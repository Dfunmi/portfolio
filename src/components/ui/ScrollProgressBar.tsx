"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * A 2px accent bar across the top of the viewport that fills as the
 * visitor scrolls through the page. useSpring smooths the raw scroll
 * fraction so it doesn't feel like it's stepping — a small touch, but
 * one of those details that reads as "premium" precisely because it's
 * not jerky. Under reduced motion, the spring is skipped in favor of
 * tracking scroll position directly.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const smoothedProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX: shouldReduceMotion ? scrollYProgress : smoothedProgress }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent"
      aria-hidden="true"
    />
  );
}
