import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";
import appService from "../services/appService.js";
import appForgotSchema from "../validators/appForgot.schema.js";

const appForgot = asyncHandler(async (req, res) => {
  const payload = await appForgotSchema.validateAsync(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  await appService.sendForgotOtp(payload.email);

  return success(res, "OTP sent to your email", codes.ok);
});

export default appForgot;
