"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/app/(app)/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";

export default function LogoutButton() {
  const router = useRouter();
  const utils = api.useUtils();

  return (
    <Button
      variant="destructive"
      className="h-full w-full"
      onClick={async () => {
        const res = await logout();
        if (res) {
          toast.success("Logged out!");
          await utils.invalidate();
          router.push("/login");
        }
      }}
    >
      Logout
    </Button>
  );
}
