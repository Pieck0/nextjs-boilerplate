"use client";

import { trpc } from "@/trpc/client";
import Big from "big.js";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { IoCart, IoCartOutline, IoClose } from "react-icons/io5";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
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

const CartProductTile = ({
  cartItem,
}: {
  cartItem: NonNullable<RouterOutput["cart"]["getCart"]>["items"][number];
}) => {
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
      <h3 className="text-lg font-bold text-gray-900 mb-2 transition-colors">
        {`${cartItem.product.translations[0]?.name ?? ""} x${currentQuantity} (${Big(cartItem.product.price).times(currentQuantity).toFixed(2)}PLN)`}
      </h3>
      <div className="flex flex-col w-14">
        {isPending ? (
          <div className="bg-amber-600 w-full hover:bg-amber-700 flex flex-1 items-center justify-center">
            <ClipLoader size={32} color="#ffba00" className="" />
          </div>
        ) : (
          <>
            <Button
              className="rounded-l-none rounded-br-none bg-amber-600 hover:bg-amber-700 flex-1"
              onClick={() => onQuantityChange(CartAction.ADD)}
            >
              <FaPlus />
            </Button>
            <Button
              className="rounded-l-none rounded-tr-none bg-amber-600 hover:bg-amber-700 flex-1"
              onClick={() => onQuantityChange(CartAction.REMOVE)}
            >
              <FaMinus />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export const CartDrawer = () => {
  const { data: cart } = trpc.cart.getCart.useQuery();

  const t = useTranslations("HomePage");

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <IoCart size={24} className="hover:text-amber-600" />
      </DrawerTrigger>
      <DrawerContent className="z-40 mt-16 bg-linear-to-br from-rose-50 to-pink-50 border-l-2 border-rose-400">
        <DrawerTitle />
        <div className="flex flex-1 justify-center relative">
          <DrawerClose
            asChild
            className="absolute cursor-pointer right-4 top-4"
          >
            <IoClose className="text-amber-400 cursor-pointer" size={48} />
          </DrawerClose>
          <div className="flex-1 overflow-y-scroll scrollbar flex justify-center">
            {cart?.items.length === 0 ? (
              <div className="flex flex-col items-center self-center">
                <IoCartOutline size={128} className="text-amber-400" />
                <p className="text-xl font-bold text-amber-400">
                  {t("cart_empty")}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 pt-20">
                {cart?.items.map((cartItem, idx) => (
                  <CartProductTile
                    cartItem={cartItem}
                    key={`cart-item-${idx}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <a href="/checkout">
          <Button className="bg-amber-600 hover:bg-amber-700 w-full rounded-none h-14 text-lg">
            {t("cart_checkout")}
          </Button>
        </a>
      </DrawerContent>
    </Drawer>
  );
};
