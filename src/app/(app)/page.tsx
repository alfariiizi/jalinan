import CreatePost from "./_components/create-post";
import { Posts } from "./_components/posts";

export const revalidate = 600; // 10 minutes

export default async function page() {
  return (
    <div className="flex w-full flex-col gap-7">
      <CreatePost />
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

// async function HydratePosts() {
//   await api.post.getAllPosts.prefetch();
//
//   return (
//     <HydrateClient>
//       <Posts />
//     </HydrateClient>
//   );
// }
