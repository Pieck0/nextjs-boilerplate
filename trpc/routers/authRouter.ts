import { registerSchema } from "@/lib/trpcInputs/register-schema";
import { baseProcedure, createTRPCRouter } from "../init";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { loginSchema } from "@/lib/trpcInputs/log-in-schema";
import { cookies } from "next/headers";

export const authRouter = createTRPCRouter({
  register: baseProcedure.input(registerSchema).mutation(async (opts) => {
    const encryptedPassword = await bcrypt.hash(opts.input.password, 12);

    await prisma.user.create({
      data: {
        email: opts.input.email,
        password: encryptedPassword,
      },
    });

    return;
  }),

  logIn: baseProcedure.input(loginSchema).mutation(async (opts) => {
    const _cookies = await cookies();

    const userExists = await prisma.user.findUnique({
      where: {
        email: opts.input.email,
      },
    });

    const passwordMatches = await bcrypt.compare(
      opts.input.password,
      userExists?.password ?? Math.random().toString(),
    );

    if (!userExists || !passwordMatches) {
      throw new Error("invalid_credentials");
    }

    const newSession = await prisma.session.create({
      data: {
        userId: userExists.id,
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

    return;
  }),
});
