import { api, HydrateClient } from "@/trpc/server";
import React from "react";
import PageClient from "./page-client";

type Props = {
  params: {
    tag: string;
  };
};

export default async function page({ params: { tag } }: Props) {
  void api.post.getPostsFromTag.prefetch({ tag });

  return (
    <HydrateClient>
      <PageClient tag={tag} />
    </HydrateClient>
  );
}
