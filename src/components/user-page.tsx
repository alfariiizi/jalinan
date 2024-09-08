"use client";

import Post from "@/components/post";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import Image from "next/image";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type UserProps = {
  children: ReactNode;
  className?: string;
};

export function UserPage({ children, className }: UserProps) {
  return (
    <div className={cn("flex w-full flex-col gap-7", className)}>
      {children}
    </div>
  );
}

type UserInfoProps = {
  name: string;
  username: string;
  createdDate: Date | string;
  bio?: string | null;
  postsAmount: number;
  followingAmount: number;
  followerAmount: number;
  currentUser?: boolean;
};

export function UserInfo({
  name,
  username,
  createdDate,
  bio,
  postsAmount,
  followingAmount,
  followerAmount,
  currentUser,
}: UserInfoProps) {
  const date =
    typeof createdDate === "string" ? new Date(createdDate) : createdDate;
  const userCreatedDateString = format(date, "MMMM d, y");

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-background px-6 py-5">
      <Image
        src={"/images/placeholder-user.png"}
        alt="placeholder"
        width={140}
        height={140}
        className="aspect-square w-[140px] rounded-full"
      />
      <div className="flex justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold">{name}</h2>
          <p className="text-gray-700">@{username}</p>
        </div>
        {currentUser && <Button variant="outline">Edit Profile</Button>}
      </div>
      <div className="flex items-center justify-between gap-8">
        <p className="text-sm text-gray-800">
          Member since {userCreatedDateString}
        </p>
      </div>
      <p className="my-5 text-sm leading-[1.4rem] text-gray-800">
        {bio ?? "No bio"}
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Posts</TableHead>
            <TableHead className="text-center">Following</TableHead>
            <TableHead className="text-center">Followers</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-center">{postsAmount}</TableCell>
            <TableCell className="text-center">{followingAmount}</TableCell>
            <TableCell className="text-center">{followerAmount}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

type UserPostsProps = {
  userId: string;
};

export function UserPosts({ userId }: UserPostsProps) {
  return (
    <>
      <div className="flex items-center justify-center rounded-lg bg-background px-6 py-5">
        <p className="text-center text-xl font-semibold">All Posts</p>
      </div>
      <Posts userId={userId} />
    </>
  );
}

function Posts({ userId }: UserPostsProps) {
  const [posts] = api.account.getUserPosts.useSuspenseQuery({ userId });

  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <p>Have no posts</p>
      </div>
    );
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
      // likesAmount={post.likes.length}
      commentAmount={post.comments.length}
      attachmentImgSrc={post.attachments.map((attach) => attach.url)}
    />
  ));
}
