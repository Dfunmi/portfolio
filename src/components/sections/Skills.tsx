"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Smartphone,
  Accessibility,
  Search,
  Gauge,
  FileCode,
  Palette,
  Braces,
  Atom,
  Hexagon,
  Wind,
  LayoutGrid,
  GitBranch,
  Github,
  Figma,
  Triangle,
  Cloud,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { cn, focusRing } from "@/lib/utils";

interface Skill {
  name: string;
  description: string;
  icon: LucideIcon;
}

const categories = ["Frontend", "Languages", "Frameworks", "Styling", "Tools", "Deployment"] as const;
type Category = (typeof categories)[number];

const skillsByCategory: Record<Category, Skill[]> = {
  Frontend: [
    { name: "Responsive Design", description: "Mobile-first layouts that hold up on any screen.", icon: Smartphone },
    { name: "Accessibility", description: "WCAG-aware markup, keyboard nav, and focus handling.", icon: Accessibility },
    { name: "SEO", description: "On-page fundamentals for pages that actually get found.", icon: Search },
    { name: "Performance", description: "Chasing high Lighthouse scores, not just shipping features.", icon: Gauge },
  ],
  Languages: [
    // { name: "HTML", description: "Semantic, accessible markup as the foundation of every build.", icon: FileCode },
    // { name: "CSS", description: "Layout, animation, and the details browsers don't make easy.", icon: Palette },
    { name: "JavaScript (ES6+)", description: "Modern syntax, async patterns, array/object methods.", icon: Braces },
  ],
  Frameworks: [
    { name: "React.js", description: "Component architecture, hooks, and state that scales.", icon: Atom },
    { name: "Next.js", description: "App Router, Server Components, and production builds.", icon: Hexagon },
  ],
  Styling: [
    { name: "Tailwind CSS", description: "Utility-first styling without fighting a stylesheet.", icon: Wind },
    { name: "CSS Grid & Flexbox", description: "Layout systems for anything from a card to a full page.", icon: LayoutGrid },
  ],
  Tools: [
    { name: "Git & Version Control", description: "Branching, reviews, and a clean commit history.", icon: GitBranch },
    { name: "GitHub", description: "PRs, issues, and collaborating on real codebases.", icon: Github },
    { name: "Figma", description: "Translating designs into pixel-accurate interfaces.", icon: Figma },
  ],
  Deployment: [
    { name: "Vercel", description: "Shipping Next.js apps with zero-config deploys.", icon: Triangle },
    { name: "Netlify", description: "Static + JAMstack hosting for smaller builds.", icon: Cloud },
  ],
};

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <Card className="group h-full">
      <div
        className={cn(
          "flex size-11 items-center justify-center rounded-md border border-border bg-muted text-accent",
          "transition-transform duration-(--duration-base) ease-(--ease-signature)",
          "group-hover:-rotate-6 group-hover:scale-110"
        )}
      >
        <skill.icon size={20} strokeWidth={1.75} />
      </div>

      <Text variant="body" className="mt-4 font-medium">
        {skill.name}
      </Text>
      <Text variant="small" muted className="mt-1">
        {skill.description}
      </Text>
    </Card>
  );
}

/**
 * Client Component — the category tab bar needs local state, and since
 * that state lives at the Skills level, the whole section renders on the
 * client. (Section itself has no client-only behavior; the cost of
 * bundling it here is negligible next to the interactivity gained.)
 */
export function Skills() {
  const [active, setActive] = useState<Category>("Frontend");

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      heading="What I build with"
      description="Grouped by category — pick one to see the specifics."
    >
      <div role="tablist" aria-label="Skill categories" className="mb-10 flex flex-wrap justify-center gap-2">
        {categories.map((category) => {
          const isActive = category === active;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(category)}
              className={cn(
                "rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wide",
                "transition-colors duration-(--duration-fast)",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                focusRing
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div
        key={active}
        role="tabpanel"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {skillsByCategory[active].map((skill, index) => (
          <Reveal key={skill.name} trigger="mount" delay={index * 0.05}>
            <SkillCard skill={skill} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
