import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default async function page() {
  return (
    <div className="flex h-[1000vh] w-full flex-col gap-6">
      <Post />
      <div className="h-[300px] w-full rounded bg-background">
        <p>Page</p>
      </div>
      <div className="h-[300px] w-full rounded bg-background">
        <p>Page</p>
      </div>
      <div className="h-[300px] w-full rounded bg-background">
        <p>Page</p>
      </div>
      <div className="h-[300px] w-full rounded bg-background">
        <p>Page</p>
      </div>
    </div>
  );
}

function Post() {
  return (
    <div className="flex h-fit w-full items-start gap-4 rounded bg-background px-6 py-4">
      <div className="aspect-square size-10 w-fit rounded-full bg-gray-600" />
      <Textarea placeholder="What on your mind?" className="h-fit" />
    </div>
  );
}
