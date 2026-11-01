import type {
    Request,
    Response,
    NextFunction,
} from "express";

import { HTTP_STATUS } from "../../constants/http-status";
import { ApiError } from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import { createLessonSchema } from "./lessons.validation";
import { lessonsService } from "./lessons.service";
import { MESSAGES } from "../../constants/messages";
import { v4 as uuidv4 } from "uuid";

export const getLessonsByModuleId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { moduleId } = req.params;

        if (typeof moduleId !== "string") {
            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Module ID is required"
            );
        }

        const lessons =
            await lessonsService.getLessonsByModuleId(moduleId);

        return res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                req,
                res,
                HTTP_STATUS.OK,
                "Lessons fetched successfully",
                lessons,
                true
            )
        )
    } catch (error) {
        next(error);
    }
};

export const getLessonById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { lessonId } = req.params;

        if (typeof lessonId !== "string") {
            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Module ID is required"
            );
        }

        const lesson =
            await lessonsService.getLessonById(lessonId);

        if (!lesson) {
            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Lesson not found"
            );
        }

        return res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                req,
                res,
                HTTP_STATUS.OK,
                "Lesson fetched successfully",
                lesson,
                true
            )
        )
    } catch (error) {
        next(error);
    }
};

export const createLesson = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { moduleId } = req.params;

        if (typeof moduleId !== "string") {
            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Module ID is required"
            );
        }

        const parsed = createLessonSchema.safeParse({ ...req.body, moduleId, id: uuidv4() });

        if (!parsed.success) {
            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Invalid lesson data"
            );
        }

        const lesson = await lessonsService.createLesson(parsed.data);

        return res.status(HTTP_STATUS.CREATED).json(
            new ApiResponse(
                req,
                res,
                HTTP_STATUS.OK,
                MESSAGES.SUCCESS.CREATED,
                lesson,
                true
            )
        )
    } catch (error) {
        next(error);
    }
};


export const updateLessonVideoUrl = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { lessonId } = req.params;
        const { videoUrl } = req.body;

        if (typeof lessonId !== "string") {
            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Lesson ID is required"
            );
        }

        if (typeof videoUrl !== "string" || !videoUrl.trim()) {
            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Video URL is required"
            );
        }

        const lesson = await lessonsService.updateLessonVideoUrl(
            lessonId,
            videoUrl.trim()
        );
        return res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                req,
                res,
                HTTP_STATUS.OK,
                "Lesson video URL updated successfully",
                lesson,
                true
            )
        );
    } catch (error) {
        next(error);
    }
};