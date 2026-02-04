import axios from "axios";
import codes from "../../sharedService/utils/codes.js";

const GITHUB_API = "https://api.github.com";

const createError = (message, statusCode, extra = {}) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  err.extra = extra;
  return err;
};

const buildHeaders = () => {
  const headers = {
    Accept: "application/vnd.github+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
};

const githubRepository = {
  async searchRepositories(query) {
    const url = `${GITHUB_API}/search/repositories?q=${encodeURIComponent(query)}&per_page=20`;
    try {
      const response = await axios.get(url, { headers: buildHeaders() });
      return response.data;
    } catch (err) {
      if (
        err.response?.status === 403 &&
        err.response?.headers?.["x-ratelimit-remaining"] === "0"
      ) {
        throw createError(
          "GitHub API rate limit exceeded",
          codes.tooManyRequests,
          {
            reset: err.response?.headers?.["x-ratelimit-reset"],
          },
        );
      }
      throw createError(
        "GitHub API error",
        err.response?.status || codes.serverError,
        {
          message: err.message,
        },
      );
    }
  },

  async getUserData(username) {
    const url = `${GITHUB_API}/users/${encodeURIComponent(username)}`;
    try {
      const response = await axios.get(url, { headers: buildHeaders() });
      return response.data;
    } catch (err) {
      throw createError(
        "GitHub API error",
        err.response?.status || codes.serverError,
        {
          message: err.message,
        },
      );
    }
  },

  async getUserRepositories(username) {
    const url = `${GITHUB_API}/users/${encodeURIComponent(username)}/repos?per_page=50&sort=updated`;
    try {
      const response = await axios.get(url, { headers: buildHeaders() });
      return response.data;
    } catch (err) {
      throw createError(
        "GitHub API error",
        err.response?.status || codes.serverError,
        {
          message: err.message,
        },
      );
    }
  },
};

export default githubRepository;
