import type {
  Request,
  Response,
  NextFunction,
} from "express";
import { HTTP_STATUS } from "../constants/http-status";
import { MESSAGES } from "../constants/messages";

export function globalErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(err);

  if (res.headersSent) {
    return;
  }

 return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message:err.message ,
  });
}