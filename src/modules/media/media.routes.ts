import { Router } from "express";
import { generateUploadAuth, generateVideoUpload } from "./media.controllers";






const router = Router()

router.get("/images/upload-auth",generateUploadAuth)
// router.post("/images")
router.post("/videos/upload-url/:passThrough",generateVideoUpload)
// router.get("/videos/:mediaId/playback")
// router.get("/:mediaId")
// router.get("/:mediaId")
export default router;