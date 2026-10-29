import type { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../constants/http-status";
import { MESSAGES } from "../../constants/messages";
import { ApiError } from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import { courseQuerySchema, createCourseSchema } from "./courses.validation";
import { courseService } from "./courses.service";
import { error } from "node:console";
import { v4 as uuidv4 } from "uuid";

export async function createCourse(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {

    const result = createCourseSchema.safeParse({ ...req.body, id: uuidv4() });
    if (!result.success) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(
        new ApiError(
          HTTP_STATUS.BAD_REQUEST,
          MESSAGES.ERROR.BAD_REQUEST,
          result.error.issues
        ));
    }

    // result.data = validated and transformed output
    const course = await courseService.create(result.data);


    return res.status(HTTP_STATUS.CREATED).json(
      new ApiResponse(
        req,
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.CREATED,
        course,
        true
      )
    )

  } catch (error) {
    next(error);
  }
}

export async function getCourseList(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const query = courseQuerySchema.parse(req.query)
    const courses = await courseService.findAll(query);
    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        req,
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.OK,
        courses,
        true,
      ),
    );
  } catch (error) {
    next(error);
  }
}

export async function getCourseById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const courseId = req.params.courseId

    if (typeof courseId !== "string") {
      return next(
        new ApiError(
          HTTP_STATUS.BAD_REQUEST,
          MESSAGES.ERROR.BAD_REQUEST,
        ),
      );
    }
    const course = await courseService.findById(courseId);

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        req,
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.OK,
        course,
        true,
      ),
    );
  } catch (error) {
    next(error);
  }
}

export async function getCourseBySlug(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const slug = req.params.slug
    if (typeof slug !== "string") {
      return next(
        new ApiError(
          HTTP_STATUS.BAD_REQUEST,
          MESSAGES.ERROR.BAD_REQUEST,
        ),
      );
    }
    const course = await courseService.findBySlug(slug);

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        req,
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.OK,
        course,
        true,
      ),
    );
  } catch (error) {
    next(error);
  }
}

export async function getCurriculumByCourseId(req:Request,res:Response,next:NextFunction){
   try {
    const courseId = req.params.slug
    if (typeof courseId !== "string") {
      return next(
        new ApiError(
          HTTP_STATUS.BAD_REQUEST,
          MESSAGES.ERROR.BAD_REQUEST,
        ),
      );
    }
    const courseCurriculum = await courseService.getCourseCurriculum(courseId);

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        req,
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.OK,
        courseCurriculum,
        true,
      ),
    );
  } catch (error) {
    next(error);
  }
}

