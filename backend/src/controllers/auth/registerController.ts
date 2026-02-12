import { Request, Response } from "express";
import { registerService } from "../../services/authService";
import { asyncHandler } from "../../utils/handler";
import { success, error } from "../../utils/response";

export default asyncHandler(async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  const user = await registerService(email, username, password);
  if (!user) return error(res, 400, "Registration failed");
  return success(res, user, "Registration successful", 201);
});
