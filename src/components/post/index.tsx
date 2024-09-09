import Image from "next/image";
import { LuMessageCircle } from "react-icons/lu";
import { Input } from "../ui/input";
import { dateToDiffString, formatNumber } from "@/lib/utils";
import { Card } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ButtonLike from "./button-like";
import { parseHashTagsAndLinks } from "./parseHashTagsAndLinks";

export type PostProps = {
  postId: string;
  avatarImgSrc?: string | null;
  attachmentImgSrc?: string | string[];
  name: string;
  username: string;
  date: Date | string;
  messages?: string;
  commentAmount?: number;
};

export default function Post({
  postId,
  avatarImgSrc,
  attachmentImgSrc,
  name,
  username,
  date,
  messages,
  commentAmount,
}: PostProps) {
  const dateInput = typeof date === "string" ? new Date(date) : date;

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex gap-3">
        <Image
          src={avatarImgSrc ?? "/images/placeholder-user.png"}
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
      <pre className="max-w-full text-wrap font-sans text-sm leading-[1.4rem] text-gray-800">
        {parseHashTagsAndLinks(messages ?? "")}
      </pre>
      {attachmentImgSrc && typeof attachmentImgSrc === "string" && (
        <Image
          src={attachmentImgSrc}
          alt={`${name}-${username}-${attachmentImgSrc}`}
          width={1000}
          height={700}
          className="max-h-[300px] w-full max-w-full object-contain"
        />
      )}
      {attachmentImgSrc &&
        typeof attachmentImgSrc !== "string" &&
        attachmentImgSrc.length !== 0 && (
          <Carousel>
            <CarouselContent>
              {attachmentImgSrc.map((img) => (
                <CarouselItem key={img}>
                  <Image
                    src={img}
                    alt={`${name}-${username}-${img}`}
                    width={1000}
                    height={700}
                    className="max-h-[300px] w-full max-w-full object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      <div className="flex items-center gap-5">
        <ButtonLike postId={postId} />
        <div className="flex items-center gap-1">
          <LuMessageCircle className="size-5 stroke-blue-700" />
          <p className="text-sm text-gray-700">
            {commentAmount ? formatNumber(commentAmount) : 0}
          </p>
        </div>
        <Input
          placeholder="Write your comment"
          className="h-fit rounded-full text-sm"
        />
      </div>
    </Card>
  );
}
