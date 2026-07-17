"use client";

import { useEffect, useState } from "react";

interface TypingTextProps {
  words: string[];
  typingSpeedMs?: number;
  deletingSpeedMs?: number;
  pauseMs?: number;
  className?: string;
}

/**
 * Cycles through `words`, typing and deleting each in turn. The animated
 * text is decorative (aria-hidden) — a static, visually-hidden string
 * carries the same information for screen readers so nothing is lost.
 * If the user has reduced motion enabled, the first word is rendered
 * once, statically, with no timers running at all.
 */
export function TypingText({
  words,
  typingSpeedMs = 65,
  deletingSpeedMs = 35,
  pauseMs = 1800,
  className,
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion || words.length === 0) return;

    const currentWord = words[wordIndex % words.length] ?? "";
    const atFullWord = displayed === currentWord;
    const atEmpty = displayed === "";

    let delay = isDeleting ? deletingSpeedMs : typingSpeedMs;
    if (atFullWord && !isDeleting) delay = pauseMs;

    const timeout = setTimeout(() => {
      if (isDeleting) {
        if (atEmpty) {
          setIsDeleting(false);
          setWordIndex((index) => (index + 1) % words.length);
        } else {
          setDisplayed(currentWord.slice(0, displayed.length - 1));
        }
      } else {
        if (atFullWord) {
          setIsDeleting(true);
        } else {
          setDisplayed(currentWord.slice(0, displayed.length + 1));
        }
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex, words, reducedMotion, typingSpeedMs, deletingSpeedMs, pauseMs]);

  const staticWord = words[0] ?? "";

  return (
    <span className={className}>
      <span aria-hidden="true">
        {reducedMotion ? staticWord : displayed}
        <span className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.1em] animate-pulse bg-current" />
      </span>
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}
