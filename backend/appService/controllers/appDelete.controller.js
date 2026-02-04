import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";
import recapService from "../../dataService/services/recapService.js";
import deleteSchema from "../../dataService/validators/delete.schema.js";

const adminDelete = asyncHandler(async (req, res) => {
  const payload = await deleteSchema.validateAsync(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  const result = await recapService.deleteByYear(payload.year);

  return success(res, "Data deleted", codes.ok, result);
});

export default adminDelete;
