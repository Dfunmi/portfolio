import { siteConfig, socialLinks } from "@/config/site";

/**
 * schema.org Person structured data. Rendered as a JSON-LD <script> tag
 * in the root layout — Google explicitly supports JSON-LD anywhere in
 * the document body, not just <head>, so this doesn't need special
 * placement.
 */
export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    url: siteConfig.url,
    jobTitle: "Frontend Developer",
    description: siteConfig.description,
    sameAs: [socialLinks.github],
    knowsAbout: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript", "HTML", "CSS"],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "University of Lagos" },
      { "@type": "CollegeOrUniversity", name: "Osun State University" },
    ],
  };
}
