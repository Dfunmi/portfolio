import { Section } from "@/components/ui/Section";
import { Timeline, TimelineItem } from "@/components/ui/Timeline";

const experience = [
  {
    company: "Arcanum Lab",
    role: "Frontend Developer",
    duration: "2024 — Present",
    current: true,
    responsibilities: [
      "Build and maintain responsive landing pages and marketing websites with React.js and Tailwind CSS.",
      "Translate Figma designs into pixel-perfect, cross-browser interfaces.",
      "Integrate form handling, email capture, and GA4 analytics for conversion-focused campaigns.",
    ],
    achievements: [
      "Achieved consistently high Lighthouse performance scores across delivered pages.",
      "Delivered pages following on-page SEO and WCAG accessibility best practices.",
    ],
    technologies: ["React.js", "Tailwind CSS", "JavaScript", "GA4", "Figma"],
  },
  {
    company: "Univelcity",
    role: "Full Stack Intern",
    duration: "2023",
    current: false,
    responsibilities: [
      "Developed UI features using HTML, CSS, JavaScript, React.js, Next.js, and Tailwind CSS.",
      "Participated in the full development lifecycle, from idea to deployment.",
      "Collaborated with senior developers and engaged in regular code reviews.",
    ],
    achievements: [
      "Learned production best practices and software architecture directly from senior engineers.",
      "Strengthened code quality through consistent review feedback.",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "React.js", "Next.js", "Tailwind CSS"],
  },
] as const;

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      heading="Where I've worked"
      description="Two roles, one throughline — shipping clean, accessible interfaces."
    >
      <Timeline>
        {experience.map((entry, index) => (
          <TimelineItem key={entry.company} index={index} {...entry} />
        ))}
      </Timeline>
    </Section>
  );
}
