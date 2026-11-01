import { db } from "../../prisma/db";
import type { CreateLessonData } from "./lessons.types";

const Lessons = db.orm.public.Lesson
export const lessonsRepository = {
  findById(id: string) {
    return Lessons.first({ id });
  },

  findByModuleId(moduleId: string) {
    return Lessons.where({ moduleId }).all()
  },

  create(data: CreateLessonData) {
    return Lessons.create(data);
  },
  updateVideoUrl(lessonId: string, videoUrl: string) {
    return Lessons.where({ id: lessonId }).update({ videoUrl: videoUrl });
  },
};