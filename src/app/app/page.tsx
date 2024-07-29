import { api } from "@/trpc/server";
import React from "react";
import LogoutButton from "./LogoutButton";

export default async function page() {
  const user = await api.user.getuser();
  return (
    <div>
      <p>email: {user?.email}</p>
      <p>username: {user?.username}</p>
      <LogoutButton />
    </div>
  );
}
