import type { NavItem } from "@/types";

/**
 * Central site configuration. Nav, metadata defaults, and social links
 * are defined once here so the Navbar, Footer, and page <head> stay
 * in sync without duplicating literals across components.
 */
export const siteConfig = {
  name: "Oluwafunmilayo Owolabi",
  title: "Oluwafunmilayo Owolabi — Frontend Developer",
  description:
    "Frontend developer with 3+ years of experience building clean, responsive web interfaces with React, Next.js, and Tailwind CSS.",
  url: "https://portfolio-op3k.vercel.app/",
  resumeUrl: "/resume.pdf",
  /** Inferred from the +234 phone country code — not stated explicitly anywhere; update to your exact city if you'd like. */
  location: "Nigeria",
  author: {
    name: "Oluwafunmilayo Owolabi",
  },
} as const;

export const navItems: NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export const socialLinks = {
  github: "https://github.com/dfunmi",
  githubUsername: "dfunmi",
  email: "mailto:damilolaowolabi55@gmail.com",
} as const;
