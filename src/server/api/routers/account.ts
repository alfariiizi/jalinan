import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

// const uniqueInputSchema = z.object({
//   username: z.string().optional(),
//   currentUser: z.boolean().optional(),
// });

export const accountRouter = createTRPCRouter({
  getUserId: protectedProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          username: input.username,
        },
        select: {
          id: true,
        },
      });
      return user?.id;
    }),
  getUserInfo: protectedProcedure
    .input(
      z.object({
        username: z.string().optional(),
        userId: z.string().optional(),
        currentUser: z.boolean().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const conditional = input.currentUser
        ? { id: ctx.userId }
        : { username: input.username, id: input.userId };

      const user = await ctx.db.user.findUnique({
        where: conditional,
        include: {
          posts: true,
          followers: true,
          following: true,
        },
      });

      return user;
    }),
  getUserPosts: protectedProcedure
    .input(
      z.object({
        userId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.post.findMany({
        where: { userId: input.userId },
        include: {
          likes: true,
          comments: true,
          user: true,
          attachments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return posts;
    }),
  getFindUsers: protectedProcedure
    .input(
      z.object({
        search: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const users = await ctx.db.user.findMany({
        where: {
          OR: [
            {
              username: {
                contains: input.search,
              },
            },
            {
              name: {
                contains: input.search,
              },
            },
          ],
        },
        select: {
          id: true,
          name: true,
          username: true,
          avatarUrl: true,
        },
      });

      return users;
    }),
});
