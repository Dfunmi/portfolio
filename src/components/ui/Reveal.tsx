"use client";

import { motion, type Variants } from "framer-motion";
import type { WithChildren, WithClassName } from "@/types";

interface RevealProps extends WithChildren, WithClassName {
  /** Stagger delay in seconds — pass an index * 0.06 for lists. */
  delay?: number;
  /** Animate once when scrolled into view (default) or immediately on mount. */
  trigger?: "inView" | "mount";
}

const variants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

/**
 * The single entrance-animation primitive for the app. Framer Motion
 * already respects `prefers-reduced-motion` for transform/opacity when
 * the browser setting is on, matching the CSS-level reduction in
 * globals.css. Wrap any block that should animate in — a card, a
 * section heading, a list item — rather than writing bespoke motion
 * props at each call site.
 */
export function Reveal({ children, className, delay = 0, trigger = "inView" }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      variants={variants}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      {...(trigger === "inView"
        ? { whileInView: "visible", viewport: { once: true, margin: "-80px" } }
        : { animate: "visible" })}
    >
      {children}
    </motion.div>
  );
}
