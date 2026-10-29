import type { CreateInput } from "@prisma/orm-postgres/orm-client";
import type { Contract } from "../../prisma/contract";


export type CreateLessonData = CreateInput<Contract , "Lesson", "public">