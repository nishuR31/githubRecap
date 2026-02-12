// Implement GitHub API rate limit logic
import { fetchGithubUser, fetchGithubRepos } from "../services/githubService";
import { success, error } from "../utils/response";
import { asyncHandler } from "../utils/handler";

export const fetchAndStoreGithubData = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const token = process.env.GITHUB_TOKEN;
  const user = await fetchGithubUser(username, token);
  const repos = await fetchGithubRepos(username, token);

  // Save user and repos to your DB here...

  return success(res, "Fetched and stored GitHub data",200,{ user, repos },);
});