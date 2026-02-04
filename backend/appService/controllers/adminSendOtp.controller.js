import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";
import adminService from "../services/adminService.js";
import adminOtpSchema from "../validators/adminOtp.schema.js";

const adminSendOtp = asyncHandler(async (req, res) => {
  const payload = await adminOtpSchema.validateAsync(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  await adminService.sendOtp(payload.email);

  return success(res, "OTP sent to email", codes.ok);
});

export default adminSendOtp;
