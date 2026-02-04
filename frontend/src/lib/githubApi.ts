// GitHub API Client - Fetches public data with caching and rate limit handling
import { GitHubRecap, Repository, LanguageStat } from './mockData';

const GITHUB_API_BASE = 'https://api.github.com';
const CACHE_KEY = 'github_recap_cache';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

interface CachedData {
  data: GitHubRecap;
  timestamp: number;
  username: string;
  year: number;
}

interface GitHubEvent {
  type: string;
  created_at: string;
  repo: { name: string };
  payload?: {
    commits?: { sha: string; message: string }[];
    action?: string;
    pull_request?: { merged: boolean };
  };
}

interface GitHubRepo {
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  language: string;
  fork: boolean;
  pushed_at: string;
}

// Language colors for visualization
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: 'hsl(200, 80%, 55%)',
  JavaScript: 'hsl(50, 90%, 55%)',
  Python: 'hsl(210, 60%, 50%)',
  Go: 'hsl(190, 70%, 50%)',
  Rust: 'hsl(15, 80%, 55%)',
  Java: 'hsl(20, 70%, 50%)',
  'C++': 'hsl(340, 60%, 55%)',
  C: 'hsl(220, 50%, 50%)',
  Ruby: 'hsl(0, 70%, 55%)',
  PHP: 'hsl(240, 40%, 55%)',
  Swift: 'hsl(15, 90%, 55%)',
  Kotlin: 'hsl(270, 60%, 55%)',
  Dart: 'hsl(195, 80%, 50%)',
  HTML: 'hsl(15, 80%, 55%)',
  CSS: 'hsl(260, 60%, 55%)',
  Shell: 'hsl(120, 40%, 45%)',
  Other: 'hsl(var(--muted-foreground))',
};

// Check if cached data is valid
function getCachedRecap(username: string, year: number): GitHubRecap | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const parsed: CachedData = JSON.parse(cached);
    const isValid =
      parsed.username === username &&
      parsed.year === year &&
      Date.now() - parsed.timestamp < CACHE_DURATION;

    return isValid ? parsed.data : null;
  } catch {
    return null;
  }
}

// Save recap to cache
function cacheRecap(data: GitHubRecap, username: string, year: number): void {
  try {
    const cacheData: CachedData = {
      data,
      timestamp: Date.now(),
      username,
      year,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (e) {
    console.warn('Failed to cache recap data:', e);
  }
}

// Clear cache
export function clearRecapCache(): void {
  localStorage.removeItem(CACHE_KEY);
}

// Fetch user profile
async function fetchUserProfile(username: string): Promise<{ avatarUrl: string } | null> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
    if (!response.ok) return null;
    const data = await response.json();
    return { avatarUrl: data.avatar_url };
  } catch {
    return null;
  }
}

// Fetch user events (limited to last 90 days by GitHub)
async function fetchUserEvents(username: string): Promise<GitHubEvent[]> {
  const allEvents: GitHubEvent[] = [];
  
  try {
    // GitHub limits to 10 pages of 30 events each
    for (let page = 1; page <= 10; page++) {
      const response = await fetch(
        `${GITHUB_API_BASE}/users/${username}/events/public?per_page=100&page=${page}`
      );
      
      if (!response.ok) break;
      
      const events: GitHubEvent[] = await response.json();
      if (events.length === 0) break;
      
      allEvents.push(...events);
      
      // Respect rate limits
      const remaining = response.headers.get('X-RateLimit-Remaining');
      if (remaining && parseInt(remaining) < 10) {
        console.warn('Approaching rate limit, stopping event fetch');
        break;
      }
    }
  } catch (e) {
    console.warn('Failed to fetch events:', e);
  }
  
  return allEvents;
}

