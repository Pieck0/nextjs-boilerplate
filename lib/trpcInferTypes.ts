import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouterInput = inferRouterInputs<AppRouter>;
