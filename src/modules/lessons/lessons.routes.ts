import { Router } from "express";

import {
  createLesson,
  getLessonById,
  getLessonsByModuleId,
} from "./lessons.controllers";

const router = Router();

router.get("/:moduleId/lessons", getLessonsByModuleId);
router.get("/:lessonId", getLessonById);
router.post("/modules/:moduleId/lessons", createLesson);

export default router;