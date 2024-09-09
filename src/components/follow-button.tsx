"use client";

import { type MouseEventHandler } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";

type FollowButtonProps = {
  userId: string;
  className?: string;
};

export function FollowButton({ userId, className }: FollowButtonProps) {
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
    <FollowButtonUI
      isFollow={isFollow}
      className={className}
      isLoading={mutation.isPending}
      onClick={async () => {
        await mutation.mutateAsync({ followUserId: userId });
      }}
    />
  );
}

export function FollowButtonSuspense({ userId, className }: FollowButtonProps) {
  const utils = api.useUtils();
  const [isFollow] = api.user.isFollow.useSuspenseQuery({
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

  return (
    <FollowButtonUI
      isFollow={isFollow}
      className={className}
      isLoading={mutation.isPending}
      onClick={async () => {
        await mutation.mutateAsync({ followUserId: userId });
      }}
    />
  );
}

type FollowButtonUIProps = {
  isFollow?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  isLoading?: boolean;
  className?: string;
};

export function FollowButtonUI({
  isFollow,
  className,
  isLoading,
  onClick,
}: FollowButtonUIProps) {
  return (
    <Button
      variant={isFollow ? "secondary" : "default"}
      onClick={onClick}
      isLoading={isLoading}
      className={cn(className)}
    >
      {isFollow ? "Following" : "Follow"}
    </Button>
  );
}

export function FollowButtonUISkeleton() {
  return <Skeleton className="h-[40px] w-[76px]" />;
}
