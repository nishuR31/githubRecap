import { Response } from "express";

export function success(res: Response, message = "Success", statusCode: number = 200, data?: any) {
  return res.status(statusCode).json({ success: true, message, success: true, data });
}

export function error(res: Response, message = "Error", statusCode: number = 400, data?: any) {
  return res.status(statusCode).json({ success: false, message, success: false, data });
}
