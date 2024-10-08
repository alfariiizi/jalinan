import { z } from "zod";

export const requiredString = z.string().trim().min(1, "Required");
export const usernameSchema = requiredString.regex(
  /^[a-zA-Z0-9_-]+$/,
  "Only letters, numbers, -, and _ are allowed",
);

export const signUpSchema = z.object({
  email: requiredString.email("Invalid email address"),
  password: requiredString.min(8, "Must be at least 8 characters"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;
