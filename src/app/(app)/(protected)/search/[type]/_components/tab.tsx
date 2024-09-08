"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

import React from "react";
import { useSearch } from "../../_hooks/use-search";

type Props = {
  currentValue: string;
};

export default function Tab({ currentValue }: Props) {
  const router = useRouter();
  const [search] = useSearch();

  return (
    <Tabs
      value={currentValue}
      defaultValue="accounts"
      className="w-full"
      onValueChange={(val) => {
        const searchParams = new URLSearchParams({ search: search ?? "" });
        router.push(`/search/${val}?${searchParams.toString()}`);
      }}
    >
      <TabsList className="h-12 w-full border-2 border-primary/30">
        <TabsTrigger
          className="h-full w-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          value="accounts"
        >
          Accounts
        </TabsTrigger>
        <TabsTrigger
          className="h-full w-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          value="tags"
        >
          Tags
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
