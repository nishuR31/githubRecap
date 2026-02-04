import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";
import adminService from "../services/adminService.js";
import adminForgotSchema from "../validators/adminForgot.schema.js";

const adminForgot = asyncHandler(async (req, res) => {
  const payload = await adminForgotSchema.validateAsync(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  await adminService.forgot(payload);

  return success(res, "OTP sent to your email", codes.ok);
});

export default adminForgot;
