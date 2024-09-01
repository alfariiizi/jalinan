"use client";

import { cn, formatNumber } from "@/lib/utils";
import { api } from "@/trpc/react";
import React from "react";
import { LuHeart } from "react-icons/lu";

type Props = {
  postId: string;
};

export default function ButtonLike({ postId }: Props) {
  const utils = api.useUtils();
  const isLike = api.post.getIsLike.useQuery({ postId });
  const likesAmount = api.post.getLikesAmount.useQuery({ postId });
  const mutation = api.post.updateLikes.useMutation({
    async onSuccess() {
      await utils.post.getIsLike.invalidate();
    },
    async onMutate(variables) {
      await utils.post.getLikesAmount.cancel();
      const prevousData = utils.post.getLikesAmount.getData({
        postId: variables.postId,
      });
      utils.post.getLikesAmount.setData(
        { postId: variables.postId },
        (oldData) => {
          return oldData ?? 0 + 1;
        },
      );
      return {
        prevousData,
      };
    },
    onError(_, variables, context) {
      utils.post.getLikesAmount.setQueriesData(
        { postId: variables.postId },
        {},
        context?.prevousData,
      );
    },
    async onSettled(_data, _error, variables) {
      await utils.post.getLikesAmount.invalidate({ postId: variables.postId });
    },
  });

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={async () => {
          await mutation.mutateAsync({ postId });
        }}
      >
        <LuHeart
          className={cn(
            "size-5 stroke-rose-500",
            isLike.data && "fill-rose-500",
          )}
        />
      </button>
      <p className="text-sm text-gray-700">
        {formatNumber(likesAmount.data ?? 0)}
      </p>
    </div>
  );
}
