import { z } from "zod";
export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export const updateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
});

export const deleteUserSchema = z.object({
  id: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "id must be a positive number",
  }),
});
