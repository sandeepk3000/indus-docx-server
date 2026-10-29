import { HTTP_STATUS } from "../../constants/http-status";
import { MESSAGES } from "../../constants/messages";
import { learingModuleRepository } from "./modules.repostitory";
import type { CourseModuleCreateData } from "./modules.types";

export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class LearningModuleService {
async createCourseModule(data:CourseModuleCreateData) {
    const existing = await learingModuleRepository.findById(data.id);
    if (existing) {
      throw new AppError(
        MESSAGES.ERROR.COURSE_SLUG_ALREADY_EXISTS,
        HTTP_STATUS.CONFLICT,
      );
    }

    return learingModuleRepository.create(data);

  }
}

export const learningModuleService = new LearningModuleService();