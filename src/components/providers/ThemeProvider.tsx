"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { WithChildren } from "@/types";

/**
 * Wraps next-themes with the project's conventions: class-based dark
 * mode (matches the `.dark` selector in globals.css), system preference
 * as the default, and no flash-of-incorrect-theme on load.
 */
export function ThemeProvider({ children }: WithChildren) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
