"use client";

import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { LuSearch } from "react-icons/lu";
import { useState } from "react";
import { useSearch } from "@/app/(app)/(protected)/search/_hooks/use-search";

export default function InputSearch() {
  const router = useRouter();
  const [querySearch] = useSearch();
  const [search, setSearch] = useState(querySearch);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const searchParams = new URLSearchParams({ search });
        router.push(`/search/accounts?${searchParams.toString()}`);
      }}
      className="relative w-full"
    >
      <Input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-full border-primary bg-transparent pl-8"
        required
        placeholder="Search friends or tags"
      />
      <LuSearch className="absolute left-2 top-1/2 -translate-y-1/2 stroke-gray-600 text-lg" />
    </form>
  );
}
