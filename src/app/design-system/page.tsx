import { Github, Search, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading, Text, Code, Kbd } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Tag } from "@/components/ui/Tag";
import { Skeleton, SkeletonText, SkeletonCard } from "@/components/ui/Skeleton";
import { Reveal } from "@/components/ui/Reveal";
import { RemovableTagDemo } from "./_components/RemovableTagDemo";

// Internal QA page, not public content — kept out of search results.
export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

const colorSwatches = [
  { className: "bg-background", label: "Background" },
  { className: "bg-surface", label: "Surface" },
  { className: "bg-muted", label: "Muted" },
  { className: "bg-border", label: "Border" },
  { className: "bg-accent", label: "Accent" },
  { className: "bg-success", label: "Success" },
  { className: "bg-warning", label: "Warning" },
  { className: "bg-danger", label: "Danger" },
  { className: "bg-info", label: "Info" },
] as const;

const radiusTokens = [
  { className: "rounded-xs", label: "xs · 4px" },
  { className: "rounded-sm", label: "sm · 6px" },
  { className: "rounded-md", label: "md · 10px" },
  { className: "rounded-lg", label: "lg · 16px" },
  { className: "rounded-xl", label: "xl · 24px" },
] as const;

const shadowTokens = [
  { className: "shadow-xs", label: "xs" },
  { className: "shadow-sm", label: "sm" },
  { className: "shadow-md", label: "md" },
  { className: "shadow-lg", label: "lg" },
] as const;

/**
 * Internal QA surface — not a site page. Renders every design-system
 * token and primitive together so states (hover/focus/loading/dark mode)
 * can be checked in one place before they're used in real pages.
 */
export default function DesignSystemPage() {
  return (
    <div>
      <Section
        eyebrow="Design System"
        heading="One system, every surface"
        description="Tokens and primitives shared across the whole site — this page exists for review, not as public content."
      />

      {/* ---------------------------------------------------------------- */}
      <Section eyebrow="Color" heading="Palette">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {colorSwatches.map((swatch) => (
            <div key={swatch.className}>
              <div className={`h-20 rounded-md border border-border ${swatch.className}`} />
              <Text variant="small" muted className="mt-2 font-mono">
                {swatch.label}
              </Text>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section eyebrow="Type" heading="Typography scale">
        <div className="flex flex-col gap-6">
          <Heading size="display">Display heading</Heading>
          <Heading size="xl">Extra-large heading</Heading>
          <Heading size="lg">Large heading</Heading>
          <Heading size="md">Medium heading</Heading>
          <Heading size="sm">Small heading</Heading>
          <Text variant="lead">
            Lead paragraph — used for section intros, sits between body and heading weight.
          </Text>
          <Text variant="body">
            Body text is the default reading size across the site, set at a comfortable
            line-height for long-form content.
          </Text>
          <Text variant="small" muted>
            Small, muted text — captions, metadata, secondary detail.
          </Text>
          <div className="flex flex-wrap items-center gap-3">
            <Text variant="body" as="span">
              Inline code:
            </Text>
            <Code>const accent = &quot;#6E56CF&quot;</Code>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section eyebrow="Layout" heading="Radius & shadow">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <Text variant="small" muted className="mb-3 font-mono uppercase tracking-wide">
              Radius
            </Text>
            <div className="flex flex-wrap gap-4">
              {radiusTokens.map((token) => (
                <div key={token.className} className="text-center">
                  <div className={`size-16 border border-border bg-muted ${token.className}`} />
                  <Text variant="caption" muted className="mt-2">
                    {token.label}
                  </Text>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Text variant="small" muted className="mb-3 font-mono uppercase tracking-wide">
              Shadow
            </Text>
            <div className="flex flex-wrap gap-4">
              {shadowTokens.map((token) => (
                <div key={token.className} className="text-center">
                  <div className={`size-16 rounded-md bg-surface ${token.className}`} />
                  <Text variant="caption" muted className="mt-2">
                    {token.label}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section eyebrow="Actions" heading="Buttons">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button icon={<Sparkles size={16} />}>With icon</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <IconButton icon={<Search size={16} />} aria-label="Search" variant="surface" />
            <IconButton icon={<Github size={16} />} aria-label="View source" variant="ghost" />
          </div>
          <Text variant="caption" muted>
            Tab to any button above to see the shared focus ring — the same treatment used on
            every interactive primitive in this system.
          </Text>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section eyebrow="Surfaces" heading="Cards">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <Card interactive>
              <CardHeader>
                <Badge variant="accent" className="mb-2 w-fit">
                  Featured
                </Badge>
                <CardTitle>Interactive card</CardTitle>
                <CardDescription>Focusable and clickable — try tabbing to it.</CardDescription>
              </CardHeader>
              <CardContent>Hover lifts it 4px; focus shows the accent ring.</CardContent>
              <CardFooter>
                <Button size="sm" variant="secondary">
                  View
                </Button>
              </CardFooter>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <Card>
              <CardHeader>
                <CardTitle>Static card</CardTitle>
                <CardDescription>No interactive prop — hover-only feedback.</CardDescription>
              </CardHeader>
              <CardContent>Standard elevation, shadow-xs resting, shadow-md on hover.</CardContent>
            </Card>
          </Reveal>
          <Reveal delay={0.16}>
            <SkeletonCard />
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section eyebrow="Forms" heading="Inputs">
        <div className="grid max-w-2xl gap-6 sm:grid-cols-2">
          <Input id="demo-name" label="Name" placeholder="Ada Lovelace" required />
          <Input
            id="demo-search"
            label="Search"
            placeholder="Search projects…"
            icon={<Search size={16} />}
          />
          <Input
            id="demo-email"
            label="Email"
            type="email"
            defaultValue="not-an-email"
            error="Enter a valid email address"
          />
          <Input
            id="demo-role"
            label="Role"
            placeholder="Frontend Engineer"
            helperText="Shown on your public profile"
          />
          <Textarea
            id="demo-message"
            label="Message"
            placeholder="Say hello…"
            wrapperClassName="sm:col-span-2"
          />
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section eyebrow="Metadata" heading="Badges & tags">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Neutral</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="success" dot>
              Live
            </Badge>
            <Badge variant="warning">Beta</Badge>
            <Badge variant="danger">Deprecated</Badge>
            <Badge variant="info">New</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Tag selected>TypeScript</Tag>
            <Tag>React</Tag>
            <Tag>Next.js</Tag>
            <RemovableTagDemo />
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section eyebrow="State" heading="Loading skeletons">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-1/2" />
            <SkeletonText lines={3} />
          </div>
          <SkeletonCard />
        </div>
      </Section>

      <Container size="lg" className="pb-24">
        <Text variant="caption" muted>
          Toggle dark mode from the navbar to verify every token above adapts — shadows go
          border-led, status colors shift to their dark-safe values, and contrast holds.
        </Text>
      </Container>
    </div>
  );
}
