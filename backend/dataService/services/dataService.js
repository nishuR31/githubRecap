import cache from "../../sharedService/utils/cache.js";
import githubRepository from "../repo/githubRepository.js";

const DEFAULT_TTL = parseInt(process.env.GITHUB_CACHE_TTL || "3600", 10);
const DEBOUNCE_MS = parseInt(process.env.GITHUB_DEBOUNCE_MS || "300", 10);

const debounceMap = new Map();

const debounce = async (key) => {
  const now = Date.now();
  const last = debounceMap.get(key) || 0;
  const diff = now - last;

  if (diff < DEBOUNCE_MS) {
    await new Promise((resolve) => setTimeout(resolve, DEBOUNCE_MS - diff));
  }

  debounceMap.set(key, Date.now());
};

const dataService = {
  async searchRepositories(query) {
    const cacheKey = cache.key("github", "search", query);
    await debounce(cacheKey);

    return cache.getOrSet(
      cacheKey,
      () => githubRepository.searchRepositories(query),
      DEFAULT_TTL,
    );
  },

  async getUserData(username) {
    const cacheKey = cache.key("github", "user", username);

    return cache.getOrSet(
      cacheKey,
      () => githubRepository.getUserData(username),
      DEFAULT_TTL,
    );
  },

  async getUserRepositories(username) {
    const cacheKey = cache.key("github", "repos", username);

    return cache.getOrSet(
      cacheKey,
      () => githubRepository.getUserRepositories(username),
      DEFAULT_TTL,
    );
  },
};

export default dataService;
