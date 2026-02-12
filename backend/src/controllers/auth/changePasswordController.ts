import { Request, Response } from "express";
import { changePasswordService } from "../../services/authService";
import { asyncHandler } from "../../utils/handler";
import { success, error } from "../../utils/response";

export default asyncHandler(async (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body;
  const changed = await changePasswordService(email, otp, newPassword);
  if (!changed) return error(res, 400, "Password change failed");
  return success(res, null, "Password changed");
});
