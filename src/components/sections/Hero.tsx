"use client";

import { useRef } from "react";
import type { MouseEvent } from "react";
import { Download, ArrowRight, ArrowDown, Github, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { TypingText } from "@/components/ui/TypingText";
import { Reveal } from "@/components/ui/Reveal";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { FloatingShapes } from "@/components/ui/FloatingShapes";
import { siteConfig, socialLinks } from "@/config/site";
import { cn, focusRing } from "@/lib/utils";

const roles = [
  "Frontend Developer",
  "React.js Developer",
  "Next.js Developer",
];

const socialIcons = [
  { label: "GitHub", href: socialLinks.github, icon: Github },
  { label: "Email", href: socialLinks.email, icon: Mail },
];


function CursorSpotlight() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{
        background:
          "radial-gradient(420px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), color-mix(in oklab, var(--color-accent) 14%, transparent), transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
}

function ScrollIndicator() {
  return (
    <a
      href="#work"
      aria-label="Scroll to work section"
      className={cn(
        "absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex",
        "text-muted-foreground transition-colors hover:text-foreground",
        focusRing,
        "rounded-md p-1"
      )}
    >
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em]">Scroll</span>
      <ArrowDown size={16} className="animate-scroll-indicator" />
    </a>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="group relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden border-b border-border/70"
    >
      <FloatingShapes variant="full" />
      <CursorSpotlight />

      <Container size="lg" className="relative py-20 sm:py-28 lg:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* <Reveal trigger="mount">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 font-mono text-xs text-muted-foreground backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
              Available for new projects
            </span>
          </Reveal> */}

          <Reveal trigger="mount" delay={0.08}>
            <Heading level={1} size="display" className="text-balance leading-[0.95]">
              Building thoughtful interfaces with care, clarity, and speed.
            </Heading>
          </Reveal>

          <Reveal trigger="mount" delay={0.16}>
            <div className="mt-4 h-10 font-mono text-xl text-accent sm:text-2xl">
              <TypingText words={roles} />
            </div>
          </Reveal>

          <Reveal trigger="mount" delay={0.24}>
            <Text variant="lead" muted className="mt-6 max-w-2xl text-balance">
              I design and build polished web experiences for products, brands, and teams that value usability, performance, and detail.
            </Text>
          </Reveal>

          <Reveal trigger="mount" delay={0.32}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-3">
              <Button href={siteConfig.resumeUrl} download variant="secondary" size="lg" icon={<Download size={17} />}>
                Download CV
              </Button>
              <Button href="#work" size="lg" icon={<ArrowRight size={17} />}>
                Explore Work
              </Button>
            </div>
          </Reveal>

          <Reveal trigger="mount" delay={0.4}>
            <SocialLinks links={socialIcons} className="mt-12" />
          </Reveal>
        </div>
      </Container>

      <ScrollIndicator />
    </section>
  );
}
