"use client";

import { motion } from "framer-motion";
import type { MouseEventHandler, ReactNode } from "react";
import { cn, focusRing } from "@/lib/utils";

type IconButtonVariant = "ghost" | "surface";
type IconButtonSize = "sm" | "md";

const variantStyles: Record<IconButtonVariant, string> = {
  ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
  surface: "border border-border bg-surface text-foreground hover:bg-muted",
};

const sizeStyles: Record<IconButtonSize, string> = {
  sm: "size-8",
  md: "size-9",
};

interface IconButtonProps {
  icon: ReactNode;
  /** Required — icon-only controls must have an accessible name. */
  "aria-label": string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  disabled?: boolean;
  className?: string;
}

/**
 * Icon-only button used for toolbar/utility actions (this is the pattern
 * ThemeToggle already follows — this component generalizes it so future
 * icon actions don't reimplement the same button chrome).
 */
export function IconButton({
  icon,
  onClick,
  variant = "ghost",
  size = "md",
  disabled,
  className,
  ...aria
}: IconButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.94 }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex items-center justify-center rounded-md transition-colors duration-(--duration-fast)",
        "disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        focusRing,
        className
      )}
      {...aria}
    >
      {icon}
    </motion.button>
  );
}
