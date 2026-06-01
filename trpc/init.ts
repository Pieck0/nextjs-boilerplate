import { initTRPC, TRPCError } from "@trpc/server";
import { cookies } from "next/headers";
import { cache } from "react";
import prisma from "@/lib/prisma";

export const createTRPCContext = cache(async () => {
  return { ctx: "TRPC CONTEXT FROM init.ts" };
});

const t = initTRPC.create({});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure.use(async ({ ctx, next }) => {
  const _cookies = await cookies();
  const session = _cookies.get("session")?.value;
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
      await prisma.session.update({
        where: {
          id: session,
        },
        data: {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        },
      });
    }
  }
  return next({
    ctx: {
      ...ctx,
      session: session,
    },
  });
});

export const sessionProcedure = t.procedure.use(async ({ ctx, next }) => {
  const _cookies = await cookies();
  const session = _cookies.get("session")?.value;

  const sessionExists = session
    ? await prisma.session.findUnique({
        where: {
          id: session,
          expires: {
            gt: new Date(),
          },
        },
        include: {
          user: true,
        },
      })
    : null;
  if (sessionExists) {
    await prisma.session.update({
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
        session: sessionExists,
        user: sessionExists.user,
      },
    });
  } else {
    const newSession = await prisma.session.create({
      data: {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });
    _cookies.set("session", newSession.id, {
      httpOnly: true,
      secure: process.env.ENV !== "DEV",
      sameSite: "lax",
      path: "/",
      expires: newSession.expires,
    });
    return next({
      ctx: {
        ...ctx,
        session: newSession,
      },
    });
  }
});

export const adminProcedure = sessionProcedure.use(async ({ ctx, next }) => {
  if (ctx.session?.user?.roles?.includes("ADMIN")) {
    return next({
      ctx: {
        ...ctx,
      },
    });
  } else {
    throw new TRPCError({
      code: "FORBIDDEN",
    });
  }
});
