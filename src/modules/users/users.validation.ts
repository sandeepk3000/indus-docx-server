import { z } from "zod";

export const createUserSchema = z.object({
  id:z.uuid(),
  name: z.string().trim().min(3).max(150).lowercase(),
  email: z.email().trim().max(255).lowercase()
});

export const updateUserSchema = createUserSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });
export const loginSchema = z.object({
  refreshToken:z.string(),
  email: z.email(),
  password: z.string().min(1, "Password is required").optional(),
});
export const UserIdSchema =z.uuid({
  message: "Invalid user ID",
});

export type CreateUserInput = z.input<typeof createUserSchema>;
export type LoginUserInput = z.input<typeof loginSchema>
