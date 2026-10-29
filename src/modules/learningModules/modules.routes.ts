import { Router } from "express";

import {
  createModule
} from "./modules.controllers";
import { createLesson, getLessonsByModuleId,getLessonById } from "../lessons/lessons.controllers";

const router = Router();

router.post("/:courseId", createModule);

router.get("/:moduleId/lessons", getLessonsByModuleId);
router.get("/:lessonId", getLessonById);
router.post("/:moduleId/lessons", createLesson);

export default router;