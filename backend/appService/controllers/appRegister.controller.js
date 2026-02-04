import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";
import appService from "../services/appService.js";
import appRegisterSchema from "../validators/appRegister.schema.js";

const appRegister = asyncHandler(async (req, res) => {
  const payload = await appRegisterSchema.validateAsync(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  const result = await appService.register(payload);

  return success(
    res,
    "Registration successful. Check email for OTP.",
    codes.created,
    {
      id: result.id,
      email: result.email,
    },
  );
});

export default appRegister;
