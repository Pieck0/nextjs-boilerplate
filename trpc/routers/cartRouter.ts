import { z } from "zod";
import { createTRPCRouter, sessionProcedure } from "../init";
import prisma from "@/lib/prisma";
import { getCurrentLanguage } from "@/lib/functions/getCurrentLanguage";
import { TRPCError } from "@trpc/server";
import { getCart } from "../services/cartService";

export const cartRouter = createTRPCRouter({
  getCart: sessionProcedure.query(async (opts) => {
    const languageCode = await getCurrentLanguage();
    const session = opts.ctx.session;
    if (session) {
      return await getCart(session.user?.id, session.id, languageCode);
    }
  }),

  changeCartItemQuantity: sessionProcedure
    .input(
      z.object({
        id: z.number(),
        quantity: z.number(),
      }),
    )
    .mutation(async (opts) => {
      const { id, quantity } = opts.input;
      const session = opts.ctx.session;
      const user = opts.ctx.user;
      const cart =
        (await getCart(user?.id, session.id)) ??
        (await prisma.cart.create({
          data: {
            sessionId: session.id,
          },
        }));

      const cartItem = await prisma.cart_item.findUnique({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: id,
          },
        },
      });
      if (quantity > 0) {
        if (!cartItem)
          return await prisma.cart_item.create({
            data: {
              cartId: cart.id,
              productId: id,
              quantity: quantity,
            },
          });
        else
          return await prisma.cart_item.update({
            where: {
              cartId_productId: {
                cartId: cart.id,
                productId: id,
              },
            },
            data: {
              quantity: quantity,
            },
          });
      } else {
        if (cartItem)
          await prisma.cart_item.delete({
            where: {
              cartId_productId: {
                cartId: cart.id,
                productId: id,
              },
            },
          });
      }
    }),
});
