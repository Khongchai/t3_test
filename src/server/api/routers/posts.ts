import clerkClient, { User } from "@clerk/clerk-sdk-node";
import { TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 m"),
  analytics: true,
});

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async function ({ ctx }) {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    const users = (
      await clerkClient.users.getUserList({
        userId: posts.map((post) => post.authorId),
        limit: 100,
      })
    ).map((user) => user.mapToClientUserType());

    return posts.map((post) => ({
      post,
      author: users.find((user) => user.id === post.authorId)!,
    }));
  }),

  getPostsByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const posts = await ctx.prisma.post.findMany({
        where: { authorId: input.userId },
        take: 100,
        orderBy: [{ createdAt: "desc" }],
      });
      const author = (
        await clerkClient.users.getUser(input.userId)
      ).mapToClientUserType();

      return posts.map((post) => {
        return {
          ...post,
          author,
        };
      });
    }),

  create: privateProcedure
    .input(
      z.object({
        content: z
          .string()
          .emoji({
            message: "Only emojis allowed",
          })
          .min(1)
          .max(280),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId: string = ctx.currentUserId;

      const { success } = await ratelimit.limit(authorId);

      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const post = await ctx.prisma.post.create({
        data: {
          content: input.content,
          authorId,
        },
      });

      return post;
    }),
});
