// Mock GitHub Recap Data for MVP visualization
export interface GitHubRecap {
  username: string;
  avatarUrl: string;
  timeRange: string;
  year: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalReviews: number;
  repositoriesWorkedOn: number;
  topRepositories: Repository[];
  topLanguages: LanguageStat[];
  commitStreakMax: number;
  commitStreakCurrent: number;
  activeDays: number;
  mostProductiveDay: string;
  mostProductiveHour: number;
  linesAdded: number;
  linesDeleted: number;
  commitHeatmap: number[][];
  tags: string[];
}

export interface Repository {
  name: string;
  commits: number;
  stars: number;
  language: string;
  description: string;
}

export interface LanguageStat {
  name: string;
  percentage: number;
  color: string;
  linesOfCode: number;
}

// Generate realistic heatmap data (52 weeks x 7 days)
const generateHeatmap = (): number[][] => {
  const weeks: number[][] = [];
  for (let w = 0; w < 52; w++) {
    const week: number[] = [];
    for (let d = 0; d < 7; d++) {
      // More realistic distribution with some patterns
      const isWeekend = d === 0 || d === 6;
      const baseChance = isWeekend ? 0.3 : 0.7;
      const hasActivity = Math.random() < baseChance;
      
      if (!hasActivity) {
        week.push(0);
      } else {
        const level = Math.floor(Math.random() * 4) + 1;
        week.push(level);
      }
    }
    weeks.push(week);
  }
  return weeks;
};

export const mockRecapData: GitHubRecap = {
  username: "nishur31",
  avatarUrl: "https://github.com/nishur31.png",
  timeRange: "2025",
  year: 2025,
  totalCommits: 1847,
  totalPRs: 234,
  totalIssues: 89,
  totalReviews: 156,
  repositoriesWorkedOn: 42,
  topRepositories: [
    {
      name: "recap-engine",
      commits: 342,
      stars: 128,
      language: "TypeScript",
      description: "Personal analytics and recap generation system",
    },
    {
      name: "ml-pipeline",
      commits: 287,
      stars: 89,
      language: "Python",
      description: "Machine learning data processing infrastructure",
    },
    {
      name: "ui-components",
      commits: 198,
      stars: 234,
      language: "TypeScript",
      description: "Reusable React component library with design system",
    },
    {
      name: "api-gateway",
      commits: 156,
      stars: 67,
      language: "Go",
      description: "High-performance API gateway service",
    },
    {
      name: "infra-as-code",
      commits: 123,
      stars: 45,
      language: "HCL",
      description: "Terraform modules for cloud infrastructure",
    },
  ],
  topLanguages: [
    { name: "TypeScript", percentage: 42, color: "hsl(200, 80%, 55%)", linesOfCode: 156000 },
    { name: "Python", percentage: 28, color: "hsl(45, 90%, 55%)", linesOfCode: 98000 },
    { name: "Go", percentage: 15, color: "hsl(190, 70%, 50%)", linesOfCode: 52000 },
    { name: "Rust", percentage: 8, color: "hsl(15, 80%, 55%)", linesOfCode: 28000 },
    { name: "Other", percentage: 7, color: "hsl(var(--muted-foreground))", linesOfCode: 24000 },
  ],
  commitStreakMax: 67,
  commitStreakCurrent: 23,
  activeDays: 287,
  mostProductiveDay: "Tuesday",
  mostProductiveHour: 14,
  linesAdded: 358420,
  linesDeleted: 142890,
  commitHeatmap: generateHeatmap(),
  tags: ["backend", "frontend", "infrastructure", "ml", "open-source"],
};
