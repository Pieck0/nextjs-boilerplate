"use client";

import { messageAtom } from "@/lib/atoms/message.atom";
import { productGalleryAtom } from "@/lib/atoms/product-gallery.atom";
import { CartAction } from "@/lib/enums/CartAction.enum";
import { useProductQuantityInCart } from "@/lib/hooks/useProductQuantityInCart";
import { RouterOutput } from "@/lib/trpcInferTypes";
import { trpc } from "@/trpc/client";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
import { MessageType } from "../MessageContainer";
import { Button } from "../ui/button";

export default function ProductTile({
  product,
}: {
  product: RouterOutput["product"]["getAllProducts"][number];
}) {
  const t = useTranslations("ProductsPage");
  const utils = trpc.useUtils();

  const setProductGallery = useSetAtom(productGalleryAtom);
  const setMessage = useSetAtom(messageAtom);

  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [quantity, setQuantity] = useState<number>(0);
  const [currentQuantity, setCurrentQuantity] = useState<number>(0);

  const productQuantityInCart = useProductQuantityInCart(product.id);

  const { mutate: changeQuantity, isPending } =
    trpc.cart.changeCartItemQuantity.useMutation({
      onSuccess: (data) => {
        utils.cart.getCart.invalidate();
        if (data) setCurrentQuantity(data.quantity);
      },
      onError: () => {
        setMessage({
          message: "ProductsPage.cart_update_error",
          type: MessageType.ERROR,
        });
      },
    });

  useEffect(() => {
    setQuantity(productQuantityInCart);
    setCurrentQuantity(productQuantityInCart);
  }, [productQuantityInCart]);

  function onProductTileClick() {
    setProductGallery(product);
  }

  function updateCart(q: number) {
    if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);
    updateTimeoutRef.current = setTimeout(() => {
      changeQuantity({
        id: product.id,
        quantity: q,
      });
    }, 750);
  }

  function onQuantityChange(action: CartAction) {
    const newQuantity =
      action === CartAction.ADD
        ? quantity + 1
        : quantity - 1 < 0
          ? 0
          : quantity - 1;
    setQuantity(newQuantity);
    updateCart(newQuantity);
  }

  return (
    <div
      key={product.id}
      className="bg-white max-w-sm rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div onClick={onProductTileClick}>
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
        <div className="p-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 transition-colors">
            {product.name ?? ""}
          </h3>
          <p className="text-gray-600 mb-2 line-clamp-2">
            {product.description ?? ""}
          </p>
          <div className="flex items-center">
            <span className="text-3xl font-bold text-amber-600">
              {product.price} {t("currency")}
            </span>
          </div>
        </div>
      </div>
      {productQuantityInCart ? (
        <div className="flex flex-row items-center">
          <Button
            className="rounded-tl-none bg-amber-600 hover:bg-amber-700"
            onClick={() => onQuantityChange(CartAction.REMOVE)}
          >
            <FaMinus />
          </Button>
          <p className="flex-1 justify-center flex text-xl font-semibold">
            {isPending ? (
              <ClipLoader size={24} color="#ffba00" />
            ) : (
              currentQuantity
            )}
          </p>
          <Button
            className="rounded-tr-none bg-amber-600 hover:bg-amber-700"
            onClick={() => onQuantityChange(CartAction.ADD)}
          >
            <FaPlus />
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => onQuantityChange(CartAction.ADD)}
          className="bg-amber-600 w-full text-white text-lg px-6 py-3 rounded-t-none font-semibold hover:bg-amber-700 transition-colors"
        >
          {isPending ? (
            <ClipLoader color="#ffba00" size={24} />
          ) : (
            t("add_to_cart")
          )}
        </Button>
      )}
    </div>
  );
}
