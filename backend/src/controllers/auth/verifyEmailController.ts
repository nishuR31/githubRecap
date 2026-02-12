import { Request, Response } from "express";
import { verifyPasswordlessService } from "../../services/authService";
import { asyncHandler } from "../../utils/handler";
import { success, error } from "../../utils/response";

export default asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.body;
  const user = await verifyPasswordlessService(token);
  if (!user) return error(res, 400, "Invalid or expired token");
  res.cookie("token", user.token, { httpOnly: true });
  return success(res, user, "Passwordless login successful");
});
