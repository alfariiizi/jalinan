import React from "react";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function PostSkeleton() {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex gap-3">
        <Skeleton className="aspect-square w-[50px] rounded-full" />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Skeleton className="h-[28px] w-[160px]" />
            <Skeleton className="hidden h-[20px] w-[110px] md:block" />
          </div>
          <Skeleton className="h-[16px] w-[74px]" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-[20px] w-full" />
        <Skeleton className="h-[20px] w-full" />
      </div>
      {/* <pre className="max-w-full text-wrap font-sans text-sm leading-[1.4rem] text-gray-800"> */}
      {/*   {messages} */}
      {/* </pre> */}
      <div className="flex items-center gap-5">
        <Skeleton className="h-[20px] w-[33px]" />
        <Skeleton className="h-[20px] w-[33px]" />
        <Skeleton className="h-[38px] w-full" />
      </div>
    </Card>
  );
}
