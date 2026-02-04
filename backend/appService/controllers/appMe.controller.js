import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";
import appService from "../services/appService.js";

const appMe = asyncHandler(async (req, res) => {
  const user = await appService.getMe(req.user.id);

  return success(res, "User data fetched", codes.ok, user);
});

export default appMe;
