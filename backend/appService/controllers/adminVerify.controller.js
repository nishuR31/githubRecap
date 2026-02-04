import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";
import adminService from "../services/adminService.js";
import adminVerifySchema from "../validators/adminVerify.schema.js";

const adminVerify = asyncHandler(async (req, res) => {
  const payload = await adminVerifySchema.validateAsync(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  const result = await adminService.verifyOtp(payload);

  return success(res, "OTP verified successfully", codes.ok, result);
});

export default adminVerify;
