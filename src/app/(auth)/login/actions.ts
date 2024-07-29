"use server";

import { loginSchema } from "@/validation";
import { signIn } from "@/server/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(prevState: unknown, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  try {
    // await loginAuth(data);
    await signIn("credentials", {
      redirect: false,
      email: data.username,
      password: data.password,
    });
    revalidatePath("/settings/management-user");
    return true;
  } catch (error) {
    // const errorMessage = (error as any)?.message as string;
    // const searchParams = new URLSearchParams({
    //   error: "Incorrect email or password",
    // }).toString();
    // redirect(`/login?${searchParams}`);
    return false;
  }
}
