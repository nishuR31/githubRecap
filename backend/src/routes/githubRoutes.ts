import { Router } from "express";
import { fetchGithubData } from "../services/githubService";
const router = Router();
router.get("/recap/:username", fetchGithubData);
export default router;
