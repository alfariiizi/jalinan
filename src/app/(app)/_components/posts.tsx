"use client";

import Post from "@/components/post";
import PostSkeleton from "@/components/post/post-skeleton";
import { api } from "@/trpc/react";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect } from "react";

export function Posts() {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });
  const {
    data: allPosts,
    // isFetching,
    // isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = api.post.getAllPosts.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      // initialData: { pages: [{}] },
      // initialCursor: 1, // <-- optional you can pass an initialCursor
    },
  );

  useEffect(() => {
    async function fetch() {
      if (entry?.isIntersecting) {
        await fetchNextPage();
      }
    }

    void fetch();
  }, [entry?.isIntersecting, fetchNextPage]);

  if (!allPosts) {
    return (
      <>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </>
    );
  }

  const posts = allPosts.pages.flatMap((item) => item.posts);

  if (posts.length === 0) {
    return <EmptyContent />;
  }
  return (
    <>
      {posts.map((post, index, array) => {
        return (
          <>
            {index === array.length - 1 && (
              <div ref={ref} className="-my-3.5" />
            )}
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
          </>
        );
      })}
      {hasNextPage && <PostSkeleton />}
    </>
  );

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
