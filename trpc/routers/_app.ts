import { createTRPCRouter } from "../init";
import { cartRouter } from "./cartRouter";
import { productRouter } from "./productRouter";

export const appRouter = createTRPCRouter({
  product: productRouter,
  cart: cartRouter,
});

export type AppRouter = typeof appRouter;
