import type {
    Request,
    Response,
    NextFunction,
} from "express";
import { mediaService } from "./media.service";
import ApiResponse from "../../utils/ApiResponse";
import { HTTP_STATUS } from "../../constants/http-status";
import { MESSAGES } from "../../constants/messages";
import { ApiError } from "../../utils/ApiError";
export const generateUploadAuth = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const data = mediaService.generateUploadAuth();
        return res.status(200).json(
            new ApiResponse(req, res, HTTP_STATUS.CREATED, MESSAGES.SUCCESS.CREATED, data, true)
        );
    } catch (error) {
        next(error);
    }
};

export const generateVideoUpload = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { passThrough } = req.params;

        if (typeof passThrough !== "string") {
               throw new ApiError(
                    HTTP_STATUS.BAD_REQUEST,
                    MESSAGES.ERROR.BAD_REQUEST,
                )
        
        };
        const data = await mediaService.createVideoUploadUrl(passThrough);
        return res.status(200).json(
            new ApiResponse(req, res, HTTP_STATUS.CREATED, MESSAGES.SUCCESS.CREATED, data, true),
        );
    } catch (error) {
        next(error);
    }
};

