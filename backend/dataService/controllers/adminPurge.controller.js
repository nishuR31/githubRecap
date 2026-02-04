import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";
import recapService from "../services/recapService.js";

const adminPurge = asyncHandler(async (req, res) => {
  const result = await recapService.purge();

  return success(res, "Data purged", codes.ok, result);
});

export default adminPurge;
