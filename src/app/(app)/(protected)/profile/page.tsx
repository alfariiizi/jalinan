import { api, HydrateClient } from "@/trpc/server";
import PageClient from "./page-client";

export default async function page() {
  void api.account.getUserInfo.prefetch({ currentUser: true });

  return (
    <HydrateClient>
      <PageClient />
    </HydrateClient>
  );
}
