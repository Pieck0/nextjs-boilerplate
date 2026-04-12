"use client";

import { useAtom, useSetAtom } from "jotai";
import { IoCart } from "react-icons/io5";
import { cartAtom } from "../lib/atoms/cart.atom";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { IoCartOutline } from "react-icons/io5";
import { useTranslations } from "next-intl";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import Big from "big.js";
import { trpc } from "@/trpc/client";
import { useEffect } from "react";
import { getCurrentLanguage } from "@/lib/functions/getCurrentLanguage";

export const CartDrawer = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const { data: _cart } = trpc.cart.getCart.useQuery();

  useEffect(() => {
    console.log("_CART", _cart);
    if (_cart)
      setCart(
        _cart.items.map((item) => {
          return {
            quantity: item.quantity,
            item: {
              id: item.product.id,
              name: item.product.translations[0].name,
              image: item.product.image,
              price: item.product.price,
            },
          };
        }),
      );
  }, [_cart]);

  // async function getCart() {
  //   console.log("_CART", _cart);
  //   if (!_cart.data) return;
  //   setCart(
  //     _cart.data?.items.map((item) => {
  //       return {
  //         quantity: item.quantity,
  //         item: {
  //           id: item.product.id,
  //           name: item.product.translations[0].name,
  //           image: item.product.image,
  //           price: item.product.price,
  //         },
  //       };
  //     }),
  //   );
  // }

  const t = useTranslations("HomePage");

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <IoCart size={24} className="hover:text-amber-600" />
      </DrawerTrigger>
      <DrawerContent className="bg-linear-to-br from-rose-50 to-pink-50 border-l-2 border-rose-400">
        <DrawerTitle />
        <div className="flex flex-1 justify-center relative">
          <DrawerClose
            asChild
            className="absolute cursor-pointer right-4 top-4"
          >
            <IoClose className="text-amber-400 cursor-pointer" size={48} />
          </DrawerClose>
          {cart.length === 0 ? (
            <div className="flex flex-col items-center self-center">
              <IoCartOutline size={128} className="text-amber-400" />
              <p className="text-xl font-bold text-amber-400">
                {t("cart_empty")}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 pt-20">
              {cart.map((cartItem, idx) => (
                <div
                  key={`cart-item-${idx}`}
                  className="flex border border-rose-400 bg-white gap-2 mx-8 rounded-2xl shadow-md hover:bg-rose-100 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <Image
                    src={`/products/${cartItem.item.image}`}
                    alt="Loop by Family story"
                    width={600}
                    height={600}
                    className="object-cover w-1/4 aspect-square"
                    loading="eager"
                  />
                  <h3 className="text-lg font-bold text-gray-900 mb-2 transition-colors">
                    {`${cartItem.item.name ?? ""} x${cartItem.quantity} (${Big(cartItem.item.price).times(cartItem.quantity).toFixed(2)}PLN)`}
                  </h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
