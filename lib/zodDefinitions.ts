import { z } from "zod";

export const ZodPasswordSchemaClient = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z
    .string()
    .min(1, { message: "Password must be 1 or more characters long" })
    .max(50, { message: "Password must be 50 or fewer characters long" }),
  account_description: z.string().min(2, {
    message: "Username must be at least 8 characters.",
  }),
  url: z
    .string()
    .url({ message: "Please provide a valid URL" })
    .optional()
    .or(z.literal("")),
});

export const ZodPasswordSchemaServer = z.object({
  user_id: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z
    .string()
    .min(1, { message: "Password must be 1 or more characters long" })
    .max(50, { message: "Password must be 50 or fewer characters long" }),
  account_description: z.string().min(2, {
    message: "Username must be at least 8 characters.",
  }),
  password_score: z
    .number()
    .gte(1, { message: "Password Score must be between 1 to 5" })
    .lte(5, { message: "Password Score must be between 1 to 5" }),
  url: z
    .string()
    .url({ message: "Please provide a valid URL" })
    .optional()
    .or(z.literal("")),
});

export const ZodUserSchema = z.object({
  email_id: z.string().email({ message: "Enter a Valid Email ID." }),
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(60, {
      message: "Name cannot be more than 60 characters.",
    }),
  password: z
    .string()
    .min(12, { message: "Password must be 12 or more characters long" })
    .max(50, { message: "Password must be 50 or fewer characters long" }),
});

export const ZodEmailIdSchema = z
  .string()
  .email({ message: "Enter a Valid Email ID." });

export const ZodLoginSchema = z.object({
  email_id: z.string().email({ message: "Enter a Valid Email ID." }),
  password: z
    .string()
    .min(12, { message: "Password must be 12 or more characters long" })
    .max(50, { message: "Password must be 50 or fewer characters long" }),
});
