import { Request, Response } from "express";
import { sendPasswordlessLinkService } from "../../services/authService";
import { asyncHandler } from "../../utils/handler";
import { success, error } from "../../utils/response";

export default asyncHandler(async (req: Request, res: Response) => {
  const sent = await sendPasswordlessLinkService(req.body.email);
  if (!sent) return error(res, 404, "User not found");
  return success(res, null, "Passwordless link sent");
});
