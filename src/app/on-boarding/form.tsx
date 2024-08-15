"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Form() {
  const router = useRouter();
  const mutation = api.user.updateUserOnBoarding.useMutation({
    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        router.push("/gate");
      } else {
        toast.error(data.message);
      }
    },
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await mutation.mutateAsync({
          name: formData.get("name") as string,
          username: formData.get("username") as string,
          bio: formData.get("bio") as string,
        });
      }}
      className="card card-col flex w-full flex-col gap-3"
    >
      <div className="flex items-center justify-center">
        <Image
          src={"/images/placeholder-user.png"}
          alt="placeholder"
          width={80}
          height={80}
          className="aspect-square size-[80px] rounded-full"
        />
      </div>
      <div className="space-y-2 text-gray-800">
        <Label className="" htmlFor="name">
          Name
        </Label>
        <Input name="name" required placeholder="John Wick" id="name" />
      </div>
      <div className="space-y-2 text-gray-800">
        <Label className="" htmlFor="username">
          Username
        </Label>
        <Input
          name="username"
          required
          placeholder="wick_babayaga12"
          id="username"
        />
      </div>
      <div className="space-y-2 text-gray-800">
        <Label className="" htmlFor="bio">
          Bio
        </Label>
        <Textarea
          name="bio"
          placeholder="I love traveling and eating takoyaki!"
          id="bio"
        />
      </div>
      <Button isLoading={mutation.isPending}>Submit</Button>
    </form>
  );
}
