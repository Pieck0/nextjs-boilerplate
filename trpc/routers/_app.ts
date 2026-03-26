import { createTRPCRouter } from "../init";
import { productRouter } from "./productRouter";

export const appRouter = createTRPCRouter({
  product: productRouter,
});

export type AppRouter = typeof appRouter;
