"use client";

import { api } from "@/trpc/react";
import Link from "next/link";

export default function Trendingtopics() {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Trending topics</h2>
      <div className="flex flex-col gap-3 rounded-lg bg-white px-4 py-3">
        {/* <p>Coming soon</p> */}
        <Tags />
      </div>
    </div>
  );
}

function Tags() {
  const [tags] = api.tag.getRecentTags.useSuspenseQuery();
  return tags.map((tag) => (
    <Link href={`/tags/${tag.tag}`} key={tag.tag} className="">
      <p className="text-sm font-semibold">#{tag.tag}</p>
      <p className="text-xs text-gray-700">{tag.amount} posts</p>
    </Link>
  ));
}
