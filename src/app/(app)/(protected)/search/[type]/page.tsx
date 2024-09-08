import { HydrateClient } from "@/trpc/server";
import React from "react";
import Accounts from "./_components/accounts";

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
      <div>Tag</div>
    </HydrateClient>
  );
}
