
import { z } from "zod";
import { commonQuerySchema } from "../../../types";


export const courseLevelSchema = z.enum([
    "BEGINNER",
    "INTERMEDIATE",
    "ADVANCED",
]);

export const publishStatusSchema = z.enum([
    "DRAFT",
    "PUBLISHED",
    "ARCHIVED",
]);

export const createCourseSchema = z.object({
    id:z
    .uuid(),
    title: z
        .string()
        .trim()
        .min(3, "Title must contain at least 3 characters")
        .max(255, "Title cannot exceed 255 characters"),

    slug: z
        .string()
        .trim()
        .min(1, "Slug is required")
        .max(280, "Slug cannot exceed 280 characters")
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            "Slug must contain lowercase letters, numbers and hyphens only",
        ),

    description: z.string().trim().nullable(),
    createdById: z.uuid(),

    thumbnailUrl: z
        .string()
        .url("Invalid thumbnail URL")
        .nullable(),
                                                                                                                                                                        
    level: courseLevelSchema.default("BEGINNER"),


    status: publishStatusSchema.default("DRAFT"),

});

export const updateCourseSchema = createCourseSchema
    .partial()
    .extend({
        slug: createCourseSchema.shape.slug.optional(),
    })
    .refine(
        (data) => Object.keys(data).length > 0,
        "At least one field is required",
    );


export const courseQuerySchema = commonQuerySchema.extend({
  status: publishStatusSchema.optional(),
  level: courseLevelSchema.optional(),
  include: z.enum(["none", "modules", "curriculum"]).default("none"),
  fields: z.enum(["all", "summary"]).default("all"),
});

export type CourseQuery = z.output<typeof courseQuerySchema>;
export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
