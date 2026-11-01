import { HTTP_STATUS } from "../../constants/http-status";
import { MESSAGES } from "../../constants/messages";
import { ApiError } from "../../utils/ApiError";
import { lessonsRepository } from "./lessons.repository";
import type { CreateLessonData } from "./lessons.types";

class LessonsService {
  async getLessonById(id: string) {
    return await lessonsRepository.findById(id);
  }

  async getLessonsByModuleId(moduleId: string) {
    return await lessonsRepository.findByModuleId(moduleId);
  }

  async createLesson(
    data: CreateLessonData
  ) {
    return await lessonsRepository.create({
      ...data,
    });
  }
  async updateLessonVideoUrl(lessonId: string, videoUrl: string) {
    const lessonExists = await lessonsRepository.findById(lessonId);

    if (!lessonExists) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.ERROR.NOT_FOUND);
    }
    const updateLesson = await lessonsRepository.updateVideoUrl(lessonId, videoUrl);
    if (!updateLesson) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.ERROR.NOT_FOUND);
    }

    return updateLesson;
  }
}

export const lessonsService = new LessonsService();