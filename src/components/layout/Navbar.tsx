"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { navItems, siteConfig } from "@/config/site";
import { useLenisControls } from "@/components/providers/SmoothScrollProvider";
import { cn } from "@/lib/utils";

/**
 * Sticky primary navigation. Tracks scroll position to switch from a
 * transparent to a blurred/bordered surface, and owns the mobile menu's
 * open state. Desktop and mobile share the same `navItems` source of
 * truth from site config.
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setPaused, scrollToTop } = useLenisControls();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll (and pause Lenis, which manages scroll independently
  // of body overflow) while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    setPaused(isMenuOpen);
    return () => {
      document.body.style.overflow = "";
      setPaused(false);
    };
  }, [isMenuOpen, setPaused]);

  function handleBrandClick(event: MouseEvent<HTMLAnchorElement>) {
    if (window.location.pathname === "/") {
      event.preventDefault();
      setIsMenuOpen(false);
      scrollToTop();
      return;
    }

    setIsMenuOpen(false);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        isScrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container size="full">
        <nav
          className="flex h-16 items-center justify-between"
          aria-label="Primary"
        >
          <Link
            href="/"
            onClick={handleBrandClick}
            className="font-mono text-sm font-medium tracking-tight text-foreground"
          >
            {siteConfig.author.name}
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Button href="/#contact" size="sm">
              Get in touch
            </Button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              className="flex size-9 items-center justify-center rounded-md text-foreground hover:bg-muted"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-border bg-background md:hidden"
          >
            <Container size="full">
              <ul className="flex flex-col gap-1 py-4">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block rounded-md px-3 py-2.5 text-base text-foreground hover:bg-muted"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
