"use client";

import { Button } from "@/components/ui/button";
import { logout } from "./actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <Button
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
