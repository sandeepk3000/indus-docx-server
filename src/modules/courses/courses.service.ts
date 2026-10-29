import { HTTP_STATUS } from "../../constants/http-status";
import { MESSAGES } from "../../constants/messages";
import { courseRepository } from "./courses.repository";
import type { CourseCreateData, CourseQuery, CreateCourseInput } from "./courses.types";

export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class CourseService {
  async create(data: CourseCreateData) {
    const existing = await courseRepository.findBySlug(data.slug);

    if (existing) {
      throw new AppError(
        MESSAGES.ERROR.COURSE_SLUG_ALREADY_EXISTS,
        HTTP_STATUS.CONFLICT,
      );
    }

    return courseRepository.create(data);

  }

  async findAll(query: CourseQuery) {
    return courseRepository.findMany(query);
  }
  getCourseCurriculum(courseId: string) {
    return courseRepository.findCurriculumByCourseId(courseId);
  }
  async findById(id: string) {
    const course = await courseRepository.findById(id);

    if (!course) {
      throw new AppError(
        MESSAGES.ERROR.ROUTE_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND,
      );
    }

    return course;
  }

  async findBySlug(slug: string) {
    const course = await courseRepository.findBySlug(slug);

    if (!course) {
      throw new AppError(
        MESSAGES.ERROR.ROUTE_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND,
      );
    }

    return course;
  }
}

export const courseService = new CourseService();