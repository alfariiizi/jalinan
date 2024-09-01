import Post from "@/components/post";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";
import Image from "next/image";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function page() {
  const user = await api.user.getUserProfile();
  const userCreatedDateString = format(user.createdAt, "MMMM d, y");

  return (
    <div className="flex w-full flex-col gap-7">
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
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-700">@{user.username}</p>
          </div>
          <Button variant="outline">Edit Profile</Button>
        </div>
        <div className="flex items-center justify-between gap-8">
          <p className="text-sm text-gray-800">
            Member since {userCreatedDateString}
          </p>
        </div>
        <p className="my-5 text-sm leading-[1.4rem] text-gray-800">
          {user.bio ?? "No bio"}
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Posts</TableHead>
              <TableHead className="text-center">Following</TableHead>
              <TableHead className="text-center">Followers</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-center">{user.posts.length}</TableCell>
              <TableCell className="text-center">
                {user.following.length}
              </TableCell>
              <TableCell className="text-center">
                {user.followers.length}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center rounded-lg bg-background px-6 py-5">
        <p className="text-center text-xl font-semibold">All Posts</p>
      </div>
      <Posts />
      {/* { */}
      {/*   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      {/*   [...new Array(8)].fill(0).map((_, index) => ( */}
      {/*     <Post */}
      {/*       key={`post-number-${index + 1}`} */}
      {/*       name="John Wich" */}
      {/*       username="johnbabayaga" */}
      {/*       date={new Date("2024-08-14")} */}
      {/*       likesAmount={1200} */}
      {/*       commentAmount={300} */}
      {/*       messages="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada, nisi eget egestas ultrices, turpis est tincidunt dui, et mollis justo ante quis velit. Etiam ac condimentum sem, vel ultricies enim." */}
      {/*     /> */}
      {/*   )) */}
      {/* } */}
    </div>
  );
}

async function Posts() {
  const posts = await api.user.getUserPost();

  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <p>You have no posts</p>
      </div>
    );
  }

  return posts.map((post) => (
    <Post
      key={post.id}
      postId={post.id}
      avatarImgSrc={post.user.avatarUrl}
      username={post.user.username}
      name={post.user.name}
      date={post.createdAt}
      messages={post.content}
      likesAmount={post.likes.length}
      commentAmount={post.comments.length}
      attachmentImgSrc={post.attachments.map((attach) => attach.url)}
    />
  ));
}
