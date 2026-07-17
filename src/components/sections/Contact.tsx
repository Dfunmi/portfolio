"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Mail, Github, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Heading, Text, Code } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Reveal } from "@/components/ui/Reveal";
import { FloatingShapes } from "@/components/ui/FloatingShapes";
import { socialLinks, siteConfig } from "@/config/site";
import { cn, focusRing } from "@/lib/utils";
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";

type SubmitState = "idle" | "submitting" | "sent" | "error";

function ContactLinkRow({
  href,
  icon: Icon,
  label,
  external = false,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-md border border-border bg-surface px-4 py-3",
        "text-sm text-foreground transition-colors hover:bg-muted",
        focusRing
      )}
    >
      <Icon size={17} strokeWidth={1.75} className="text-accent" />
      {label}
    </a>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <Card className="flex flex-col items-center gap-3 py-12 text-center">
      <motion.span
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="flex size-12 items-center justify-center rounded-full bg-success-subtle text-success"
      >
        <CheckCircle2 size={26} strokeWidth={1.75} />
      </motion.span>
      <Text variant="body" className="font-medium">
        Message sent successfully
      </Text>
      <Text variant="small" muted className="max-w-xs">
        Thanks for reaching out. I&apos;ll get back to you soon.
      </Text>
      <Button variant="ghost" size="sm" onClick={onReset}>
        Send another message
      </Button>
    </Card>
  );
}

function ErrorState({ message, onReset }: { message?: string; onReset: () => void }) {
  return (
    <Card className="flex flex-col items-center gap-3 py-12 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-danger/10 text-danger">
        <AlertCircle size={26} strokeWidth={1.75} />
      </span>
      <Text variant="body" className="font-medium">
        Something went wrong
      </Text>
      <Text variant="small" muted className="max-w-xs">
        {message ?? "Your message could not be sent right now. Please reach out directly at"} {" "}
        <Code>{socialLinks.email.replace("mailto:", "")}</Code>.
      </Text>
      <Button variant="ghost" size="sm" onClick={onReset}>
        Try again
      </Button>
    </Card>
  );
}

function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
  });

  async function onSubmit(values: ContactFormValues) {
    setSubmitState("submitting");
    setServerError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.error || "Unable to send message");
      }

      reset();
      setSuccessMessage("Message sent successfully. I’ll get back to you soon.");
      setSubmitState("idle");
    } catch (error) {
      setSubmitState("error");
      setServerError(error instanceof Error ? error.message : "Unable to send message");
    }
  }

  return (
    <AnimatePresence mode="wait">
      {submitState === "sent" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <SuccessState onReset={() => setSubmitState("idle")} />
        </motion.div>
      ) : submitState === "error" ? (
        <motion.div
          key="error"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <ErrorState message={serverError ?? undefined} onReset={() => setSubmitState("idle")} />
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="flex flex-col gap-5">
            <Input
              id="contact-name"
              label="Name"
              placeholder="Ada Smith"
              required
              error={errors.name?.message}
              {...register("name")}
            />
            <Input
              id="contact-email"
              type="email"
              label="Email"
              placeholder="ada@example.com"
              required
              error={errors.email?.message}
              {...register("email")}
            />
            <Textarea
              id="contact-message"
              label="Message"
              placeholder="Tell me about your project…"
              required
              rows={5}
              error={errors.message?.message}
              {...register("message")}
            />

            {successMessage && (
              <div className="rounded-md border border-success/20 bg-success-subtle px-3 py-2 text-sm text-success">
                {successMessage}
              </div>
            )}

            <Button type="submit" icon={<Send size={15} />} loading={isSubmitting || submitState === "submitting"}>
              Send message
            </Button>
          </Card>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export function Contact() {
  return (
    <div className="relative overflow-hidden">
      <FloatingShapes variant="subtle" />
      <Section
        id="contact"
        eyebrow="Contact"
        heading="Let's build something"
        description="Open to new opportunities, reach out directly or send a message."
      >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <Reveal>
          <div className="flex flex-col gap-6 rounded-2xl border border-border/70 bg-surface/70 p-6 shadow-sm backdrop-blur sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="success" dot>
                Available for new projects
              </Badge>
              <Badge variant="neutral">
                <MapPin size={11} strokeWidth={2} className="mr-1" />
                {siteConfig.location}
              </Badge>
            </div>

            <div>
              <Heading level={3} size="sm" className="mb-2">
                Prefer email?
              </Heading>
              <Text variant="body" muted>
                I usually reply within a day or two.
              </Text>
            </div>

            <div className="flex flex-col gap-2">
              <ContactLinkRow href={socialLinks.email} icon={Mail} label={socialLinks.email.replace("mailto:", "")} />
              <ContactLinkRow
                href={socialLinks.github}
                icon={Github}
                label={socialLinks.github.replace("https://", "")}
                external
              />
            </div>

            <Text variant="caption" muted>
              Prefer to keep it short?{" "}
              <Code>{socialLinks.email.replace("mailto:", "")}</Code> reaches me directly.
            </Text>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-2xl border border-border/70 bg-surface/70 p-2 shadow-sm backdrop-blur sm:p-3">
            <ContactForm />
          </div>
        </Reveal>
      </div>
      </Section>
    </div>
  );
}
