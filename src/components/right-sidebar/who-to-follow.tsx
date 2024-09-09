"use client";

import Image from "next/image";
import { api } from "@/trpc/react";
import Link from "next/link";
import { FollowButton } from "../follow-button";

// type Props = {
//   initialData: RouterOutputs["user"]["getWhoToFollow"];
// };

export default function Whotofollow() {
  // const { data: accounts } = api.user.getWhoToFollow.useQuery(undefined, {
  //   initialData,
  // });
  const [accounts] = api.user.getWhoToFollow.useSuspenseQuery();

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Who to follow</h2>
      <div className="space-y-4">
        {accounts.map((account) => (
          <div
            key={account.username}
            className="flex items-center justify-between gap-4 rounded-lg bg-background px-4 py-2"
          >
            <Link
              href={`/users/${account.username}`}
              className="group flex items-center gap-3"
            >
              <Image
                src="/images/placeholder-user.png"
                alt="placeholder"
                width={50}
                height={50}
                className="aspect-square size-[50px] rounded-full"
              />
              <div className="text-sm">
                <p className="line-clamp-1 font-semibold group-hover:underline group-hover:underline-offset-2">
                  {account.name}
                </p>
                <p className="line-clamp-1 text-gray-700">
                  @{account.username}
                </p>
              </div>
            </Link>
            <FollowButton userId={account.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
