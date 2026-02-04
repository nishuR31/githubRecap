import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";
import dataService from "../services/dataService.js";

const getUserData = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (!username) {
    return res.status(400).json({ message: "Username parameter is required" });
  }

  const userData = await dataService.getUserData(username);
  return success(res, "User data fetched", codes.ok, userData);
});

export default getUserData;
