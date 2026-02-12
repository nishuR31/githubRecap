import { NextFunction, Response,Request } from "express";
import {  verifyAccess } from "../../utils/jwt";
import { asyncHandler } from "../../utils/handler";
import { error } from "../../utils/response";

const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith("Bearer ") ?
        req.headers.authorization.slice(7)
      : undefined);

    if (!token) {
      return error(res, 401, "Authentication required");
    }

    const decoded = verifyAccess(token);
    if (!decoded || !decoded?.id) {
      return error(res, 401, "Invalid or expired token");
    }

    req.user = decoded;
    req.user.id = decoded.id;
    next();
  },
);

export default authMiddleware;
