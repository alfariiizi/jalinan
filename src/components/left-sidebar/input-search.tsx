"use client";

import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { LuSearch } from "react-icons/lu";
import { useState } from "react";

export default function InputSearch() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const searchParams = new URLSearchParams({ search });
        router.push(`/search?${searchParams.toString()}`);
      }}
      className="relative hidden w-full md:block"
    >
      <Input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-sm border-primary bg-transparent pl-8"
        placeholder="Search friends or tags"
      />
      <LuSearch className="absolute left-2 top-1/2 -translate-y-1/2 stroke-gray-600 text-lg" />
    </form>
  );
}
