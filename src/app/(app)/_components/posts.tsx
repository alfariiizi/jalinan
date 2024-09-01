"use client";

import Post from "@/components/post";
import { api } from "@/trpc/react";

export function Posts() {
  const [posts] = api.post.getAllPosts.useSuspenseQuery();

  if (posts.length === 0) {
    return <EmptyContent />;
  }
  return posts.map((post) => (
    <Post
      key={post.id}
      postId={post.id}
      avatarImgSrc={post.user.avatarUrl}
      username={post.user.username}
      name={post.user.name}
      date={post.createdAt}
      messages={post.content}
      likesAmount={post.likes.length}
      commentAmount={post.comments.length}
      attachmentImgSrc={post.attachments.map((attach) => attach.url)}
    />
  ));

  // return posts.map((post) => (
  //   <Post
  //     key={post.id}
  //     avatarImgSrc={post.user.avatarUrl}
  //     username={post.user.username}
  //     name={post.user.name}
  //     date={post.user.createdAt}
  //     messages={post.content}
  //     likesAmount={post.likes.length}
  //     commentAmount={post.comments.length}
  //     attachmentImgSrc={post.attachments.map((attach) => attach.url)}
  //   />
  // ));
}

function EmptyContent() {
  return (
    <div className="flex items-center justify-center">
      <p>You have no posts</p>
    </div>
  );
}
