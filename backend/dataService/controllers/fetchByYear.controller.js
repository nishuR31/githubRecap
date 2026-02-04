import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";
import recapService from "../services/recapService.js";

const fetchByYear = asyncHandler(async (req, res) => {
  const year = Number(req.params.year);
  const result = await recapService.fetchByYear(year);

  return success(res, "Data fetched", codes.ok, result || {});
});

export default fetchByYear;
