import { initTRPC } from "@trpc/server";
import { cookies } from "next/headers";
import { cache } from "react";
import { appRouter } from "./routers/_app";
import prisma from "@/lib/prisma";

export const createTRPCContext = cache(async () => {
  return { ctx: "TRPC CONTEXT FROM init.ts" };
});

const t = initTRPC.create({});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const sessionProcedure = t.procedure.use(async ({ ctx, next }) => {
  const _cookies = await cookies();
  let session = _cookies.get("session")?.value;
  if (session) {
    const sessionExists = await prisma.session.findUnique({
      where: {
        id: session,
        expires: {
          gt: new Date(),
        },
      },
    });
    if (sessionExists) {
      const newSession = await prisma.session.update({
        where: {
          id: session,
        },
        data: {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        },
      });
      return next({
        ctx: {
          ...ctx,
          session: newSession.id,
        },
      });
    }
  }
  session = (
    await prisma.session.create({
      data: {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    })
  ).id;
  _cookies.set("session", session);
  return next({
    ctx: {
      ...ctx,
      session: session,
    },
  });
});
