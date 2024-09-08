import { api, HydrateClient } from "@/trpc/server";
import PageClient from "./page-client";
import { redirect } from "next/navigation";

type Props = {
  params: {
    username: string;
  };
};

export default async function page({ params: { username } }: Props) {
  const userId = await api.account.getUserId({ username });
  const currentUser = await api.user.getUser();
  if (userId === currentUser.id) {
    redirect("/profile");
  }

  void api.account.getUserInfo.prefetch({ userId });

  if (!userId) {
    return (
      <div>
        <p>The account cannot be found!</p>
      </div>
    );
  }

  return (
    <HydrateClient>
      <PageClient userId={userId} />
    </HydrateClient>
  );
}
