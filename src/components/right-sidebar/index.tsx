import React from "react";
import { navbarHeight } from "../navbar/shared";
import Whotofollow from "./who-to-follow";
import { api } from "@/trpc/server";

export default async function RightSidebar() {
  const whoToFollowData = await api.user.getWhoToFollow();

  return (
    <aside
      style={{ height: `calc(100dvh - ${navbarHeight} - 1px)` }}
      className="sticky left-0 top-[60px] hidden w-[30%] flex-col gap-10 py-5 md:flex"
    >
      <Whotofollow initialData={whoToFollowData} />
      <Trendingtopics />
    </aside>
  );
}

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
