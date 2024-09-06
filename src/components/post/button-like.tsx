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
  const [isLike] = api.post.getIsLike.useSuspenseQuery({ postId });
  const [likesAmount] = api.post.getLikesAmount.useSuspenseQuery({ postId });

  const mutation = api.post.updateLikes.useMutation({
    async onSuccess(_, { postId }) {
      await utils.post.getIsLike.invalidate({ postId });
      await utils.post.getLikesAmount.invalidate({ postId });
    },
    async onMutate({ postId }) {
      await utils.post.getIsLike.cancel({ postId });
      await utils.post.getLikesAmount.cancel({ postId });

      // const previousLikesAmount = utils.post.getLikesAmount.getData({
      //   postId,
      // });
      // const previousIsLike = utils.post.getIsLike.getData({
      //   postId,
      // });

      utils.post.getLikesAmount.setData({ postId: postId }, (oldData) => {
        return oldData ?? 0 + 1;
      });
      return {
        previousIsLike: isLike,
        previousLikesAmount: likesAmount,
      };
    },
    onError(_, variables, context) {
      utils.post.getIsLike.setQueriesData(
        { postId: variables.postId },
        {},
        context?.previousIsLike,
      );
      utils.post.getLikesAmount.setQueriesData(
        { postId: variables.postId },
        {},
        context?.previousLikesAmount,
      );
    },
    async onSettled(_data, _error, variables) {
      await utils.post.getIsLike.invalidate({ postId: variables.postId });
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
          className={cn("size-5 stroke-rose-500", isLike && "fill-rose-500")}
        />
      </button>
      <p className="text-sm text-gray-700">{formatNumber(likesAmount)}</p>
    </div>
  );
}
