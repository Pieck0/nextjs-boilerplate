import z from "zod";

export const registerSchema = z
  .object({
    email: z.email(),
    password: z.string().min(8),
    repeatPassword: z.string(),
  })
  .superRefine(({ password, repeatPassword }, ctx) => {
    if (password !== repeatPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["repeatPassword"],
      });
    }
  });
