import React from "react";
import { navbarHeight } from "../navbar/shared";
import Link from "next/link";
import { api, HydrateClient } from "@/trpc/server";
import Whotofollow from "./who-to-follow";

export default function RightSidebar() {
  void api.user.getWhoToFollow.prefetch();

  return (
    <aside
      style={{ height: `calc(100dvh - ${navbarHeight} - 1px)` }}
      className="sticky left-0 top-[60px] hidden w-[30%] flex-col gap-10 py-5 md:flex"
    >
      <HydrateClient>
        <Whotofollow />
      </HydrateClient>
      <Trendingtopics />
    </aside>
  );
}

const tags = [
  {
    name: "epl",
    value: 4,
  },
  {
    name: "liverpool",
    value: 20,
  },
  {
    name: "indonesia",
    value: 28,
  },
  {
    name: "thewitcher",
    value: 10,
  },
  {
    name: "marvel",
    value: 18,
  },
];

function Trendingtopics() {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Trending topics</h2>
      <div className="flex flex-col gap-3 rounded-lg bg-white px-4 py-3">
        <p>Coming soon</p>
        {/* {tags.map((tag) => ( */}
        {/*   <Link href={`/tags/${tag.name}`} key={tag.name} className=""> */}
        {/*     <p className="text-sm font-semibold">#{tag.name}</p> */}
        {/*     <p className="text-xs text-gray-700">{tag.value} posts</p> */}
        {/*   </Link> */}
        {/* ))} */}
      </div>
    </div>
  );
}
