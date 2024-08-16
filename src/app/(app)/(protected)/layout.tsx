import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default async function layout({ children }: Props) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return children;
}
