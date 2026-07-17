import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name")
    .max(100, "That name's a bit long"),
  email: z.string().trim().min(1, "Enter your email").email("Enter a valid email address"),
  message: z
    .string()
    .trim()
    .min(10, "Say a bit more — at least 10 characters")
    .max(2000, "That's a lot — try trimming it down"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
