import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";
import appService from "../services/appService.js";
import appSendOtpSchema from "../validators/appSendOtp.schema.js";

const appSendOtp = asyncHandler(async (req, res) => {
  const payload = await appSendOtpSchema.validateAsync(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  await appService.sendOtp(payload.email);

  return success(res, "OTP sent to email", codes.ok);
});

export default appSendOtp;
