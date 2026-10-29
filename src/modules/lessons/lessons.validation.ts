
import { z } from "zod";
import { publishStatusSchema } from "../courses/courses.validation";

export const createLessonSchema = z.object({
  id:z.uuid(),
  title: z.string().trim().min(1).max(255),

  content: z.string().nullable(),

  videoUrl: z.string().url().nullable(),

  position: z.number().int().min(0).default(0),

  durationSec: z.number().int().min(0).nullable(),
  status:publishStatusSchema.default("DRAFT"),
moduleId:z.uuid()
});

export const updateLessonSchema = createLessonSchema
  .omit({ position: true })
  .partial()
  .extend({
    position: z.number().int().min(0).optional(),
  });

export type CreateLessonInput = z.input<typeof createLessonSchema>;
export type UpdateLessonInput = z.infer<typeof updateLessonSchema>;