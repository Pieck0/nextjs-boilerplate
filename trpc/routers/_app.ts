import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import prisma from "@/lib/prisma";

export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(async (opts) => {
      const test = await prisma.test.findMany();

      return {
        greeting: `hello ${opts.input.text}`,
        result: test,
      };
    }),
});

export type AppRouter = typeof appRouter;
