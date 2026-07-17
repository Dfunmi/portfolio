import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Heading, Text } from "@/components/ui/Typography";
import type { WithClassName } from "@/types";
import type { ReactNode } from "react";

interface SectionProps extends WithClassName {
  children?: ReactNode;
  /** DOM id used for in-page anchor navigation (e.g. Navbar links to "#work"). */
  id?: string;
  /** Short mono-set label above the heading, e.g. "SELECTED WORK". Optional. */
  eyebrow?: string;
  heading?: string;
  description?: string;
  containerSize?: "sm" | "md" | "lg" | "full";
}

/**
 * Vertical rhythm primitive for full-width page sections. Owns the
 * consistent top/bottom spacing and the optional eyebrow/heading/
 * description header block, so individual sections only implement
 * their unique content.
 */
export function Section({
  children,
  className,
  id,
  eyebrow,
  heading,
  description,
  containerSize = "lg",
}: SectionProps) {
  const hasHeader = eyebrow || heading || description;

  return (
    <section id={id} className={cn("py-16 sm:py-24 lg:py-28", className)}>
      <Container size={containerSize}>
        {hasHeader && (
          <div className="mb-8 max-w-2xl sm:mb-10 lg:mb-14">
            {eyebrow && (
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {eyebrow}
              </p>
            )}
            {heading && (
              <Heading level={2} size="lg">
                {heading}
              </Heading>
            )}
            {description && (
              <Text variant="body" muted className="mt-4 max-w-xl">
                {description}
              </Text>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
