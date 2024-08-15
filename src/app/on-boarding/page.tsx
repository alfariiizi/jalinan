import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import Form from "./form";
import Footer from "@/components/footer";

export default async function page() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-dvh w-full flex-col">
      <div className="mx-auto h-fit w-full max-w-md grow">
        <div className="flex h-full w-full items-center justify-center px-3 py-2">
          <Form />
        </div>
      </div>
      <Footer />
    </div>
  );
}
