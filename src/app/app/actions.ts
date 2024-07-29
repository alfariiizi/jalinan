"use server";

import { auth, signOut } from "@/server/auth";

export async function logout() {
  const session = await auth();

  if (session) {
    try {
      await signOut({ redirect: false });
      return true;
    } catch (error) {
      return false;
    }
  }
  // redirect("/login");
  // return {success: true}
}
