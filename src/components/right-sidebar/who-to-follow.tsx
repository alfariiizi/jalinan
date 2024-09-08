"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { api, type RouterOutputs } from "@/trpc/react";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

type Props = {
  initialData: RouterOutputs["user"]["getWhoToFollow"];
};

export default function Whotofollow({ initialData }: Props) {
  const { data: accounts } = api.user.getWhoToFollow.useQuery(undefined, {
    initialData,
  });

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Who to follow</h2>
      <div className="space-y-4">
        {accounts.map((account) => (
          <div
            key={account.username}
            className="flex items-center justify-between gap-4 rounded-lg bg-background px-4 py-2"
          >
            <Link
              href={`/users/${account.username}`}
              className="group flex items-center gap-3"
            >
              <Image
                src="/images/placeholder-user.png"
                alt="placeholder"
                width={50}
                height={50}
                className="aspect-square size-[50px] rounded-full"
              />
              <div className="text-sm">
                <p className="line-clamp-1 font-semibold group-hover:underline group-hover:underline-offset-2">
                  {account.name}
                </p>
                <p className="line-clamp-1 text-gray-700">
                  @{account.username}
                </p>
              </div>
            </Link>
            <FollowButton userId={account.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

function FollowButton({ userId }: { userId: string }) {
  const utils = api.useUtils();
  const { data: isFollow } = api.user.isFollow.useQuery({
    followUserId: userId,
  });
  const mutation = api.user.follow.useMutation({
    async onSuccess(_, { followUserId }) {
      await utils.user.getWhoToFollow.invalidate();
      await utils.user.isFollow.invalidate({ followUserId });
      await utils.account.getUserInfo.invalidate({ userId: followUserId });
      await utils.account.getUserInfo.invalidate({ currentUser: true });
    },
  });

  if (typeof isFollow === "undefined") {
    return <Skeleton className="h-[40px] w-[76px]" />;
  }

  return (
    <Button
      variant={isFollow ? "secondary" : "default"}
      onClick={async () => {
        await mutation.mutateAsync({ followUserId: userId });
      }}
      isLoading={mutation.isPending}
    >
      {isFollow ? "Following" : "Follow"}
    </Button>
  );
}
