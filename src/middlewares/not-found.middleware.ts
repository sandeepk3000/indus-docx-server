import type { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constants/http-status";

export function notFoundHandler(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}