import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";
import dataService from "../services/dataService.js";

const searchRepositories = asyncHandler(async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  const results = await dataService.searchRepositories(query);
  return success(res, "Repositories fetched", codes.ok, results);
});

export default searchRepositories;
