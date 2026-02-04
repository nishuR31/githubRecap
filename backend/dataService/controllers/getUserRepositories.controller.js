import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";
import dataService from "../services/dataService.js";

const getUserRepositories = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (!username) {
    return res.status(400).json({ message: "Username parameter is required" });
  }

  const repos = await dataService.getUserRepositories(username);
  return success(res, "User repositories fetched", codes.ok, repos);
});

export default getUserRepositories;
