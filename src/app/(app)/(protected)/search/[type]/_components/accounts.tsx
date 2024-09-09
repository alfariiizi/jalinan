"use client";

import React from "react";
import { useSearch } from "../../_hooks/use-search";
import { api } from "@/trpc/react";
import Link from "next/link";
import Image from "next/image";

export default function Accounts() {
  const [search] = useSearch();
  const [accounts] = api.account.getFindUsers.useSuspenseQuery({ search });

  if (accounts.length === 0) {
    return (
      <div className="flex w-full items-center justify-center">
        <p>No accounts found!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="space-y-4">
        {accounts.map((account) => (
          <Link
            key={account.username}
            href={`/users/${account.username}`}
            className="group flex items-center justify-between gap-4 rounded-lg bg-background px-4 py-2"
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
                <p className="line-clamp-1 font-semibold group-hover:underline group-hover:underline-offset-2">
                  {account.name}
                </p>
                <p className="line-clamp-1 text-gray-700">
                  @{account.username}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
