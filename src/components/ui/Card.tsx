"use client";

import { motion } from "framer-motion";
import { cn, focusRing } from "@/lib/utils";
import type { WithChildren, WithClassName } from "@/types";

interface CardProps extends WithChildren, WithClassName {
  /** Set when the whole card is a click/focus target (e.g. wrapped in a Link). */
  interactive?: boolean;
}

/**
 * Base surface. Composes with CardHeader / CardContent / CardFooter
 * below rather than accepting a dozen layout props — keeps each card
 * instance declarative and easy to scan.
 */
export function Card({ children, className, interactive = false }: CardProps) {
  return (
    <motion.div
      tabIndex={interactive ? 0 : undefined}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "rounded-xl border border-border/70 bg-surface p-6",
        "shadow-sm transition-all duration-(--duration-base) hover:-translate-y-1 hover:shadow-md",
        interactive && cn("cursor-pointer", focusRing),
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ children, className }: WithChildren & WithClassName) {
  return <div className={cn("mb-4 flex flex-col gap-1.5", className)}>{children}</div>;
}

export function CardTitle({ children, className }: WithChildren & WithClassName) {
  return (
    <h3 className={cn("text-lg font-semibold tracking-tight text-foreground", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className }: WithChildren & WithClassName) {
  return (
    <p className={cn("text-sm leading-relaxed text-muted-foreground", className)}>{children}</p>
  );
}

export function CardContent({ children, className }: WithChildren & WithClassName) {
  return <div className={cn("text-sm text-foreground/90", className)}>{children}</div>;
}

export function CardFooter({ children, className }: WithChildren & WithClassName) {
  return <div className={cn("mt-5 flex items-center gap-3", className)}>{children}</div>;
}
