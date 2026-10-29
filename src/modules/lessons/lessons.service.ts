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
}

export const lessonsService = new LessonsService();