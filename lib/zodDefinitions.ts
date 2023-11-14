import { z } from "zod";

export const PasswordSchema = z.object({
  user_id: z.string(),
  username: z.string(),
  password: z
    .string()
    .min(1, { message: "Password must be 1 or more characters long" })
    .max(50, { message: "Password must be 50 or fewer characters long" }),
  account_description: z.string(),
  password_score: z
    .string()
    .min(1, { message: "Password Score must be between 1 to 5" })
    .max(5, { message: "Password Score must be between 1 to 5" }),
  // .number()
  // .gte(1, { message: "Password Score must be between 1 to 5" })
  // .lte(5, { message: "Password Score must be between 1 to 5" }),
  url: z
    .string()
    .url({ message: "Please provide a valid URL" })
    .optional()
    .or(z.literal("")),
});
