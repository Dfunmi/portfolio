import { Gauge, Accessibility, Sparkles, GraduationCap } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { AboutPhoto } from "./_components/AboutPhoto";

const philosophy = [
  {
    icon: Gauge,
    title: "Performance is a feature",
    description: "People shouldn't have to wait for a good experience. I build with performance and responsiveness in mind from day one.",
  },
  {
    icon: Accessibility,
    title: "Accessible by default",
    description: "Accessibility isn't something I add at the end—keyboard navigation, focus states, and WCAG-compliant contrast are built into my work from the very beginning.",
  },
  {
    icon: Sparkles,
    title: "Details compound",
    description: "The smallest details often make the biggest difference. Smooth transitions and stable layouts help create an experience people can trust.",
  },
] as const;

const education = [
  {
    degree: "MSc Chemistry",
    school: "University of Lagos",
    period: "2018 – 2020",
  },
  {
    degree: "BSc Industrial Chemistry",
    school: "Osun State University, Osogbo",
    period: "2011 – 2015",
  },
] as const;

const technicalSkills = ["HTML", "CSS", "Tailwind CSS", "React.js", "Next.js", "Git & Version Control"];
const softSkills = ["Attention to detail", "Communication", "Problem-solving", "Time management", "Eagerness to learn"];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      heading="More than a job title"
      description="A short version of how I got here, and how I work."
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-start">
        {/* Photo + floating stat badge */}
        <Reveal>
          <AboutPhoto />
        </Reveal>

        {/* Story + philosophy */}
        <div className="flex flex-col gap-10">
          <Reveal delay={0.05}>
            <Heading level={3} size="sm" className="mb-3">
              My story
            </Heading>
            <div className="flex flex-col gap-3">
              <Text variant="body" muted>
                My path here wasn&apos;t linear. I studied chemistry through a
                Master&apos;s degree before finding frontend development.
              </Text>
              <Text variant="body" muted>
                The precision and curiosity carried straight over. Three years in, I still care
                most about the details users never consciously notice.
              </Text>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Heading level={3} size="sm" className="mb-4">
              Frontend philosophy
            </Heading>
            <div className="grid gap-4 sm:grid-cols-3">
              {philosophy.map((item, index) => (
                <Reveal key={item.title} delay={0.14 + index * 0.06}>
                  <Card className="h-full">
                    <CardHeader>
                      <item.icon size={20} strokeWidth={1.75} className="mb-1 text-accent" />
                      <CardTitle className="text-base">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Education + core strengths */}
      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <Reveal delay={0.05}>
          <Heading level={3} size="sm" className="mb-4">
            Education
          </Heading>
          <div className="flex flex-col gap-4">
            {education.map((entry) => (
              <Card key={entry.degree} className="flex flex-row items-start gap-4">
                <GraduationCap size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <Text variant="body" className="font-medium">
                    {entry.degree}
                  </Text>
                  <Text variant="small" muted>
                    {entry.school} · {entry.period}
                  </Text>
                </div>
              </Card>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Heading level={3} size="sm" className="mb-4">
            Core strengths
          </Heading>
          <div className="flex flex-col gap-5">
            <div>
              <Text variant="caption" muted className="mb-2 font-mono uppercase tracking-wide">
                Technical
              </Text>
              <div className="flex flex-wrap gap-2">
                {technicalSkills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </div>
            <div>
              <Text variant="caption" muted className="mb-2 font-mono uppercase tracking-wide">
                Soft skills
              </Text>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
