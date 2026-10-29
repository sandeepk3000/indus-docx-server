import express from "express";
import {createCourse, getCourseById, getCourseBySlug, getCourseList, getCurriculumByCourseId} from "./courses.controllers";
import authenticate  from "../../middlewares/authenticate";
const router =express.Router();

router.route("/").post(authenticate,createCourse)

router.route("/").get(authenticate,getCourseList)

router.route("/:courseId").get(authenticate,getCourseById)
router.route("/:courseId/curriculum").get(authenticate,getCurriculumByCourseId)

router.route("/slug/:slug").get(authenticate,getCourseBySlug)

router.route("/:courseId/modules").post(authenticate)



export default router;