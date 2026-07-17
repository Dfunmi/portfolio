import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}


export const focusRing =
  "outline-none focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

/** Standard interactive-element transition timing, reused across components. */
export const transitionBase = "transition-colors duration-(--duration-base) ease-(--ease-signature)";

const RELATIVE_TIME_DIVISIONS: [number, Intl.RelativeTimeFormatUnit][] = [
  [60, "seconds"],
  [60, "minutes"],
  [24, "hours"],
  [7, "days"],
  [4.345, "weeks"],
  [12, "months"],
  [Infinity, "years"],
];

/** Formats an ISO date string as "3 days ago", "2 months ago", etc. */
export function formatRelativeTime(iso: string): string {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  let duration = (Date.now() - new Date(iso).getTime()) / 1000;

  for (const [amount, unit] of RELATIVE_TIME_DIVISIONS) {
    if (Math.abs(duration) < amount) {
      return rtf.format(-Math.round(duration), unit);
    }
    duration /= amount;
  }
  return "";
}

