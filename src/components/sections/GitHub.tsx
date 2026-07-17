"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, GitFork, ExternalLink, AlertTriangle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Skeleton, SkeletonText, SkeletonCard } from "@/components/ui/Skeleton";
import { socialLinks } from "@/config/site";
import { formatRelativeTime } from "@/lib/utils";
import {
  fetchGithubData,
  summarizeLanguages,
  describeEvent,
  getLanguageColor,
  type GithubData,
} from "@/lib/github";

type Status = "loading" | "success" | "error";

function ProfileSkeleton() {
  return (
    <Card className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
      <Skeleton className="size-20 shrink-0 rounded-full" />
      <div className="flex-1">
        <Skeleton className="mb-2 h-5 w-40" />
        <SkeletonText lines={2} className="mx-auto sm:mx-0" />
      </div>
    </Card>
  );
}

export function GitHub() {
  const [status, setStatus] = useState<Status>("loading");
  const [data, setData] = useState<GithubData | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetchGithubData(socialLinks.githubUsername)
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setStatus("success");
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setErrorMessage(error instanceof Error ? error.message : "Couldn't load GitHub data.");
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const languages = data ? summarizeLanguages(data.repos) : [];
  const totalStars = data ? data.repos.reduce((sum, repo) => sum + repo.stars, 0) : 0;

  return (
    <Section
      id="github"
      eyebrow="GitHub"
      heading="Open source & activity"
      description="Live from my GitHub profile — this updates automatically, not a snapshot."
    >
      {status === "error" && (
        <Card className="mx-auto flex max-w-lg flex-col items-center gap-3 text-center">
          <AlertTriangle size={22} className="text-warning" strokeWidth={1.75} />
          <Text variant="body">{errorMessage}</Text>
          <Button href={socialLinks.github} external variant="secondary" size="sm">
            View profile on GitHub
          </Button>
        </Card>
      )}

      {status !== "error" && (
        <div className="flex flex-col gap-10">
          {/* Profile + animated counters */}
          {status === "loading" || !data ? (
            <ProfileSkeleton />
          ) : (
            <Reveal>
              <Card className="flex flex-col items-center gap-6 sm:flex-row">
                <Image
                  src={data.profile.avatarUrl}
                  alt={`${data.profile.login}'s GitHub avatar`}
                  width={80}
                  height={80}
                  className="shrink-0 rounded-full border border-border"
                />
                <div className="flex-1 text-center sm:text-left">
                  <Heading level={3} size="sm">
                    {data.profile.name ?? data.profile.login}
                  </Heading>
                  <Text variant="small" muted className="mt-1">
                    {data.profile.bio ?? `@${data.profile.login} on GitHub`}
                  </Text>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <Heading level={3} size="md" className="text-accent">
                      <AnimatedCounter value={data.profile.followers} />
                    </Heading>
                    <Text variant="caption" muted>
                      Followers
                    </Text>
                  </div>
                  <div className="text-center">
                    <Heading level={3} size="md" className="text-accent">
                      <AnimatedCounter value={data.profile.publicRepos} />
                    </Heading>
                    <Text variant="caption" muted>
                      Repositories
                    </Text>
                  </div>
                  <div className="text-center">
                    <Heading level={3} size="md" className="text-accent">
                      <AnimatedCounter value={totalStars} />
                    </Heading>
                    <Text variant="caption" muted>
                      Stars
                    </Text>
                  </div>
                </div>
              </Card>
            </Reveal>
          )}

          {/* Contribution graph — third-party unofficial chart (ghchart.rshah.org), no auth required */}
          <Reveal delay={0.05}>
            <Card>
              <Text variant="caption" muted className="mb-3 font-mono uppercase tracking-wide">
                Contribution graph
              </Text>
              {status === "loading" ? (
                <Skeleton className="h-32 w-full" />
              ) : (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element -- external SVG chart, not a Next-optimizable asset */}
                  <img
                    src={`https://ghchart.rshah.org/6e56cf/${socialLinks.githubUsername}`}
                    alt={`${socialLinks.githubUsername}'s GitHub contribution graph`}
                    className="w-full"
                    loading="lazy"
                  />
                  <Text variant="caption" muted className="mt-2">
                    Chart via ghchart.rshah.org
                  </Text>
                </>
              )}
            </Card>
          </Reveal>

          {/* Most used languages — stacked bar, mirroring GitHub's own repo language bar */}
          <Reveal delay={0.1}>
            <Card>
              <Text variant="caption" muted className="mb-4 font-mono uppercase tracking-wide">
                Most used languages
              </Text>
              {status === "loading" ? (
                <SkeletonText lines={3} />
              ) : languages.length === 0 ? (
                <Text variant="small" muted>
                  Not enough public repo data to summarize yet.
                </Text>
              ) : (
                <>
                  <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
                    {languages.map((entry) => (
                      <div
                        key={entry.language}
                        style={{ width: `${entry.percentage}%`, backgroundColor: getLanguageColor(entry.language) }}
                      />
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                    {languages.map((entry) => (
                      <div key={entry.language} className="flex items-center gap-2">
                        <span
                          className="size-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: getLanguageColor(entry.language) }}
                        />
                        <Text variant="small" muted>
                          {entry.language} · {entry.percentage}%
                        </Text>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </Card>
          </Reveal>

          {/* Repository cards */}
          <div>
            <Text variant="caption" muted className="mb-4 font-mono uppercase tracking-wide">
              Recent repositories
            </Text>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {status === "loading" || !data
                ? Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
                : data.repos.map((repo, index) => (
                    <Reveal key={repo.id} delay={index * 0.06}>
                      <Card className="flex h-full flex-col">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-base">{repo.name}</CardTitle>
                            <a
                              href={repo.htmlUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Open ${repo.name} on GitHub`}
                              className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                            >
                              <ExternalLink size={15} strokeWidth={1.75} />
                            </a>
                          </div>
                          <CardDescription className="line-clamp-2">
                            {repo.description ?? "No description provided."}
                          </CardDescription>
                        </CardHeader>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            {repo.language && (
                              <span className="flex items-center gap-1.5">
                                <span
                                  className="size-2 rounded-full"
                                  style={{ backgroundColor: getLanguageColor(repo.language) }}
                                />
                                {repo.language}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Star size={12} strokeWidth={1.75} />
                              {repo.stars}
                            </span>
                            <span className="flex items-center gap-1">
                              <GitFork size={12} strokeWidth={1.75} />
                              {repo.forks}
                            </span>
                          </div>
                        </div>
                        <Text variant="caption" muted className="mt-2">
                          Updated {formatRelativeTime(repo.updatedAt)}
                        </Text>
                      </Card>
                    </Reveal>
                  ))}
            </div>
          </div>

          {/* Recent activity — reuses the Timeline primitive built for Experience */}
          <div>
            <Text variant="caption" muted className="mb-4 font-mono uppercase tracking-wide">
              Recent activity
            </Text>
            {status === "loading" || !data ? (
              <SkeletonText lines={4} />
            ) : data.events.length === 0 ? (
              <Text variant="small" muted>
                No recent public activity.
              </Text>
            ) : (
              <ol className="flex flex-col gap-4 border-l border-border pl-6">
                {data.events.map((event, index) => (
                  <Reveal key={event.id} delay={index * 0.06}>
                    <li className="relative">
                      <span className="absolute -left-[1.65rem] top-4 size-2 rounded-full bg-muted-foreground/50" />
                      <Card className="py-3.5">
                        <Text variant="small">
                          {describeEvent(event.type)}{" "}
                          <a
                            href={event.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-accent hover:underline"
                          >
                            {event.repoName}
                          </a>
                        </Text>
                        <Text variant="caption" muted className="mt-1">
                          {formatRelativeTime(event.createdAt)}
                        </Text>
                      </Card>
                    </li>
                  </Reveal>
                ))}
              </ol>
            )}
          </div>
        </div>
      )}
    </Section>
  );
}
