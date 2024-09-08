"use client";

import { UserInfo, UserPage, UserPosts } from "@/components/user-page";
import { api } from "@/trpc/react";

type Props = {
  userId: string;
};

export default function PageClient({ userId }: Props) {
  const [user] = api.account.getUserInfo.useSuspenseQuery({
    userId,
  });

  if (!user) {
    return null;
  }

  return (
    <UserPage>
      <UserInfo
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
