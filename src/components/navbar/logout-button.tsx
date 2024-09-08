"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/app/(app)/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { LuLogOut } from "react-icons/lu";

export default function LogoutButton() {
  const router = useRouter();
  const utils = api.useUtils();

  return (
    <Button
      variant="destructive"
      className="h-full w-full gap-2 bg-destructive/20 text-destructive hover:bg-destructive/30"
      onClick={async () => {
        const res = await logout();
        if (res) {
          toast.success("Logged out!");
          await utils.invalidate();
          router.push("/login");
        }
      }}
    >
      <LuLogOut className="size-4" />
      Logout
    </Button>
  );
}
