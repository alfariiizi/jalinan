"use client";

import { api } from "@/trpc/react";
import { useSearch } from "../../_hooks/use-search";
import Link from "next/link";

export default function Tags() {
  const [search] = useSearch();
  const [tags] = api.tag.getFindTags.useSuspenseQuery({ search });

  if (tags.length === 0) {
    return (
      <div className="flex w-full items-center justify-center">
        <p>No tags found!</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-2">
      {tags.map((tag) => (
        <Link
          href={`/tags/${tag}`}
          key={tag}
          className="group w-full rounded-md bg-background px-3 py-2"
        >
          <p className="text-base font-semibold group-hover:underline group-hover:underline-offset-2">
            #{tag}
          </p>
        </Link>
      ))}
    </div>
  );
}
