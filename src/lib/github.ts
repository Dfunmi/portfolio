const GITHUB_API = "https://api.github.com";

export interface GithubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  followers: number;
  publicRepos: number;
  htmlUrl: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  htmlUrl: string;
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string;
}

export interface GithubEvent {
  id: string;
  type: string;
  repoName: string;
  repoUrl: string;
  createdAt: string;
}

export interface GithubData {
  profile: GithubProfile;
  repos: GithubRepo[];
  events: GithubEvent[];
}

/** Shapes of the raw GitHub REST API responses actually used below. */
interface GithubApiUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  followers: number;
  public_repos: number;
  html_url: string;
}

interface GithubApiRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
}

interface GithubApiEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
}

/**
 * Fetches profile, repos, and recent public activity in parallel.
 * Public GitHub REST endpoints support CORS and need no auth token, so
 * this runs client-side — each visitor's browser makes the request
 * against their own IP's unauthenticated rate limit (60/hour), rather
 * than concentrating load on one server-side IP.
 */
export async function fetchGithubData(username: string): Promise<GithubData> {
  const headers = { Accept: "application/vnd.github+json" };

  const [profileRes, reposRes, eventsRes] = await Promise.all([
    fetch(`${GITHUB_API}/users/${username}`, { headers }),
    fetch(`${GITHUB_API}/users/${username}/repos?sort=updated&per_page=6`, { headers }),
    fetch(`${GITHUB_API}/users/${username}/events/public?per_page=5`, { headers }),
  ]);

  if (!profileRes.ok) {
    throw new Error(
      profileRes.status === 403
        ? "GitHub API rate limit reached — try again shortly."
        : "Couldn't load GitHub profile."
    );
  }

  const profileJson = (await profileRes.json()) as GithubApiUser;
  const reposJson: GithubApiRepo[] = reposRes.ok ? await reposRes.json() : [];
  const eventsJson: GithubApiEvent[] = eventsRes.ok ? await eventsRes.json() : [];

  const profile: GithubProfile = {
    login: profileJson.login,
    name: profileJson.name,
    bio: profileJson.bio,
    avatarUrl: profileJson.avatar_url,
    followers: profileJson.followers,
    publicRepos: profileJson.public_repos,
    htmlUrl: profileJson.html_url,
  };

  const repos: GithubRepo[] = reposJson
    .filter((repo) => !repo.fork)
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      htmlUrl: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      updatedAt: repo.updated_at,
    }));

  const events: GithubEvent[] = eventsJson.map((event) => ({
    id: event.id,
    type: event.type,
    repoName: event.repo.name,
    repoUrl: `https://github.com/${event.repo.name}`,
    createdAt: event.created_at,
  }));

  return { profile, repos, events };
}

const EVENT_DESCRIPTIONS: Record<string, string> = {
  PushEvent: "Pushed to",
  CreateEvent: "Created",
  PullRequestEvent: "Opened a pull request in",
  IssuesEvent: "Opened an issue in",
  IssueCommentEvent: "Commented on an issue in",
  WatchEvent: "Starred",
  ForkEvent: "Forked",
  ReleaseEvent: "Published a release in",
};

export function describeEvent(type: string): string {
  return EVENT_DESCRIPTIONS[type] ?? "Was active in";
}

export interface LanguageShare {
  language: string;
  count: number;
  percentage: number;
}

/** Roughly official brand colors for the languages likely to show up here. */
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Python: "#3572a5",
  Shell: "#89e051",
};

export function getLanguageColor(language: string): string {
  return LANGUAGE_COLORS[language] ?? "var(--color-accent)";
}

/** Aggregates repo.language into sorted counts + percentage share. */
export function summarizeLanguages(repos: GithubRepo[]): LanguageShare[] {
  const counts = new Map<string, number>();
  for (const repo of repos) {
    if (!repo.language) continue;
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }

  const total = Array.from(counts.values()).reduce((sum, count) => sum + count, 0);

  return Array.from(counts.entries())
    .map(([language, count]) => ({
      language,
      count,
      percentage: total ? Math.round((count / total) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);
}
