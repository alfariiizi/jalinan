import { z } from "zod";
import bcrypt from "bcryptjs";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { usernameSchema } from "@/validation";
import { revalidatePath } from "next/cache";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: ctx.userId,
      },
    });
    return user!;
  }),
  getUserProfile: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: ctx.userId,
      },
      include: {
        posts: true,
        followers: true,
        following: true,
      },
    });
    return user!;
  }),
  getUserPost: protectedProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      where: {
        userId: ctx.userId,
      },
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
  updateUserOnBoarding: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        username: usernameSchema,
        bio: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.db.user.update({
          where: {
            id: ctx.userId,
          },
          data: {
            name: input.name,
            username: input.username,
            bio: input.bio,
          },
        });
        return {
          message: "Success update user information.",
          success: true,
        };
      } catch (error) {
        return {
          message: "Failed to update user information.",
          success: false,
        };
      }
    }),
  createUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (user) {
        return {
          message: "You already have an account.",
        };
      }

      try {
        await ctx.db.user.create({
          data: {
            name: input.email.split("@")[0]!,
            username: input.email.split("@").join("-"),
            email: input.email,
            passwordHash: bcrypt.hashSync(input.password),
          },
        });
      } catch (error) {
        return {
          message: "Failed to create your account!",
        };
      }
    }),
  createPost: protectedProcedure
    .input(
      z.object({
        content: z.string().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.db.post.create({
          data: {
            content: input.content,
            userId: ctx.userId,
          },
        });
        revalidatePath("/");
        revalidatePath("/profile");
        return {
          message: "Your post has been submitted!",
          success: true,
        };
      } catch (error) {
        return {
          message: "Failed to submit your post!",
          success: false,
        };
      }
    }),
});
