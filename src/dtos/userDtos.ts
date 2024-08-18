import { z } from "zod";

export const userInsertSchema = z.object({
  name: z.string().min(4).max(255),
  email: z.string().email(),
  password: z.string(),
  phone: z.string(),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type UserDTO = z.infer<typeof userInsertSchema>;
export type UserLoginDTO = z.infer<typeof userLoginSchema>;
