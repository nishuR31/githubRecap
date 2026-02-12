import { Request, Response } from "express";
import { fetchGithubUser, fetchGithubRepos } from "../utils/githubFetcher";
import { saveGithubUser, saveGithubRepos } from "../repository/githubRepository";

export async function fetchAndStoreGithubDataService(username: string, token?: string) {
  const user = await fetchGithubUser(username, token);
  const repos = await fetchGithubRepos(username, token);
  await saveGithubUser(user);
  await saveGithubRepos(username, repos);
  return { user, repos };
}
