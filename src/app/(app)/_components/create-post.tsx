"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const utils = api.useUtils();

  const mutation = api.user.createPost.useMutation({
    async onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        await utils.post.getAllPosts.invalidate();
        setContent("");
      } else {
        toast.error(data.message);
      }
    },
    // NOTE: Read your neovim notes for more details about why I comment this
    //
    // async onMutate() {
    //   await utils.post.getAllPosts.cancel()
    //   const limit = 3
    //   const previousPosts = utils.post.getAllPosts.getData({limit})
    //   utils.post.getAllPosts.setData({limit}, (oldData) => {
    //     return {
    //       [...oldData?.posts]
    //     }
    //   })
    // }
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await mutation.mutateAsync({
          content,
        });
      }}
      className="flex h-fit w-full flex-col gap-3 rounded-lg bg-background px-6 py-4"
    >
      <div className="flex items-start gap-4">
        <Image
          src={"/images/placeholder-user.png"}
          alt="placeholder"
          width={40}
          height={40}
          className="aspect-square size-[40px] rounded-full"
        />
        <Textarea
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
          placeholder="What on your mind?"
          className="h-fit"
        />
      </div>
      <div className="flex items-center gap-3 self-end text-gray-600">
        {/* <LuImage className="size-8" /> */}
        <Button isLoading={mutation.isPending} className="w-fit px-6">
          Post
        </Button>
      </div>
    </form>
  );
}
