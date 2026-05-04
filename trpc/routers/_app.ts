import { createTRPCRouter } from "@/trpc/init";
import { cartRouter } from "@/trpc/routers/cartRouter";
import { orderRouter } from "@/trpc/routers/orderRouter";
import { productRouter } from "@/trpc/routers/productRouter";
import { authRouter } from "@/trpc/routers/authRouter";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  product: productRouter,
  cart: cartRouter,
  order: orderRouter,
});

export type AppRouter = typeof appRouter;
