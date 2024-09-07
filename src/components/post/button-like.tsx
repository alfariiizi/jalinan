"use client";

import { formatNumber } from "@/lib/utils";
import { api } from "@/trpc/react";
import React from "react";
import HeartIcon from "./heart-icon";

type Props = {
  postId: string;
};

export default function ButtonLike({ postId }: Props) {
  const utils = api.useUtils();

  const mutation = api.post.updateLikes.useMutation({
    async onSuccess(_, { postId }) {
      await utils.post.getIsLike.invalidate({ postId });
      await utils.post.getLikesAmount.invalidate({ postId });
    },
    async onMutate({ postId }) {
      await utils.post.getIsLike.cancel({ postId });
      await utils.post.getLikesAmount.cancel({ postId });

      const previousLikesAmount = utils.post.getLikesAmount.getData({
        postId,
      });
      const previousIsLike = utils.post.getIsLike.getData({
        postId,
      });

      utils.post.getLikesAmount.setData({ postId: postId }, (oldData) => {
        return oldData ?? 0 + 1;
      });
      return {
        previousIsLike,
        previousLikesAmount,
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
        <Like postId={postId} />
      </button>
      <LikeAmount postId={postId} />
    </div>
  );
}

function Like({ postId }: { postId: string }) {
  const { data: isLike, isLoading } = api.post.getIsLike.useQuery({ postId });

  if (isLoading) {
    return <HeartIcon />;
  }

  return <HeartIcon isLike={isLike} />;
}

function LikeAmount({ postId }: { postId: string }) {
  const [likesAmount] = api.post.getLikesAmount.useSuspenseQuery({ postId });

  return <p className="text-sm text-gray-700">{formatNumber(likesAmount)}</p>;
}
