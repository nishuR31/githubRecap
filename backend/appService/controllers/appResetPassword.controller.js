import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";
import appService from "../services/appService.js";
import appResetPasswordSchema from "../validators/appResetPassword.schema.js";

const appResetPassword = asyncHandler(async (req, res) => {
  const payload = await appResetPasswordSchema.validateAsync(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  await appService.resetPassword(payload);

  return success(res, "Password reset successfully", codes.ok);
});

export default appResetPassword;
