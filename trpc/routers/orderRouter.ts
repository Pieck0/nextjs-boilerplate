import { OrderStatus } from "@/lib/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, sessionProcedure } from "../init";
import { createOrderSchema } from "@/lib/trpcInputs/create-order";

export const orderRouter = createTRPCRouter({
  createOrder: sessionProcedure
    .input(createOrderSchema)
    .mutation(async (opts) => {
      const cart = await prisma.cart.findUnique({
        where: {
          sessionId: opts.ctx.session,
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
      if (cart) {
        const order = await prisma.order.create({
          data: {
            email: opts.input.email,
            orderItems: {
              createMany: {
                data: cart.items.map((item) => ({
                  productId: item.productId,
                  quantity: item.quantity,
                  price: item.product.price,
                })),
              },
            },
            status: OrderStatus.PENDING,
          },
        });
        await prisma.cart.delete({
          where: {
            id: cart.id,
          },
        });
        return order;
      } else {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Cart not found",
        });
      }
    }),
});
