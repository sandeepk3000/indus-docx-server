import type { CreateInput, DefaultModelRow } from "@prisma/orm-postgres/orm-client";
import { db } from "../../prisma/db";
import type { CourseCreateData, CreateCourseInput, CourseQuery } from "./courses.types";
import { buildPagination } from "../../../types";


const Courses = db.orm.public.Course;



export class CourseRepository {
  create(data: CourseCreateData) {
    return Courses.create(data);
  }

  findMany({ search, status, level, sortBy, limit, page }: CourseQuery) {
    const filters = {
      ...(status ? { status: status } : {}),
      ...(level ? { level: level } : {}),
    };
    const { offset } = buildPagination(limit, page)
    if (search) {
      return Courses
        .where(filters)
        .where((course) =>
          course.title.ilike(`%${search}%`)
        )
        .limit(limit)
        .offset(offset)
        .all();
    }

    return Courses
      .where(filters)
      .limit(limit)
      .offset(offset)
      .all();
  }
findCurriculumByCourseId(id: string) {
    return Courses
      .include("modules", (module) =>
        module.include("lessons")
      )
      .first({ id });
  }
  findById(id: string) {
    return Courses.first({ id });
  }
  findBySlug(slug: string) {
    return Courses.first({ slug });
  }
}

export const courseRepository = new CourseRepository();