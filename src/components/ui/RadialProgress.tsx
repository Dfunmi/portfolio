"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { cn } from "@/lib/utils";

interface RadialProgressProps {
  /** 0–100 */
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

/**
 * Circular progress ring — the modern alternative to a linear progress
 * bar. The ring's stroke draws in once on scroll into view; the percentage
 * label in the center reuses AnimatedCounter so the number ticks up in
 * sync with the stroke instead of being a separate, disconnected effect.
 */
export function RadialProgress({ value, size = 56, strokeWidth = 4, className }: RadialProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(Math.max(value, 0), 100) / 100) * circumference;

  return (
    <div
      ref={ref}
      className={cn("relative inline-flex shrink-0 items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none stroke-border"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="fill-none stroke-accent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: isInView ? offset : circumference }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <span className="absolute font-mono text-[0.65rem] font-medium text-foreground">
        {isInView ? <AnimatedCounter value={value} suffix="%" duration={1.1} /> : "0%"}
      </span>
    </div>
  );
}
