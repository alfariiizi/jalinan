import { createTRPCRouter, publicProcedure } from "../trpc";

// Function to extract hashtags from text
function extractHashtags(text: string) {
  const hashtagRegex = /#[a-zA-Z0-9_]+/g;
  return text.match(hashtagRegex)?.map((tag) => tag.slice(1)) ?? [];
}

type TagAmount = {
  tag: string;
  amount: number;
};

export const tagRouter = createTRPCRouter({
  getRecentTags: publicProcedure.query(async ({ ctx }) => {
    const contents = await ctx.db.post
      .findMany({
        select: {
          content: true,
        },
      })
      .then((res) => res.map((item) => item.content));

    const tags = contents.map((item) => extractHashtags(item)).flat();
    const tagsCounter: TagAmount[] = [];

    tags.forEach((item) => {
      const index = tagsCounter.findIndex((f) => f.tag === item);
      if (index === -1) {
        tagsCounter.push({
          tag: item,
          amount: 1,
        });
      } else {
        tagsCounter[index]!.amount = tagsCounter[index]!.amount + 1;
      }
    });
    const sortedTagsCounter = tagsCounter.sort((a, b) =>
      a.amount > b.amount ? -1 : 1,
    );

    return sortedTagsCounter.slice(0, 5);
  }),
});
