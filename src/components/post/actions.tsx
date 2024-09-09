"use client";

import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiDotsVertical } from "react-icons/hi";
import { LuBookmark } from "react-icons/lu";
import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";

type Props = { postId: string };

export default function Actions({ postId }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="">
        <HiDotsVertical className="size-4 text-gray-500 duration-150 hover:text-gray-700" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Save postId={postId} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type SaveProps = {
  postId: string;
};

function Save({ postId }: SaveProps) {
  const utils = api.useUtils();
  const { data: isSaved } = api.user.getIsPostSaved.useQuery({ postId });
  const mutation = api.user.toggleSavePost.useMutation({
    async onSuccess(_, variables) {
      await utils.user.getIsPostSaved.invalidate(variables);
      await utils.post.getAllBookmarkedPosts.invalidate();
    },
  });

  if (typeof isSaved === "undefined") {
    return null;
  }

  return (
    <DropdownMenuItem
      onClick={async () => {
        await mutation.mutateAsync({ postId: postId });
      }}
      className="inline-flex w-full cursor-pointer items-center gap-2"
    >
      <LuBookmark className={cn("size-3", isSaved && "fill-foreground")} />{" "}
      <p>{isSaved ? "Saved" : "Save"}</p>
    </DropdownMenuItem>
  );
}
