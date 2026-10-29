import type { NextFunction,Request,Response } from "express";
import { HTTP_STATUS } from "../../constants/http-status";
import { ApiError } from "../../utils/ApiError";
import { createModuleSchema } from "./module.validation";
import { learningModuleService } from "./modules.services";
import { MESSAGES } from "../../constants/messages";
import ApiResponse from "../../utils/ApiResponse";
import { v4 as uuidv4} from "uuid";

export const createModule = async (
  req: Request,
  res: Response,
  next: NextFunction
)=> {
  try {
    // 1. Get courseId from URL
    const { courseId } = req.params;

    if (!courseId) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Course ID is required"
      );
    }

    // 2. Validate request body using Zod
    const result = createModuleSchema.safeParse({...req.body,courseId:courseId,id:uuidv4()});

    if (!result.success) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Invalid module data"
      );
    }

    // 3. Call service
    const module = await learningModuleService.createCourseModule(result.data)

    // 4. Send success response
    return res.status(HTTP_STATUS.CREATED).json(
      new ApiResponse(
        req,
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.CREATED,
        module,
        true
      )
    )
  } catch (error) {
    // 5. Pass error to global error handler
    next(error);
  }
};