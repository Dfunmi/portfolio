"use client";

import { X } from "lucide-react";
import { cn, focusRing } from "@/lib/utils";
import type { WithClassName } from "@/types";

interface TagProps extends WithClassName {
  children: string;
  onRemove?: () => void;
  /** Marks the tag as the active/selected filter, e.g. in a filter bar. */
  selected?: boolean;
}

/**
 * Interactive keyword chip — used for tech-stack labels, filters, and
 * skill lists. Pass `onRemove` to render a dismiss control; omit it for
 * a read-only tag (still hoverable/selectable via `selected`).
 */
export function Tag({ children, onRemove, selected = false, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs",
        "transition-colors duration-(--duration-fast)",
        selected
          ? "border-accent bg-accent/10 text-accent"
          : "border-border bg-surface text-muted-foreground hover:border-ink-300 hover:text-foreground",
        className
      )}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${children}`}
          className={cn(
            "-mr-1 flex size-3.5 items-center justify-center rounded-full text-current/70 hover:text-current",
            focusRing
          )}
        >
          <X size={11} strokeWidth={2} />
        </button>
      )}
    </span>
  );
}
