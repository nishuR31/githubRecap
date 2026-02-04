import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";
import recapService from "../services/recapService.js";
import deleteSchema from "../validators/delete.schema.js";

const adminDeleteYear = asyncHandler(async (req, res) => {
  const payload = await deleteSchema.validateAsync(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  const result = await recapService.deleteByYear(payload.year);

  return success(
    res,
    `Recap data for year ${payload.year} deleted successfully`,
    codes.ok,
    result,
  );
});

export default adminDeleteYear;
