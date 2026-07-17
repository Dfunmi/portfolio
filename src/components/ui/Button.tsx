"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import type { MouseEventHandler, ReactNode } from "react";
import { cn, focusRing } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-foreground shadow-sm hover:opacity-90",
  secondary: "bg-surface text-foreground border border-border shadow-sm hover:bg-muted",
  outline: "border border-border text-foreground hover:bg-muted",
  ghost: "text-foreground hover:bg-muted",
  destructive: "bg-danger text-white shadow-sm hover:opacity-90",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-base",
};

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
}

/** Rendered as a Next.js Link (or plain anchor for external URLs) when `href` is provided. */
interface ButtonAsLink extends BaseButtonProps {
  href: string;
  external?: boolean;
  /** Triggers a file download instead of navigation. Pass a filename string, or `true` to use the source filename. */
  download?: boolean | string;
  onClick?: never;
  type?: never;
  disabled?: never;
  loading?: never;
}

/**
 * Rendered as a native <button> when `href` is omitted. Only the button
 * attributes this design system actually needs are exposed — deliberately
 * narrower than the full ButtonHTMLAttributes surface, which conflicts
 * with Framer Motion's own event typings (onDrag, onAnimationStart, etc).
 */
interface ButtonAsButton extends BaseButtonProps {
  href?: undefined;
  external?: never;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  /** Shows a spinner in place of `icon` and disables the button. */
  loading?: boolean;
  "aria-label"?: string;
}

type ButtonProps = ButtonAsLink | ButtonAsButton;

const motionFeedback = {
  whileHover: { y: -1 },
  whileTap: { scale: 0.97 },
  transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] as const },
};

/**
 * Single Button implementation for the entire app. Composition over
 * duplication: pass `href` to get a Next.js Link (or a plain anchor for
 * external URLs), omit it to get a native, fully-typed <button>. Both
 * paths share the same visual system and motion feedback.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, icon } = props;

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium",
    "transition-colors duration-(--duration-fast) disabled:pointer-events-none disabled:opacity-50",
    focusRing,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (props.href) {
    const { href, external, download } = props;

    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...motionFeedback}
        >
          {children}
          {icon}
        </motion.a>
      );
    }

    return (
      <Link href={href} download={download} className="inline-block">
        <motion.span className={classes} {...motionFeedback}>
          {children}
          {icon}
        </motion.span>
      </Link>
    );
  }

  const { type = "button", onClick, disabled, loading, "aria-label": ariaLabel } =
    props as ButtonAsButton;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}
      className={classes}
      {...motionFeedback}
    >
      {loading ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : icon}
      {children}
    </motion.button>
  );
}
