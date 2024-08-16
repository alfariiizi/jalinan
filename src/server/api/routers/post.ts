import { createTRPCRouter, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  getAllPosts: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session) {
      const posts = await ctx.db.post.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
          likes: true,
          comments: true,
          attachments: true,
        },
      });
      return posts;
    }

    const posts = await ctx.db.user.findMany({
      where: {
        id: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        posts: {
          include: {
            user: true,
            likes: true,
            comments: true,
            attachments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        following: {
          select: {
            following: {
              select: {
                posts: {
                  include: {
                    user: true,
                    likes: true,
                    comments: true,
                    attachments: true,
                  },
                  orderBy: {
                    createdAt: "desc",
                  },
                },
              },
            },
          },
        },
      },
    });

    const userPosts = posts.map((item) => item.posts).flat();
    const transformedPosts = posts
      .map((item) => item.following)
      .flat()
      .map((item) => item.following)
      .map((item) => item.posts)
      .flat();
    return [...userPosts, ...transformedPosts].sort((a, b) =>
      a.createdAt < b.createdAt ? 1 : -1,
    );
  }),
});
