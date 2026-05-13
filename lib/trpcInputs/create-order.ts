import z from "zod";

export const createOrderSchema = z.object({
  email: z.email(),
});
