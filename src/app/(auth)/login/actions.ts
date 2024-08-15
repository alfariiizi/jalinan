"use server";

import { loginSchema } from "@/validation";
import { signIn } from "@/server/auth";
import { revalidatePath } from "next/cache";

export async function login(prevState: unknown, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  try {
    await signIn("credentials", {
      redirect: false,
      email: data.username,
      password: data.password,
    });
    revalidatePath("/");
    revalidatePath("/gate");
    return true;
  } catch (error) {
    return false;
  }
}
