import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";
import adminService from "../services/adminService.js";
import adminRegisterSchema from "../validators/adminRegister.schema.js";

const adminRegister = asyncHandler(async (req, res) => {
  const payload = await adminRegisterSchema.validateAsync(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  const result = await adminService.register(payload);

  return success(
    res,
    "Admin registered. Check email for OTP.",
    codes.created,
    result,
  );
});

export default adminRegister;
