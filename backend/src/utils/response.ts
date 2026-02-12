import { Response } from 'express';

export function success(res: Response, data: any, message = 'Success', status = 200) {
  return res.status(status).json({ success: true, message, data });
}

export function error(res: Response, status = 500, message = 'Error', data?: any, err?: any) {
  const isDev = process.env.NODE_ENV === 'dev';
  return res.status(status).json({
    success: false,
    message,
    data,
    ...(isDev && err ? { stack: err.stack || err.toString() } : {}),
  });
}
