import { registerSchema } from "@/lib/trpcInputs/register-schema";
import { baseProcedure, createTRPCRouter } from "../init";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { loginSchema } from "@/lib/trpcInputs/log-in-schema";
import { cookies } from "next/headers";
import { TRPCError } from "@trpc/server";
import { mergeSessionCartIntoUserCart } from "../services/cartService";

const fakeHash = "8ZEM1nGvHkQgKRLTlILHeM5y5j7iG7zuEltPQkuYl1g=";

export const authRouter = createTRPCRouter({
  register: baseProcedure.input(registerSchema).mutation(async (opts) => {
    const emailTaken = await prisma.user.findUnique({
      where: {
        email: opts.input.email.toLowerCase().trim(),
      },
    });

    const encryptedPassword = await bcrypt.hash(opts.input.password, 12);

    if (emailTaken) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "account_creation_error",
      });
    }

    try {
      await prisma.user.create({
        data: {
          email: opts.input.email.toLowerCase().trim(),
          password: encryptedPassword,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "account_creation_error",
      });
    }

    return;
  }),

  logIn: baseProcedure.input(loginSchema).mutation(async (opts) => {
    const _cookies = await cookies();

    const userExists = await prisma.user.findUnique({
      where: {
        email: opts.input.email.toLowerCase().trim(),
      },
    });

    const passwordMatches = await bcrypt.compare(
      opts.input.password,
      userExists?.password ?? fakeHash,
    );

    if (!userExists || !passwordMatches) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "invalid_credentials",
      });
    }

    const sessionId = _cookies.get("session")?.value;

    let session = sessionId
      ? await prisma.session.findUnique({
          where: {
            id: sessionId,
          },
          include: {
            cart: {
              include: {
                items: true,
              },
            },
          },
        })
      : undefined;

    const newExpires = new Date(Date.now() + 1000 * 60 * 60 * 24);

    if (!session) {
      // Jeśli nie ma sesji, tworzymy nową i przypisujemy do niej koszyk usera o ile user ma koszyk
      const newSession = await prisma.session.create({
        data: {
          userId: userExists.id,
          expires: newExpires,
        },
      });

      if (userExists.cartId) {
        await prisma.session
          .update({
            where: {
              id: newSession.id,
            },
            data: {
              cart: {
                connect: {
                  id: userExists.cartId,
                },
              },
            },
          })
          .catch(() => {
            console.log(
              `Cannot connect cart ${userExists.cartId} to session ${newSession.id}`,
            );
          });
      }

      _cookies.set("session", newSession.id, {
        httpOnly: true,
        secure: process.env.ENV !== "DEV",
        sameSite: "lax",
        path: "/",
        expires: newSession.expires,
      });
    } else if (session.userId !== userExists.id) {
      // Jeśli jest sesja, przypisujemy jej usera
      await prisma.session.update({
        where: {
          id: sessionId,
        },
        data: {
          userId: userExists.id,
          expires: newExpires,
        },
      });

      await mergeSessionCartIntoUserCart({
        sessionId: session.id,
        userId: userExists.id,
      });

      _cookies.set("session", session.id, {
        httpOnly: true,
        secure: process.env.ENV !== "DEV",
        sameSite: "lax",
        path: "/",
        expires: newExpires,
      });
    }

    return;
  }),
});
