import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";
import adminService from "../services/adminService.js";
import adminLoginSchema from "../validators/adminLogin.schema.js";
import cookieOptions from "../../sharedService/utils/cookieOptions.js";

const adminLogin = asyncHandler(async (req, res) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private",
  );

  const payload = await adminLoginSchema.validateAsync(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  const result = await adminService.login(payload);

  res.cookie("accessToken", result.accessToken, cookieOptions("access"));

  return success(res, `Welcome back ${payload.email}`, codes.ok, {
    id: result.id,
    email: result.email,
    username: result.username,
    role: result.role,
    accessToken: result.accessToken,
  });
});

export default adminLogin;
