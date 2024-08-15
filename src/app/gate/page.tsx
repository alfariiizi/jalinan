import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import React from "react";
import Preparing from "./_components/preparing";

export default async function page() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = await api.user.getuser();

  if (user?.username !== user?.email?.split("@").join("-")) {
    return <Preparing />;
  }

  redirect("/on-boarding");
}
