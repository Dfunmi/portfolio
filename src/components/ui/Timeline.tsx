"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Tag } from "@/components/ui/Tag";
import { Heading, Text } from "@/components/ui/Typography";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Horizontal distance from the left edge to the rail/dot center — shared by Timeline and TimelineItem so they always line up. */
const RAIL_OFFSET = 20;

interface TimelineProps {
  children: ReactNode;
  className?: string;
}

/**
 * Vertical rail container. Draws a static base line the full height of
 * its content, plus an accent line that fills in as the user scrolls
 * through the timeline (via scroll-linked scaleY) — the "animates while
 * scrolling" requirement applied to the rail itself, not just each item.
 */
export function Timeline({ children, className }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.6"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.3 });

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div
        className="absolute top-1 bottom-1 w-px bg-border"
        style={{ left: RAIL_OFFSET }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-1 bottom-1 w-px origin-top bg-accent"
        style={{ left: RAIL_OFFSET, scaleY: progress }}
        aria-hidden="true"
      />
      <div className="flex flex-col gap-10">{children}</div>
    </div>
  );
}

interface TimelineItemProps {
  company: string;
  role: string;
  duration: string;
  responsibilities: readonly string[];
  technologies: readonly string[];
  achievements: readonly string[];
  /** Highlights this as the current/ongoing role — pulsing dot + "Current" badge. */
  current?: boolean;
  /** Stagger index for entrance delay when several items reveal near-simultaneously. */
  index?: number;
}

/** A single role in a Timeline. Animates into view via Reveal when scrolled to. */
export function TimelineItem({
  company,
  role,
  duration,
  responsibilities,
  technologies,
  achievements,
  current = false,
  index = 0,
}: TimelineItemProps) {
  return (
    <Reveal delay={Math.min(index * 0.08, 0.24)}>
      <div className="relative grid grid-cols-[40px_1fr] gap-4 sm:gap-6">
        {/* Dot marker, centered on the rail */}
        <div className="relative flex justify-center pt-1.5">
          {current && (
            <motion.span
              className="absolute size-3 rounded-full bg-accent"
              animate={{ scale: [1, 2.1], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              aria-hidden="true"
            />
          )}
          <span
            className={cn(
              "relative z-10 size-3 rounded-full ring-4 ring-background",
              current ? "bg-accent" : "bg-muted-foreground/50"
            )}
            aria-hidden="true"
          />
        </div>

        <Card className="mb-2">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <Heading level={3} size="sm">
                {role}
              </Heading>
              <Text variant="small" muted className="mt-0.5">
                {company}
              </Text>
            </div>
            <div className="flex items-center gap-2">
              {current && (
                <Badge variant="success" dot>
                  Current
                </Badge>
              )}
              <Badge variant="neutral">{duration}</Badge>
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <Text variant="caption" muted className="mb-2 font-mono uppercase tracking-wide">
                Responsibilities
              </Text>
              <ul className="flex flex-col gap-2">
                {responsibilities.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-muted-foreground" strokeWidth={1.75} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Text variant="caption" muted className="mb-2 font-mono uppercase tracking-wide">
                Achievements
              </Text>
              <ul className="flex flex-col gap-2">
                {achievements.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                    <Sparkles size={15} className="mt-0.5 shrink-0 text-accent" strokeWidth={1.75} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
            {technologies.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </Card>
      </div>
    </Reveal>
  );
}
