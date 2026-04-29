import { createTRPCRouter } from "@/trpc/init";
import { cartRouter } from "@/trpc/routers/cartRouter";
import { orderRouter } from "@/trpc/routers/orderRouter";
import { productRouter } from "@/trpc/routers/productRouter";

export const appRouter = createTRPCRouter({
  product: productRouter,
  cart: cartRouter,
  order: orderRouter,
});

export type AppRouter = typeof appRouter;
