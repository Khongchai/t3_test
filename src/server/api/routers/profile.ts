import clerkClient from "@clerk/clerk-sdk-node";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
  getUserByUserName: publicProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ input }) => {
      const [user] = await clerkClient.users.getUserList({
        username: [input.username],
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return user.filterUserForClient();
    }),
});
