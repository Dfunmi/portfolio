"use client";

import { useState } from "react";
import Image from "next/image";
import { Github, ExternalLink, Target, Plus, Lock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Typography";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { cn, focusRing } from "@/lib/utils";
import { socialLinks } from "@/config/site";

type FilterCategory = "All" | "React" | "Next.js" | "Landing Pages" | "UI";
const filters: FilterCategory[] = ["All", "React", "Next.js", "Landing Pages", "UI"];

interface Project {
  title: string;
  description: string;
  categories: Exclude<FilterCategory, "All">[];
  technologies: string[];
  problem: string;
  previewImage: string;
  githubUrl?: string;
  liveUrl?: string;
  badge: { label: string; variant: "accent" | "neutral" };
}

const projects: Project[] = [
  {
    title: " Portfolio",
    description:
      "A performance-focused developer portfolio with a custom design system, dark mode, and scroll-driven animation.",
    categories: ["React", "Next.js", "UI"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    problem: "Needed a fast, accessible site that demonstrated frontend craft, not just described it.",
    previewImage: "/images/porfolio.png",
    githubUrl: socialLinks.github,
    badge: { label: "Personal Project", variant: "accent" },
  },

    {
    title: "Ucomeafrik Tours",
    description:
      "Contributed features to a West Africa tour operator's marketing site — email capture, a public reviews page, UI updates, and SEO work.",
    categories: ["Next.js", "Landing Pages", "UI"],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Brevo"],
    problem:
      "The client needed a modern, SEO-ready site with working email capture and a public reviews page to build trust with international travelers.",
    previewImage: "/images/ucomeafrik.png",
    liveUrl: "https://ucomeafrik.com/",
    badge: { label: "Client Contribution", variant: "neutral" },
  },

  {
  title: "Evans Travel & Tours",
  description:
    "Contributed to a West Africa tour operator's site: email notifications, tour package pages, destination pages, and the contact page.",
  categories: ["React", "Next.js", "Landing Pages", "UI"],
  technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Brevo"],
  problem:
    "The operator needed automated booking email notifications and dedicated pages for tour packages, destinations, and contact to support a growing multi-country catalog.",
  previewImage: "/images/evans.png",
  liveUrl: "https://www.evans-tours.com/en",
  badge: { label: "Client Contribution", variant: "neutral" },
},

];

function ProjectCard({ project }: { project: Project }) {
  const hasLinks = project.githubUrl || project.liveUrl;

  return (
    <Card className="flex h-full flex-col overflow-hidden p-0">
      {/* Screenshot placeholder — zooms and reveals an animated overlay on hover */}
      <div className="group relative aspect-[16/10] overflow-hidden border-b border-border bg-muted sm:aspect-video">
        <Image
          src={project.previewImage}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-(--ease-signature) group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent" />

        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center gap-3 bg-ink-950/70 opacity-0",
            "transition-opacity duration-(--duration-base) group-hover:opacity-100"
          )}
        >
          {hasLinks ? (
            <>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} source on GitHub`}
                  className={cn(
                    "flex size-11 translate-y-2 items-center justify-center rounded-full bg-paper-50/10 text-paper-50",
                    "opacity-0 backdrop-blur-sm transition-all duration-(--duration-base)",
                    "group-hover:translate-y-0 group-hover:opacity-100 hover:bg-paper-50/20",
                    focusRing
                  )}
                >
                  <Github size={18} strokeWidth={1.75} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} live demo`}
                  className={cn(
                    "flex size-11 translate-y-2 items-center justify-center rounded-full bg-paper-50/10 text-paper-50",
                    "opacity-0 backdrop-blur-sm transition-all delay-75 duration-(--duration-base)",
                    "group-hover:translate-y-0 group-hover:opacity-100 hover:bg-paper-50/20",
                    focusRing
                  )}
                >
                  <ExternalLink size={18} strokeWidth={1.75} />
                </a>
              )}
            </>
          ) : (
            <span className="flex translate-y-2 items-center gap-2 rounded-full bg-paper-50/10 px-4 py-2 text-xs text-paper-50 opacity-0 backdrop-blur-sm transition-all duration-(--duration-base) group-hover:translate-y-0 group-hover:opacity-100">
              <Lock size={13} strokeWidth={1.75} />
              Private client project
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <CardHeader>
          <Badge variant={project.badge.variant} className="mb-2 w-fit">
            {project.badge.label}
          </Badge>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>

        <div className="mb-5 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="neutral">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex items-start gap-2.5 border-t border-border pt-4">
          <Target size={14} strokeWidth={1.75} className="mt-0.5 shrink-0 text-accent" />
          <Text variant="small" muted>
            <span className="font-medium text-foreground">Problem solved: </span>
            {project.problem}
          </Text>
        </div>
      </div>
    </Card>
  );
}

function AddProjectCard() {
  return (
    <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border p-5 text-center sm:min-h-[420px] sm:p-6">
      <span className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Plus size={18} strokeWidth={1.75} />
      </span>
      <Text variant="small" muted>
        Upcoming projects will be added here. Check back soon!
      </Text>
    </div>
  );
}

export function Work() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.categories.includes(activeFilter));

  return (
    <Section
      id="work"
      eyebrow="Work"
      heading="Selected work"
      description="A mix of shipped client solutions and personal builds shaped around UX, speed, and clarity."
    >
      <div role="tablist" aria-label="Filter projects" className="mb-8 flex flex-wrap justify-center gap-2 sm:mb-10">
        {filters.map((filter) => {
          const isActive = filter === activeFilter;
          return (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "rounded-full px-3 py-2 font-mono text-xs uppercase tracking-wide sm:px-4",
                "transition-colors duration-(--duration-fast)",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                focusRing
              )}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div key={activeFilter} className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <Reveal key={project.title} trigger="mount" delay={index * 0.08}>
            <ProjectCard project={project} />
          </Reveal>
        ))}

        {activeFilter === "All" && (
          <Reveal trigger="mount" delay={filteredProjects.length * 0.08}>
            <AddProjectCard />
          </Reveal>
        )}
      </div>

      {filteredProjects.length === 0 && (
        <Text variant="body" muted className="mt-8 text-center sm:mt-10">
          No projects tagged &ldquo;{activeFilter}&rdquo; yet — check back soon.
        </Text>
      )}

      <Reveal delay={0.1}>
        <Text variant="small" muted className="mt-8 text-center sm:mt-10">
          Want to see more?{" "}
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            Browse my GitHub
          </a>
        </Text>
      </Reveal>
    </Section>
  );
}
