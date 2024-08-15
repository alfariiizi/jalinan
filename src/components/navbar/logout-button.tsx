"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/app/(app)/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <Button
      variant="destructive"
      className="h-full w-full"
      onClick={async () => {
        const res = await logout();
        if (res) {
          toast.success("Logged out!");
          router.push("/login");
        }
      }}
    >
      Logout
    </Button>
  );
}
