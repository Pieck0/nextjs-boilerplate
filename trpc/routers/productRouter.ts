import { z } from "zod";
import { adminProcedure, baseProcedure, createTRPCRouter } from "../init";
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
          photos: true,
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

  adminGetProducts: adminProcedure
    .input(
      z
        .object({
          languageCode: z.string().optional(),
          page: z.number().nonnegative().optional().default(0),
          limit: z.number().positive().optional().default(10),
        })
        .optional(),
    )
    .query(async (opts) => {
      const { page, limit, languageCode } = opts.input ?? {
        page: 0,
        limit: 10,
        languageCode: process.env.DEFAULT_LANG,
      };

      const products = await prisma.product.findMany({
        include: {
          category: {
            include: {
              translations: {
                where: {
                  languageCode: languageCode || process.env.DEFAULT_LANG,
                },
              },
            },
          },
          translations: {
            where: {
              languageCode: languageCode || process.env.DEFAULT_LANG,
            },
          },
          photos: true,
        },
        skip: page * limit,
        take: limit > 60 ? 60 : limit,
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

      const total = await prisma.product.count();

      return {
        products: translated,
        total,
      };
    }),
});
