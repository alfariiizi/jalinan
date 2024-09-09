"use client";

import { UserInfo, UserPage, UserPosts } from "@/components/user-page";
import { api } from "@/trpc/react";

export default function PageClient() {
  const [user] = api.account.getUserInfo.useSuspenseQuery({
    currentUser: true,
  });

  if (!user) {
    return null;
  }

  return (
    <UserPage>
      <UserInfo
        id={user.id}
        currentUser
        username={user.username}
        createdDate={user.createdAt}
        name={user.name}
        bio={user.bio}
        postsAmount={user.posts.length}
        followingAmount={user.following.length}
        followerAmount={user.followers.length}
      />
      <UserPosts userId={user.id} />
    </UserPage>
  );
}
