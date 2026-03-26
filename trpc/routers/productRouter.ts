import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import prisma from "@/lib/prisma";

export const productRouter = createTRPCRouter({
  getAllProducts: baseProcedure
    .input(z.object({ languageCode: z.string().optional() }).optional())
    .query(async (opts) => {
      const options = opts.input;

      const products = await prisma.product.findMany({
        include: {
          category: {
            include: {
              translations: {
                where: {
                  languageCode:
                    options?.languageCode || process.env.DEFAULT_LANG,
                },
              },
            },
          },
          translations: {
            where: {
              languageCode: options?.languageCode || process.env.DEFAULT_LANG,
            },
          },
        },
      });

      const translated = products.map((product) => {
        return {
          ...product,
          category: {
            ...product.category,
            name: product.category?.translations[0]?.name,
          },
          name: product.translations[0]?.name,
          description: product.translations[0]?.description,
        };
      });

      return translated;
    }),
});
