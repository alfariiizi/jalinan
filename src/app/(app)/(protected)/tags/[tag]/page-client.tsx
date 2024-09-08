"use client";

import Post from "@/components/post";
import { api } from "@/trpc/react";
import React from "react";

type Props = {
  tag: string;
};

export default function PageClient({ tag }: Props) {
  const [posts] = api.post.getPostsFromTag.useSuspenseQuery({ tag });

  return (
    <div className="flex w-full flex-col gap-7">
      <div className="flex items-center justify-center rounded-lg bg-background px-6 py-5">
        <p className="text-center text-xl font-semibold">Tag: #{tag}</p>
      </div>
      {posts.map((post) => (
        <Post
          key={post.id}
          postId={post.id}
          avatarImgSrc={post.user.avatarUrl}
          username={post.user.username}
          name={post.user.name}
          date={post.createdAt}
          messages={post.content}
          // likesAmount={post.likes.length}
          commentAmount={post.comments.length}
          attachmentImgSrc={post.attachments.map((attach) => attach.url)}
        />
      ))}
    </div>
  );
}
