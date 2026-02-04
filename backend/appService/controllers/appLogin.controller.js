import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";
import appService from "../services/appService.js";
import appLoginSchema from "../validators/appLogin.schema.js";

const appLogin = asyncHandler(async (req, res) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private",
  );

  const payload = await appLoginSchema.validateAsync(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  const result = await appService.login(payload);
  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: process.env.MODE === "prod",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  return success(res, `Welcome back ${payload.email}`, codes.ok, {
    id: result.id,
    email: result.email,
    accessToken: result.accessToken,
  });
});

export default appLogin;
