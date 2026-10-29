import type { CreateInput, DefaultModelRow } from "@prisma/orm-postgres/orm-client";
import type { Contract } from "../../prisma/contract";
import { db } from "../../prisma/db";
import type {CourseModuleCreateData } from "./modules.types";

import type { UUID } from "crypto";
const LearningModules = db.orm.public.LearningModule;



export class LearingModuleRepository {
  async create(data: CourseModuleCreateData) {
    return LearningModules.create(data);
  }

  async findAll() {
    return LearningModules.all();
  }
  async findById(id:string) {
    return LearningModules.first({ id});
  }
}

export const learingModuleRepository = new LearingModuleRepository();