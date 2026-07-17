import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { WithClassName } from "@/types";

type BadgeVariant = "neutral" | "accent" | "success" | "warning" | "danger" | "info";

const variantStyles: Record<BadgeVariant, string> = {
  neutral: "bg-muted text-muted-foreground border-border",
  accent: "bg-accent/10 text-accent border-accent/20",
  success: "bg-success-subtle text-success border-success/20",
  warning: "bg-warning-subtle text-warning border-warning/20",
  danger: "bg-danger-subtle text-danger border-danger/20",
  info: "bg-info-subtle text-info border-info/20",
};

interface BadgeProps extends WithClassName {
  children: ReactNode;
  variant?: BadgeVariant;
  /** Small solid indicator dot, e.g. for live/status badges. */
  dot?: boolean;
}

/**
 * Compact status indicator. Unlike Tag, a Badge is never interactive or
 * removable — it communicates state (e.g. "Live", "Beta", "3 open").
 */
export function Badge({ children, variant = "neutral", dot, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5",
        "font-mono text-xs font-medium uppercase tracking-wide",
        variantStyles[variant],
        className
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />}
      {children}
    </span>
  );
}
