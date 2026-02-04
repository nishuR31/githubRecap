import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";

const appLogout = asyncHandler(async (req, res) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private",
  );

  res.clearCookie("accessToken", {
    httpOnly: true,
    path: "/",
    secure: process.env.MODE === "prod",
    sameSite: "lax",
  });

  return success(res, "Logged out successfully", codes.ok);
});

export default appLogout;
