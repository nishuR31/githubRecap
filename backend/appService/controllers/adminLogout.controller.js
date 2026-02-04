import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";

const adminLogout = asyncHandler(async (req, res) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private",
  );

  res.clearCookie("accessToken", {
    httpOnly: true,
    path: "/",
    secure: process.env.MODE !== "dev",
    sameSite: process.env.MODE === "dev" ? "lax" : "none",
  });

  return success(res, "Logged out successfully", codes.ok);
});

export default adminLogout;
