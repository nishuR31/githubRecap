import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";

const appPing = asyncHandler(async (req, res) => {
  return success(res, "App service pinged successfully", codes.ok, "Pong");
});

export default appPing;
