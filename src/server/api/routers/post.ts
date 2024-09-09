import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  getAllPosts: publicProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(100).nullish(),
          cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const defaultLimit = 10;
      const limit = input?.limit ?? defaultLimit;
      const cursor = input?.cursor;

      // if (!ctx.session) {
      const posts = await ctx.db.post.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { id: cursor } : undefined,
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

      let nextCursor: typeof cursor | undefined = undefined;
      if (posts.length > limit) {
        const nextItem = posts.pop();
        nextCursor = nextItem!.id;
      }

      return {
        posts,
        nextCursor,
      };

      // return posts;
      // }

      // const posts = await ctx.db.user.findMany({
      //   // where: {
      //   //   id: ctx.session.user.id,
      //   // },
      //   orderBy: {
      //     createdAt: "desc",
      //   },
      //   select: {
      //     posts: {
      //       include: {
      //         user: true,
      //         likes: true,
      //         comments: true,
      //         attachments: true,
      //       },
      //       orderBy: {
      //         createdAt: "desc",
      //       },
      //     },
      //     following: {
      //       select: {
      //         following: {
      //           select: {
      //             posts: {
      //               include: {
      //                 user: true,
      //                 likes: true,
      //                 comments: true,
      //                 attachments: true,
      //               },
      //               orderBy: {
      //                 createdAt: "desc",
      //               },
      //             },
      //           },
      //         },
      //       },
      //     },
      //   },
      // });

      // const userPosts = posts.map((item) => item.posts).flat();
      // const transformedPosts = posts
      //   .map((item) => item.following)
      //   .flat()
      //   .map((item) => item.following)
      //   .map((item) => item.posts)
      //   .flat();
      // return [...userPosts, ...transformedPosts].sort((a, b) =>
      //   a.createdAt < b.createdAt ? 1 : -1,
      // );
    }),

  getIsLike: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.session) {
        return false;
      }

      const like = await ctx.db.like.findUnique({
        where: {
          userId_postId: {
            postId: input.postId,
            userId: ctx.session.user.id,
          },
        },
      });
      return like ? true : false;
    }),

  getLikesAmount: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const likesAmount = await ctx.db.post.findUnique({
        where: {
          id: input.postId,
        },
        select: {
          likes: true,
        },
      });
      return likesAmount!.likes.length;
    }),

  updateLikes: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const alreadyLike = await ctx.db.like.findUnique({
          where: {
            userId_postId: {
              postId: input.postId,
              userId: ctx.userId,
            },
          },
        });
        if (alreadyLike) {
          await ctx.db.like.delete({
            where: {
              userId_postId: {
                postId: input.postId,
                userId: ctx.userId,
              },
            },
          });
        } else {
          await ctx.db.like.create({
            data: {
              postId: input.postId,
              userId: ctx.userId,
            },
          });
        }
      } catch (error) {
        return {
          message: "Failed to like the post!",
        };
      }
    }),

  getPostsFromTag: protectedProcedure
    .input(
      z.object({
        tag: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.post.findMany({
        where: {
          content: {
            contains: `#${input.tag}`,
          },
        },
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
    }),

  getAllBookmarkedPosts: protectedProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      where: {
        bookmarks: {
          some: {
            userId: {
              equals: ctx.userId,
            },
          },
        },
      },
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
  }),
});
