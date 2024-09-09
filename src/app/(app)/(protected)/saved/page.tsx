import { api, HydrateClient } from "@/trpc/server";
import PageCLient from "./page-client";

export default async function page() {
  void api.post.getAllBookmarkedPosts.prefetch();

  return (
    <HydrateClient>
      <PageCLient />
    </HydrateClient>
  );
}
