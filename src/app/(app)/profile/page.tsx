import Post from "@/components/post";
import { Button } from "@/components/ui/button";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function page() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col gap-3 rounded-lg bg-background px-6 py-5">
        <Image
          src={"/images/placeholder-user.png"}
          alt="placeholder"
          width={140}
          height={140}
          className="aspect-square w-[140px] rounded-full"
        />
        <div className="flex justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold">John Wich</h2>
            <p className="text-gray-700">@johnbabayaga</p>
          </div>
          <Button variant="outline">Edit Profile</Button>
        </div>
        <div className="flex items-center justify-between gap-8">
          <p className="text-sm text-gray-800">Member since August 3, 2024</p>
          <div className="flex items-center gap-4 text-sm text-gray-800">
            <p>Posts: 10</p>
            <p>|</p>
            <p>Followers: 4</p>
          </div>
        </div>
        <p className="mt-5 text-sm leading-[1.4rem] text-gray-800">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          malesuada, nisi eget egestas ultrices.
        </p>
      </div>
      <div className="flex items-center justify-center rounded-lg bg-background px-6 py-5">
        <p className="text-center text-xl font-semibold">All Posts</p>
      </div>
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
