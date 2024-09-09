"use client";

import Post from "@/components/post";
import { api } from "@/trpc/react";

export default function PageCLient() {
  const [posts] = api.post.getAllBookmarkedPosts.useSuspenseQuery();

  if (posts.length === 0) {
    return (
      <div className="flex w-full items-center justify-center">
        <p>No posts has been saved!</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-7">
      <div className="flex items-center justify-center rounded-lg bg-background px-6 py-5">
        <p className="text-center text-xl font-semibold">Saved Posts</p>
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
