import { cn } from "@/lib/utils";
import type { WithClassName } from "@/types";

/**
 * Base shimmer block. Deliberately a Server Component — a loading
 * placeholder should never cost client JS. The shimmer is a CSS
 * background-position animation (see `--animate-shimmer` in globals.css),
 * not a Framer Motion loop.
 */
export function Skeleton({ className }: WithClassName) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "animate-shimmer rounded-md bg-skeleton-base bg-[length:200%_100%]",
        "bg-gradient-to-r from-skeleton-base via-skeleton-shine to-skeleton-base",
        className
      )}
    />
  );
}

/** A block of N shimmer lines mimicking paragraph text, last line shorter. */
export function SkeletonText({ lines = 3, className }: WithClassName & { lines?: number }) {
  return (
    <div className={cn("flex flex-col gap-2", className)} role="status" aria-label="Loading text">
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn("h-3.5", index === lines - 1 ? "w-2/3" : "w-full")}
        />
      ))}
    </div>
  );
}

export function SkeletonAvatar({ className }: WithClassName) {
  return <Skeleton className={cn("size-10 shrink-0 rounded-full", className)} />;
}

/** Mirrors the Card component's padding/border so it can drop in as a placeholder. */
export function SkeletonCard({ className }: WithClassName) {
  return (
    <div className={cn("rounded-lg border border-border bg-surface p-6", className)}>
      <div className="mb-4 flex items-center gap-3">
        <SkeletonAvatar />
        <div className="flex-1">
          <Skeleton className="mb-2 h-3.5 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <SkeletonText lines={2} />
    </div>
  );
}
