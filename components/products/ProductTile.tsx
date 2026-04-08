"use client";

import { RouterOutput } from "@/lib/trpcInferTypes";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { productGalleryAtom } from "../atoms/product-gallery.atom";

export default function ProductTile({
  product,
}: {
  product: RouterOutput["product"]["getAllProducts"][number];
}) {
  const t = useTranslations("ProductsPage");

  const setProductGallery = useSetAtom(productGalleryAtom);

  function onProductTileClick() {
    setProductGallery(product);
  }

  return (
    <div
      key={product.id}
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
      onClick={onProductTileClick}
    >
      {/* Product Image */}
      <div className="bg-linear-to-br from-amber-200 to-orange-200 overflow-hidden">
        <div className="inset-0 flex items-center justify-center">
          <Image
            src={`/products/${product.image}`}
            alt="Loop by Family story"
            width={600}
            height={600}
            className="object-cover w-auto aspect-square"
            loading="eager"
          />
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
