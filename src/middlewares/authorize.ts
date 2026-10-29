import type {
  Request,
  Response,
  NextFunction,
} from "express";

import type { UserRole } from "../../types";
import { HTTP_STATUS } from "../constants/http-status";
import { ApiError } from "../utils/ApiError";

export function authorize(...allowedRoles: UserRole[]) {
  return (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    const user = req.user;

    if (!user?.role) {
      return next(
        new ApiError(
          HTTP_STATUS.UNAUTHORIZED,
          "Authentication required"
        )
      );
    }

    if (!allowedRoles.includes(user.role)) {
      return next(
        new ApiError(
          HTTP_STATUS.FORBIDDEN,
          "You do not have access to this resource"
        )
      );
    }

    next();
  };
}