import { Router } from "express";
import type { Request, Response } from "express";
import { mux } from "../config/mux";
import { lessonsService } from "../modules/lessons/lessons.service";
const router = Router();
router.post("/", async (req: Request, res: Response) => {
  try {
    const event = await mux.webhooks.unwrap(
      req.body,
      req.headers,
      "c9bjqf0oqvqfomsdrh3os8b382pnc9ei",
  
    );

    if (event.type === "video.asset.ready") {
      const lessonId = event.data.passthrough;
      const playbackId = event.data.playback_ids?.[0]?.id;

      if (!lessonId || !playbackId) {
        res.status(200).json({ received: true });
        return;
      }
      const videoUrl = `https://stream.mux.com/${playbackId}.m3u8`;
      
      // Database mein Lesson ka videoUrl update karo
      const lesson = await lessonsService.updateLessonVideoUrl(lessonId, videoUrl);  
    }

    if (event.type === "video.asset.errored") {
      const lessonId = event.data.passthrough;
      console.log("errro")
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Mux webhook error:", error);

    res.status(400).json({
      success: false,
      message: "Webhook verification failed",
    });
  }
});

export default router;

