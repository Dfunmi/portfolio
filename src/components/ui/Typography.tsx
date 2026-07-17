import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { WithClassName } from "@/types";

type HeadingLevel = 1 | 2 | 3 | 4;
type HeadingSize = "display" | "xl" | "lg" | "md" | "sm";

interface HeadingProps extends WithClassName {
  children: ReactNode;
  level?: HeadingLevel;
  /** Visual size, independent of semantic level (e.g. an h2 styled as display). */
  size?: HeadingSize;
  id?: string;
}

const headingSizeStyles: Record<HeadingSize, string> = {
  display: "text-5xl sm:text-6xl font-semibold tracking-tight leading-[1.05]",
  xl: "text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1]",
  lg: "text-3xl sm:text-4xl font-semibold tracking-tight leading-tight",
  md: "text-2xl font-semibold tracking-tight leading-snug",
  sm: "text-lg font-semibold tracking-tight leading-snug",
};

const defaultSizeForLevel: Record<HeadingLevel, HeadingSize> = {
  1: "display",
  2: "xl",
  3: "lg",
  4: "md",
};

/**
 * Every heading in the app should render through this component rather
 * than raw <h1>-<h4> tags with inline Tailwind — keeps the type scale
 * to five deliberate steps instead of drifting per page.
 */
export function Heading({ children, level = 2, size, className, id }: HeadingProps) {
  const Tag = `h${level}` as ElementType;
  const resolvedSize = size ?? defaultSizeForLevel[level];

  return (
    <Tag id={id} className={cn("text-foreground", headingSizeStyles[resolvedSize], className)}>
      {children}
    </Tag>
  );
}

type TextVariant = "lead" | "body" | "small" | "caption";

interface TextProps extends WithClassName {
  children: ReactNode;
  variant?: TextVariant;
  muted?: boolean;
  as?: "p" | "span" | "div";
}

const textVariantStyles: Record<TextVariant, string> = {
  lead: "text-lg sm:text-xl leading-relaxed",
  body: "text-base leading-relaxed",
  small: "text-sm leading-relaxed",
  caption: "text-xs leading-normal tracking-wide",
};

/** Body copy. `muted` maps to the secondary-text token, never a raw gray. */
export function Text({ children, variant = "body", muted, className, as: Tag = "p" }: TextProps) {
  return (
    <Tag
      className={cn(
        textVariantStyles[variant],
        muted ? "text-muted-foreground" : "text-foreground",
        className
      )}
    >
      {children}
    </Tag>
  );
}

/** Inline code / identifiers — the mono face, matching the system's code-editor signature detail. */
export function Code({ children, className }: WithClassName & { children: ReactNode }) {
  return (
    <code
      className={cn(
        "rounded-xs border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground",
        className
      )}
    >
      {children}
    </code>
  );
}

/** A single keyboard key, e.g. inside a Raycast-style shortcut hint. */
export function Kbd({ children, className }: WithClassName & { children: ReactNode }) {
  return (
    <kbd
      className={cn(
        "inline-flex min-w-[1.5rem] items-center justify-center rounded-xs border border-border",
        "bg-surface px-1.5 py-0.5 font-mono text-[0.75em] text-muted-foreground shadow-xs",
        className
      )}
    >
      {children}
    </kbd>
  );
}
