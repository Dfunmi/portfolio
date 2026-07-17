import { cn } from "@/lib/utils";
import type { WithChildren, WithClassName } from "@/types";

type ContainerSize = "sm" | "md" | "lg" | "full";

const sizeMap: Record<ContainerSize, string> = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  full: "max-w-[1440px]",
};

interface ContainerProps extends WithChildren, WithClassName {
  /** Max-width step. Defaults to "lg" — the primary content measure. */
  size?: ContainerSize;
  as?: "div" | "section" | "article" | "header" | "footer";
}

/**
 * Horizontal rhythm primitive. Every top-level block on the page should
 * be wrapped in exactly one Container so the left/right margins stay
 * pixel-consistent from the navbar down to the footer.
 */
export function Container({
  children,
  className,
  size = "lg",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10", sizeMap[size], className)}>
      {children}
    </Tag>
  );
}
