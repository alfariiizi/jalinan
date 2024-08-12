import React from "react";
import { navbarHeight } from "../navbar/shared";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function RightSidebar() {
  return (
    <aside
      style={{ height: `calc(100dvh - ${navbarHeight} - 1px)` }}
      className="sticky left-0 top-[60px] flex w-[30%] flex-col gap-10 py-5"
    >
      <Whotofollow />
      <Trendingtopics />
    </aside>
  );
}

const accountData = [
  {
    name: "Leonardo Decaprio",
    username: "@leonardo",
  },
  {
    name: "Ronaldo Nazario",
    username: "@ronaldo9",
  },
  {
    name: "Mohammed Salah",
    username: "@mosalah11",
  },
];

function Whotofollow() {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Who to follow</h2>
      <div className="space-y-4">
        {accountData.map((account) => (
          <div
            key={account.username}
            className="flex items-center justify-between gap-4 rounded-lg bg-background px-4 py-2"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/images/placeholder-user.png"
                alt="placeholder"
                width={50}
                height={50}
                className="aspect-square size-[50px] rounded-full"
              />
              <div className="text-sm">
                <p className="line-clamp-1 font-semibold">{account.name}</p>
                <p className="line-clamp-1 text-gray-700">{account.username}</p>
              </div>
            </div>
            <Button>Follow</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

const tags = [
  {
    name: "epl",
    value: 4,
  },
  {
    name: "liverpool",
    value: 20,
  },
  {
    name: "indonesia",
    value: 28,
  },
  {
    name: "thewitcher",
    value: 10,
  },
  {
    name: "marvel",
    value: 18,
  },
];

function Trendingtopics() {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Trending topics</h2>
      <div className="flex flex-col gap-3 rounded-lg bg-white px-4 py-3">
        {tags.map((tag) => (
          <Link href={`/tags/${tag.name}`} key={tag.name} className="">
            <p className="text-sm font-semibold">#{tag.name}</p>
            <p className="text-xs text-gray-700">{tag.value} posts</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
