import Post from "@/components/post";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import React from "react";
import { LuImage } from "react-icons/lu";

export default async function page() {
  return (
    <div className="flex w-full flex-col gap-10">
      <CreatePost />
      {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        [...new Array(8)].fill(0).map((_, index) => (
          <Post
            key={`post-number-${index + 1}`}
            name="John Wich"
            username="johnbabayaga"
            date={new Date("2024-08-14")}
            likesAmount={1200}
            commentAmount={300}
            messages="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada, nisi eget egestas ultrices, turpis est tincidunt dui, et mollis justo ante quis velit. Etiam ac condimentum sem, vel ultricies enim."
          />
        ))
      }
    </div>
  );
}

function CreatePost() {
  return (
    <div className="flex h-fit w-full flex-col gap-3 rounded-lg bg-background px-6 py-4">
      <div className="flex items-start gap-4">
        <Image
          src={"/images/placeholder-user.png"}
          alt="placeholder"
          width={40}
          height={40}
          className="aspect-square size-[40px] rounded-full"
        />
        <Textarea placeholder="What on your mind?" className="h-fit" />
      </div>
      <div className="flex items-center gap-3 self-end text-gray-600">
        <LuImage className="size-8" />
        <Button className="w-fit px-6">Post</Button>
      </div>
    </div>
  );
}
