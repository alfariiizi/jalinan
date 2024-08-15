import Image from "next/image";
import React from "react";
import { LuHeart, LuMessageCircle } from "react-icons/lu";

type Props = {
  type: "like" | "comment";
  imgSrc?: string;
  name: string;
  message: string;
};

export default function NotificationItem({
  type,
  imgSrc,
  name,
  message,
}: Props) {
  const Icon =
    type === "like" ? (
      <LuHeart className="block aspect-square min-w-[40px] fill-rose-500 stroke-rose-500" />
    ) : (
      <LuMessageCircle className="block aspect-square min-w-[40px] fill-blue-700 stroke-blue-700" />
    );
  const notifMessage =
    type === "like" ? "liked your post" : "commented on your post";

  return (
    <div className="card card-row items-start justify-start gap-3 duration-100 hover:bg-primary/5">
      {Icon}
      <div className="flex w-full max-w-full flex-col gap-3">
        <Image
          src={imgSrc ?? "/images/placeholder-user.png"}
          alt="placeholder"
          width={40}
          height={40}
          className="aspect-square size-[40px] rounded-full"
        />
        <p className="text-gray-800">
          <strong>{name}</strong> {notifMessage}
        </p>
        <p className="line-clamp-[6] min-w-0 text-gray-600">{message}</p>
      </div>
    </div>
  );
}
