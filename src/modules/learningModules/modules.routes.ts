import { Router } from "express";

import {
  createModule
} from "./modules.controllers";
import { createLesson, getLessonsByModuleId,getLessonById } from "../lessons/lessons.controllers";
import authenticate from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";

const router = Router();

router.post("/:courseId",authenticate,authorize("ADMIN","INSTRUCTOR","STUDENT") ,createModule);

router.get("/:moduleId/lessons",authenticate,authorize("ADMIN","INSTRUCTOR","STUDENT"), getLessonsByModuleId);
router.get("/:lessonId",authenticate,authorize("ADMIN","INSTRUCTOR","STUDENT"), getLessonById);
router.post("/:moduleId/lessons",authenticate,authorize("ADMIN","INSTRUCTOR","STUDENT"), createLesson);

export default router;