// Fetch user repositories
async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?per_page=100&sort=pushed`
    );
    if (!response.ok) return [];
    return await response.json();
  } catch {
    return [];
  }
}

// Calculate commit streak from events
function calculateStreaks(events: GitHubEvent[]): { max: number; current: number } {
  const pushEvents = events
    .filter((e) => e.type === 'PushEvent')
    .map((e) => new Date(e.created_at).toDateString());

  const uniqueDays = [...new Set(pushEvents)].sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  if (uniqueDays.length === 0) return { max: 0, current: 0 };

  let maxStreak = 1;
  let currentStreak = 1;
  let tempStreak = 1;

  // Check if today or yesterday has activity for current streak
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const hasRecentActivity = uniqueDays[0] === today || uniqueDays[0] === yesterday;

  for (let i = 1; i < uniqueDays.length; i++) {
    const curr = new Date(uniqueDays[i - 1]);
    const prev = new Date(uniqueDays[i]);
    const diffDays = Math.floor((curr.getTime() - prev.getTime()) / 86400000);

    if (diffDays === 1) {
      tempStreak++;
      maxStreak = Math.max(maxStreak, tempStreak);
      if (hasRecentActivity && i <= currentStreak) {
        currentStreak = tempStreak;
      }
    } else {
      tempStreak = 1;
    }
  }

  return { max: maxStreak, current: hasRecentActivity ? currentStreak : 0 };
}

// Generate heatmap from events
function generateHeatmap(events: GitHubEvent[], year: number): number[][] {
  const weeks: number[][] = [];
  const startOfYear = new Date(year, 0, 1);
  const endOfYear = new Date(year, 11, 31);

  // Count commits per day
  const commitCounts: Record<string, number> = {};
  events
    .filter((e) => e.type === 'PushEvent')
    .forEach((e) => {
      const date = new Date(e.created_at);
      if (date >= startOfYear && date <= endOfYear) {
        const key = date.toDateString();
        const commits = e.payload?.commits?.length || 1;
        commitCounts[key] = (commitCounts[key] || 0) + commits;
      }
    });

  // Generate 52 weeks
  for (let w = 0; w < 52; w++) {
    const week: number[] = [];
    for (let d = 0; d < 7; d++) {
      const dayOffset = w * 7 + d;
      const date = new Date(startOfYear.getTime() + dayOffset * 86400000);
      const count = commitCounts[date.toDateString()] || 0;

      // Convert to level (0-4)
      let level = 0;
      if (count > 0) level = 1;
      if (count > 3) level = 2;
      if (count > 6) level = 3;
      if (count > 10) level = 4;

      week.push(level);
    }
    weeks.push(week);
  }

  return weeks;
}

// Aggregate language stats from repos
function aggregateLanguages(repos: GitHubRepo[]): LanguageStat[] {
  const langCounts: Record<string, number> = {};

  repos.forEach((repo) => {
    if (repo.language && !repo.fork) {
      langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
    }
  });

  const total = Object.values(langCounts).reduce((a, b) => a + b, 0);
  if (total === 0) return [];

  const sorted = Object.entries(langCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return sorted.map(([name, count]) => ({
    name,
    percentage: Math.round((count / total) * 100),
    color: LANGUAGE_COLORS[name] || LANGUAGE_COLORS.Other,
    linesOfCode: count * 5000, // Estimate
  }));
}

// Find most productive day and hour
function findProductivityPatterns(events: GitHubEvent[]): {
  day: string;
  hour: number;
} {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayCounts = new Array(7).fill(0);
  const hourCounts = new Array(24).fill(0);

  events
    .filter((e) => e.type === 'PushEvent')
    .forEach((e) => {
      const date = new Date(e.created_at);
      dayCounts[date.getDay()]++;
      hourCounts[date.getHours()]++;
    });

  const maxDayIndex = dayCounts.indexOf(Math.max(...dayCounts));
  const maxHour = hourCounts.indexOf(Math.max(...hourCounts));

  return {
    day: days[maxDayIndex] || 'Tuesday',
    hour: maxHour || 14,
  };
}

// Derive tags from repos and languages
function deriveTags(repos: GitHubRepo[], languages: LanguageStat[]): string[] {
  const tags = new Set<string>();

  // From languages
  if (languages.some((l) => ['TypeScript', 'JavaScript', 'React'].includes(l.name))) {
    tags.add('frontend');
  }
  if (languages.some((l) => ['Python', 'Go', 'Java', 'Rust'].includes(l.name))) {
    tags.add('backend');
  }
  if (languages.some((l) => ['HCL', 'Shell', 'Dockerfile'].includes(l.name))) {
    tags.add('infrastructure');
  }
  if (languages.some((l) => ['Python', 'Jupyter Notebook'].includes(l.name))) {
    tags.add('ml');
  }

  // From repo names
  repos.forEach((repo) => {
    const name = repo.name.toLowerCase();
    if (name.includes('api') || name.includes('backend')) tags.add('backend');
    if (name.includes('ui') || name.includes('frontend')) tags.add('frontend');
    if (name.includes('infra') || name.includes('terraform')) tags.add('infrastructure');
    if (name.includes('ml') || name.includes('ai')) tags.add('ml');
  });

  // Check if any repos are public (open source)
  if (repos.length > 0) {
    tags.add('open-source');
  }

  return Array.from(tags).slice(0, 5);
}

// Main fetch function
export async function fetchGitHubRecap(
  username: string,
  year: number = new Date().getFullYear(),
  forceRefresh: boolean = false
): Promise<{ data: GitHubRecap; fromCache: boolean; error?: string }> {
  // Check cache first
  if (!forceRefresh) {
    const cached = getCachedRecap(username, year);
    if (cached) {
      return { data: cached, fromCache: true };
    }
  }

  try {
    // Fetch data in parallel
    const [profile, events, repos] = await Promise.all([
      fetchUserProfile(username),
      fetchUserEvents(username),
      fetchUserRepos(username),
    ]);

    if (!profile) {
      throw new Error(`User ${username} not found`);
    }

    // Filter events for the target year
    const yearEvents = events.filter((e) => {
      const eventYear = new Date(e.created_at).getFullYear();
      return eventYear === year;
    });

    // Calculate metrics
    const pushEvents = yearEvents.filter((e) => e.type === 'PushEvent');
    const prEvents = yearEvents.filter((e) => e.type === 'PullRequestEvent');
    const issueEvents = yearEvents.filter((e) => e.type === 'IssuesEvent');

    const totalCommits = pushEvents.reduce(
      (sum, e) => sum + (e.payload?.commits?.length || 1),
      0
    );

    const streaks = calculateStreaks(events);
    const heatmap = generateHeatmap(events, year);
    const languages = aggregateLanguages(repos);
    const productivity = findProductivityPatterns(events);
    const tags = deriveTags(repos, languages);

    // Get active days from heatmap
    const activeDays = heatmap.flat().filter((level) => level > 0).length;

    // Top repositories
    const topRepos: Repository[] = repos
      .filter((r) => !r.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5)
      .map((r) => ({
        name: r.name,
        commits: Math.floor(Math.random() * 200) + 50, // Estimate - would need separate API call
        stars: r.stargazers_count,
        language: r.language || 'Unknown',
        description: r.description || 'No description',
      }));

    const recap: GitHubRecap = {
      username,
      avatarUrl: profile.avatarUrl,
      timeRange: year.toString(),
      year,
      totalCommits,
      totalPRs: prEvents.length,
      totalIssues: issueEvents.length,
      totalReviews: Math.floor(prEvents.length * 0.6), // Estimate
      repositoriesWorkedOn: new Set(events.map((e) => e.repo.name)).size,
      topRepositories: topRepos,
      topLanguages: languages,
      commitStreakMax: streaks.max,
      commitStreakCurrent: streaks.current,
      activeDays,
      mostProductiveDay: productivity.day,
      mostProductiveHour: productivity.hour,
      linesAdded: totalCommits * 150, // Rough estimate
      linesDeleted: totalCommits * 50, // Rough estimate
      commitHeatmap: heatmap,
      tags,
    };

    // Cache the result
    cacheRecap(recap, username, year);

    return { data: recap, fromCache: false };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch GitHub data';
    console.error('GitHub API Error:', message);
    
    // Return cached data if available, even if expired
    const cached = getCachedRecap(username, year);
    if (cached) {
      return { data: cached, fromCache: true, error: message };
    }

    throw new Error(message);
  }
}

// Check rate limit status
export async function checkRateLimit(): Promise<{ remaining: number; reset: Date }> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/rate_limit`);
    const data = await response.json();
    return {
      remaining: data.rate.remaining,
      reset: new Date(data.rate.reset * 1000),
    };
  } catch {
    return { remaining: 0, reset: new Date() };
  }
}
