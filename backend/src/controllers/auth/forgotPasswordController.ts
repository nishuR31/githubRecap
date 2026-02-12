import { Request, Response } from "express";
import { forgotPasswordService } from "../../services/authService";
import { asyncHandler } from "../../utils/handler";
import { success, error } from "../../utils/response";

export default asyncHandler(async (req: Request, res: Response) => {
  const sent = await forgotPasswordService(req.body.email);
  if (!sent) return error(res, 404, "User not found");
  return success(res, null, "OTP sent to email");
});
