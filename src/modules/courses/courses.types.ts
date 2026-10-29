import type { Contract } from "../../prisma/contract";
import type { CreateInput } from "@prisma/orm-postgres/orm-client";
import type { CreateCourseInput,UpdateCourseInput ,CourseQuery} from "./courses.validation";
 export type {
    CreateCourseInput,
    UpdateCourseInput,
    CourseQuery
 }

export type CourseCreateData =CreateInput<Contract,"Course","public">

