import { z } from "zod";
export const createModuleSchema = z.object({
    id: z.uuid(),
    courseId: z.uuid(),
    title: z
        .string()
        .trim()
        .min(1, "Module title is required")
        .max(255, "Module title cannot exceed 255 characters"),

    description: z
        .string()
        .trim()
        .nullable(),
    position: z
        .number()
        .int()
        .min(0)
        .default(0),
});

export const updateModuleSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1)
        .max(255)
        .optional(),
    description: z
        .string()
        .trim(),

    position: z
        .number()
        .int()
        .min(0)
});