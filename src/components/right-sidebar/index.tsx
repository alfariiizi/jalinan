import React from "react";
import { navbarHeight } from "../navbar/shared";
import Whotofollow from "./who-to-follow";
import { api, HydrateClient } from "@/trpc/server";
import Trendingtopics from "./trending-topics";

export default async function RightSidebar() {
  void api.user.getWhoToFollow.prefetch();
  void api.tag.getRecentTags.prefetch();

  return (
    <HydrateClient>
      <aside
        style={{ height: `calc(100dvh - ${navbarHeight} - 1px)` }}
        className="sticky left-0 top-[60px] hidden w-[30%] flex-col gap-10 py-5 md:flex"
      >
        <Whotofollow />
        <Trendingtopics />
      </aside>
    </HydrateClient>
  );
}
