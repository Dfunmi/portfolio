"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/Badge";

/**
 * Subtle scroll parallax on the portrait — moves a few pixels slower
 * than the page scroll, scoped to this element's own viewport entry/exit
 * rather than the whole page. Isolated in its own Client Component so
 * About.tsx itself stays a Server Component.
 */
export function AboutPhoto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-24, 24]);

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-xs lg:max-w-none">
      <motion.div
        style={{ y: parallaxY }}
        className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border shadow-sm"
      >
        <Image
          src="/images/profile pic.jpeg"
          alt="Portrait of Oluwafunmilayo Owolabi"
          fill
          sizes="(min-width: 1024px) 340px, (min-width: 640px) 320px, 80vw"
          className="object-cover"
        />
        <div className="absolute inset-0 border border-border/50" />
      </motion.div>

      {/* <div className="absolute -bottom-5 left-1/2 w-max -translate-x-1/2 rounded-lg border border-border bg-surface px-4 py-2.5 shadow-md">
        <Badge variant="accent" dot>
          3+ years, frontend
        </Badge>
      </div> */}
    </div>
  );
}
