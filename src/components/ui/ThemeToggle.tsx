"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { WithClassName } from "@/types";

/**
 * Toggles between light and dark themes. Renders a stable placeholder
 * until mounted to avoid a server/client markup mismatch, since the
 * resolved theme is only known in the browser.
 */
export function ThemeToggle({ className }: WithClassName) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Intentional: this only fires once on mount to gate the icon behind a
  // client-only render, avoiding a server/client markup mismatch caused
  // by next-themes resolving the actual theme after hydration.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"}
      className={cn(
        "relative flex size-9 items-center justify-center rounded-md",
        "text-foreground/80 transition-colors hover:bg-muted hover:text-foreground",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex"
          >
            {isDark ? <Moon size={18} strokeWidth={1.75} /> : <Sun size={18} strokeWidth={1.75} />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
