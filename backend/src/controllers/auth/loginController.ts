import { Request, Response } from "express";
import { loginService } from "../../services/authService";
import { asyncHandler } from "../../utils/handler";
import { success, error } from "../../utils/response";

export default asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await loginService(email, password);
  if (!result) return error(res, 401, "Invalid credentials");
  res.cookie("token", result.accessToken, { httpOnly: true });
  return success(res, result.user, "Login successful");
});
