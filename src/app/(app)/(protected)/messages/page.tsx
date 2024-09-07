import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <div>Coming soon</div>;
}
