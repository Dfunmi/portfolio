"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlobConfig {
  color: string;
  size: string;
  position: string;
  duration: number;
  delay: number;
  range: { x: string[]; y: string[] };
}

const blobConfigs: Record<"full" | "subtle", BlobConfig[]> = {
  full: [
    {
      color: "bg-signal-500/20",
      size: "size-72 sm:size-96",
      position: "-left-24 top-1/4",
      duration: 16,
      delay: 0,
      range: { x: ["0%", "6%", "-4%", "0%"], y: ["0%", "-8%", "5%", "0%"] },
    },
    {
      color: "bg-info-500/20",
      size: "size-64 sm:size-80",
      position: "-right-16 top-1/3",
      duration: 18,
      delay: 1.5,
      range: { x: ["0%", "-5%", "6%", "0%"], y: ["0%", "6%", "-6%", "0%"] },
    },
    {
      color: "bg-success-500/15",
      size: "size-72",
      position: "bottom-0 left-1/3",
      duration: 20,
      delay: 3,
      range: { x: ["0%", "4%", "-6%", "0%"], y: ["0%", "-5%", "4%", "0%"] },
    },
  ],
  subtle: [
    {
      color: "bg-signal-500/10",
      size: "size-64",
      position: "-left-16 top-1/3",
      duration: 18,
      delay: 0,
      range: { x: ["0%", "5%", "-4%", "0%"], y: ["0%", "-6%", "4%", "0%"] },
    },
    {
      color: "bg-info-500/8",
      size: "size-56",
      position: "-right-10 bottom-1/4",
      duration: 22,
      delay: 2,
      range: { x: ["0%", "-4%", "5%", "0%"], y: ["0%", "5%", "-5%", "0%"] },
    },
  ],
};

interface FloatingShapesProps {
  variant?: "full" | "subtle";
  className?: string;
}

/**
 * Decorative, aria-hidden background layer. Each blob gets a slow
 * looping float (independent of scroll) plus a scroll-linked parallax
 * offset scoped to this element's own viewport entry/exit — not the
 * whole page's scroll, so it stays subtle and self-contained per section.
 */
export function FloatingShapes({ variant = "full", className }: FloatingShapesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const shapes = blobConfigs[variant];

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      {variant === "full" && (
        <div className="aurora-spin absolute left-1/2 top-1/2 size-[140vw] -translate-x-1/2 -translate-y-1/2 opacity-[0.08] blur-3xl sm:size-[90vw]" />
      )}

      {shapes.map((shape, index) => (
        <motion.div key={index} style={{ y: parallaxY }} className={cn("absolute", shape.position)}>
          <motion.div
            animate={{ x: shape.range.x, y: shape.range.y }}
            transition={{ duration: shape.duration, repeat: Infinity, ease: "easeInOut", delay: shape.delay }}
            className={cn("rounded-full blur-3xl", shape.color, shape.size)}
          />
        </motion.div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}
