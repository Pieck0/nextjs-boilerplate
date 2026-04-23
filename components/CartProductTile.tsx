"use client";

import { RouterOutput } from "@/lib/trpcInferTypes";
import { Button } from "./ui/button";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { CartAction } from "@/lib/enums/CartAction.enum";
import { useSetAtom } from "jotai";
import { messageAtom } from "@/lib/atoms/message.atom";
import { useEffect, useRef, useState } from "react";
import { useProductQuantityInCart } from "@/lib/hooks/useProductQuantityInCart";
import { MessageType } from "./MessageContainer";
import { ClipLoader } from "react-spinners";
import { useTranslations } from "next-intl";
import { trpc } from "@/trpc/client";
import Image from "next/image";
import Big from "big.js";

export default function CartProductTile({
  cartItem,
}: {
  cartItem: NonNullable<RouterOutput["cart"]["getCart"]>["items"][number];
}) {
  const t = useTranslations("ProductsPage");
  const utils = trpc.useUtils();

  const setMessage = useSetAtom(messageAtom);

  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [quantity, setQuantity] = useState<number>(0);
  const [currentQuantity, setCurrentQuantity] = useState<number>(0);

  const productQuantityInCart = useProductQuantityInCart(cartItem.productId);

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

  function updateCart(q: number) {
    if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);
    updateTimeoutRef.current = setTimeout(() => {
      changeQuantity({
        id: cartItem.productId,
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
    <div className="flex border border-rose-400 bg-white gap-2 mx-8 rounded-2xl shadow-md hover:bg-rose-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
      <Image
        src={`/products/${cartItem.product.image}`}
        alt="Loop by Family story"
        width={600}
        height={600}
        className="object-cover w-1/4 aspect-square"
        loading="eager"
      />
      <div className="w-3/4 flex">
        <div className="flex-1 flex flex-wrap justify-between mx-1">
          <p className="text-lg font-bold text-gray-900 mb-2 transition-colors">
            {`${cartItem.product.translations[0]?.name ?? ""}`}
          </p>
          <p className="text-lg font-bold text-gray-900 mb-2 transition-colors">{`${cartItem.product.price}PLN x${currentQuantity} (${Big(cartItem.product.price).times(currentQuantity).toFixed()}PLN)`}</p>
        </div>
        <div className="flex flex-col w-14">
          {isPending ? (
            <div className="bg-amber-600 w-full hover:bg-amber-700 flex flex-1 items-center justify-center">
              <ClipLoader size={32} color="#ffba00" className="" />
            </div>
          ) : (
            <>
              <Button
                className="rounded-l-none rounded-br-none flex-1"
                onClick={() => onQuantityChange(CartAction.ADD)}
              >
                <FaPlus />
              </Button>
              <Button
                className="rounded-l-none rounded-tr-none flex-1"
                onClick={() => onQuantityChange(CartAction.REMOVE)}
              >
                <FaMinus />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
