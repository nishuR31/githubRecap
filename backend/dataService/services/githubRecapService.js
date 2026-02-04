import axios from "axios";
import errorResponse from "../../sharedService/response/error.js";
import codes from "../../sharedService/utils/codes.js";

/**
 * Fetches comprehensive GitHub user data for year-in-review
 * @param {string} username - GitHub username
 * @param {string} token - GitHub personal access token
 * @param {number} year - Year to fetch data for
 * @returns {Promise<Object>} Comprehensive GitHub recap data
 */
const fetchGitHubRecapData = async (username, token, year) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  try {
    // Date range for the specified year
    const startDate = `${year}-01-01T00:00:00Z`;
    const endDate = `${year}-12-31T23:59:59Z`;

    // Parallel API calls to GitHub
    const [userProfile, userRepos, userEvents, userCommits] = await Promise.all(
      [
        // 1. User profile data
        axios
          .get(`https://api.github.com/users/${username}`, { headers })
          .then((res) => res.data)
          .catch(() => null),

        // 2. User repositories created/updated in the year
        axios
          .get(`https://api.github.com/users/${username}/repos`, {
            headers,
            params: {
              sort: "updated",
              per_page: 100,
              type: "all",
            },
          })
          .then((res) =>
            res.data.filter((repo) => {
              const created = new Date(repo.created_at);
              const updated = new Date(repo.updated_at);
              return (
                (created >= new Date(startDate) &&
                  created <= new Date(endDate)) ||
                (updated >= new Date(startDate) && updated <= new Date(endDate))
              );
            }),
          )
          .catch(() => []),

        // 3. User public events in the year
        axios
          .get(`https://api.github.com/users/${username}/events/public`, {
            headers,
            params: { per_page: 100 },
          })
          .then((res) =>
            res.data.filter((event) => {
              const eventDate = new Date(event.created_at);
              return (
                eventDate >= new Date(startDate) &&
                eventDate <= new Date(endDate)
              );
            }),
          )
          .catch(() => []),

        // 4. Search for user commits in the year
        axios
          .get(`https://api.github.com/search/commits`, {
            headers,
            params: {
              q: `author:${username} committer-date:${year}-01-01..${year}-12-31`,
              per_page: 100,
            },
          })
          .then((res) => res.data.items || [])
          .catch(() => []),
      ],
    );

    // Calculate statistics
    const stats = calculateYearStats(
      userProfile,
      userRepos,
      userEvents,
      userCommits,
      year,
    );

    return {
      username,
      year,
      profile: userProfile,
      repositories: userRepos,
      events: userEvents,
      commits: userCommits,
      stats,
      fetchedAt: new Date().toISOString(),
    };
  } catch (error) {
    if (error.response?.status === 401) {
      throw errorResponse(
        "Invalid GitHub token",
        codes.unauthorized,
        error.message,
      );
    }
    if (error.response?.status === 404) {
      throw errorResponse(
        "GitHub user not found",
        codes.notFound,
        error.message,
      );
    }
    if (error.response?.status === 403) {
      throw errorResponse(
        "GitHub API rate limit exceeded",
        codes.forbidden,
        error.message,
      );
    }
    throw errorResponse(
      "Failed to fetch GitHub data",
      codes.internalServerError,
      error.message,
    );
  }
};

/**
 * Calculate comprehensive statistics from GitHub data
 */
const calculateYearStats = (profile, repos, events, commits, year) => {
  // Repositories stats
  const reposCreated = repos.filter(
    (r) => new Date(r.created_at).getFullYear() === year,
  ).length;
  const totalStars = repos.reduce(
    (sum, r) => sum + (r.stargazers_count || 0),
    0,
  );
  const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0);

  // Language breakdown
  const languages = {};
  repos.forEach((repo) => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });

  // Events breakdown
  const eventTypes = {};
  events.forEach((event) => {
    eventTypes[event.type] = (eventTypes[event.type] || 0) + 1;
  });

  // Commit activity by month
  const commitsByMonth = Array(12).fill(0);
  commits.forEach((commit) => {
    const month = new Date(commit.commit?.author?.date || 0).getMonth();
    if (!isNaN(month)) commitsByMonth[month]++;
  });

  // Most active repository
  const repoActivity = {};
  events.forEach((event) => {
    if (event.repo?.name) {
      repoActivity[event.repo.name] = (repoActivity[event.repo.name] || 0) + 1;
    }
  });
  const mostActiveRepo = Object.entries(repoActivity).sort(
    ([, a], [, b]) => b - a,
  )[0]?.[0];

  return {
    year,
    profile: {
      followers: profile?.followers || 0,
      following: profile?.following || 0,
      publicRepos: profile?.public_repos || 0,
      publicGists: profile?.public_gists || 0,
    },
    repositories: {
      total: repos.length,
      created: reposCreated,
      totalStars,
      totalForks,
      languages,
    },
    activity: {
      totalEvents: events.length,
      totalCommits: commits.length,
      eventTypes,
      commitsByMonth,
      mostActiveRepo,
    },
    contributions: {
      pushEvents: eventTypes.PushEvent || 0,
      pullRequests: eventTypes.PullRequestEvent || 0,
      issues: eventTypes.IssuesEvent || 0,
      reviews: eventTypes.PullRequestReviewEvent || 0,
    },
  };
};

const githubRecapService = {
  fetchGitHubRecapData,
};

export default githubRecapService;
