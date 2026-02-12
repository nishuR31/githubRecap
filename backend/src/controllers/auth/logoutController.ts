import { Request, Response } from "express";
import { asyncHandler } from "../../utils/handler";
import { success } from "../../utils/response";

export default asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie("token");
  return success(res, null, "Logged out");
});
