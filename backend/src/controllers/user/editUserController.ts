import { Request, Response } from "express";
import { editUserService } from "../../services/userService";
import { asyncHandler } from "../../utils/handler";
import { success, error } from "../../utils/response";

export default asyncHandler(async (req: Request, res: Response) => {
  const user = await editUserService(req.user.id, req.body);
  if (!user) return error(res, 400, "User update failed");
  return success(res, user, "User updated");
});
