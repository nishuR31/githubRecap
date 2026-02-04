import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";
import appService from "../services/appService.js";
import appCheckOtpSchema from "../validators/appCheckOtp.schema.js";

const appCheckOtp = asyncHandler(async (req, res) => {
  const payload = await appCheckOtpSchema.validateAsync(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  const result = await appService.checkOtp(payload);

  return success(res, "OTP verified. Proceed to reset password.", codes.ok, {
    token: result.token,
  });
});

export default appCheckOtp;
