"use client";

import { RouterOutput } from "@/lib/trpcInferTypes";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function ProductTile({
  product,
}: {
  product: RouterOutput["product"]["getAllProducts"][0];
}) {
  const t = useTranslations("ProductsPage");

  return (
    <div
      key={product.id}
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Product Image */}
      <div className="relative h-80 bg-linear-to-br from-amber-200 to-orange-200 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={`/products/${product.image}`}
            alt="Loop by Family story"
            width={600}
            height={400}
            className="object-fit w-auto"
            loading="eager"
          />
          {/* <svg className="w-32 h-32 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg> */}
        </div>
        {product.category.name ? (
          <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {product.category.name}
          </div>
        ) : null}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
          {product.name ?? ""}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {product.description ?? ""}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-amber-600">
            {product.price} {t("currency")}
          </span>
          {/* <button className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                      {t("add_to_cart")}
                    </button> */}
        </div>
      </div>
    </div>
  );
}
