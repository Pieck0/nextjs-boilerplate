import { z } from "zod";
import { createTRPCRouter, sessionProcedure } from "../init";
import prisma from "@/lib/prisma";
import { getCurrentLanguage } from "@/lib/functions/getCurrentLanguage";
import { TRPCError } from "@trpc/server";

export const cartRouter = createTRPCRouter({
  getCart: sessionProcedure.query(async (opts) => {
    const languageCode = await getCurrentLanguage();
    if (opts.ctx.session) {
      return await prisma.cart.findUnique({
        where: {
          sessionId: opts.ctx.session,
        },
        include: {
          items: {
            include: {
              product: {
                include: {
                  translations: {
                    where: {
                      languageCode: languageCode || process.env.DEFAULT_LANG,
                    },
                  },
                },
              },
            },
          },
        },
      });
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
      // throw new TRPCError({
      //   code: "UNAUTHORIZED",
      //   message: "Not authenticated",
      // });
      const { id, quantity } = opts.input;
      const session = opts.ctx.session;
      const cart =
        (await prisma.cart.findUnique({
          where: {
            sessionId: session,
          },
          include: {
            items: true,
          },
        })) ??
        (await prisma.cart.create({
          data: {
            sessionId: session,
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
