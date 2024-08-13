import React from "react";
import Image from "next/image";
import { LuHeart, LuMessageCircle } from "react-icons/lu";
import { Input } from "./ui/input";
import { dateToDiffString, formatNumber } from "@/lib/utils";

type Props = {
  imgSrc?: string;
  name: string;
  username: string;
  date: Date | string;
  messages?: string;
  likesAmount?: number;
  commentAmount?: number;
};

export default function Post({
  imgSrc,
  name,
  username,
  date,
  messages,
  likesAmount,
  commentAmount,
}: Props) {
  const dateInput = typeof date === "string" ? new Date(date) : date;

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg bg-background px-6 py-5">
      <div className="flex gap-3">
        <Image
          src={imgSrc ?? "/images/placeholder-user.png"}
          alt="placeholder"
          width={50}
          height={50}
          className="aspect-square size-[50px] rounded-full"
        />
        <div className="">
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold">{name}</p>
            <p className="text-sm text-gray-700">@{username}</p>
          </div>
          <p className="text-xs text-gray-800">{dateToDiffString(dateInput)}</p>
        </div>
      </div>
      <p className="text-sm leading-[1.4rem] text-gray-800">{messages}</p>
      <Image
        src={"/images/placeholder.webp"}
        alt="placeholder"
        width={1000}
        height={700}
        className="max-h-[300px] w-full max-w-full object-contain"
      />
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1">
          <LuHeart className="size-5 stroke-rose-500" />
          <p className="text-sm text-gray-700">
            {likesAmount ? formatNumber(likesAmount) : 0}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <LuMessageCircle className="size-5 stroke-blue-700" />
          <p className="text-sm text-gray-700">
            {commentAmount ? formatNumber(commentAmount) : 0}
          </p>
        </div>
        <Input placeholder="Write your comment" className="rounded-full" />
      </div>
    </div>
  );
}
