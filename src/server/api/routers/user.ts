import { z } from "zod";
import bcrypt from "bcryptjs";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { signIn } from "@/server/auth";

export const userRouter = createTRPCRouter({
  getuser: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: ctx.userId,
      },
    });
    return user;
  }),
  loginUser: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await signIn("credentials", {
        email: input.username,
        password: input.password,
        redirect: false,
      });
    }),
  createUser: publicProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.user.create({
        data: {
          username: input.username,
          email: input.email,
          passwordHash: bcrypt.hashSync(input.password),
        },
      });
    }),
});
