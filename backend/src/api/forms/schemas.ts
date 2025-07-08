import { z } from "zod";

export const saveSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Invalid email address"),
  expiryDays: z.number().int().positive().optional(),
});
