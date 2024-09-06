import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

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
});
