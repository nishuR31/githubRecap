import { Request, Response } from "express";
import { verifyOtpService } from "../../services/authService";
import { asyncHandler } from "../../utils/handler";
import { success, error } from "../../utils/response";

export default asyncHandler(async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const valid = await verifyOtpService(email, otp);
  if (!valid) return error(res, 400, "Invalid OTP");
  return success(res, { valid }, "OTP verification result");
});
