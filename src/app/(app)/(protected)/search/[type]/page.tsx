import { HydrateClient } from "@/trpc/server";
import React from "react";
import Accounts from "./_components/accounts";
import Tags from "./_components/tags";

export function generateStaticParams() {
  return [{ type: "accounts" }, { type: "tags" }];
}

type Props = {
  params: {
    type: string;
  };
};

export default function page({ params }: Props) {
  if (params.type === "accounts") {
    return (
      <HydrateClient>
        <Accounts />
      </HydrateClient>
    );
  }

  return (
    <HydrateClient>
      <Tags />
    </HydrateClient>
  );
}
