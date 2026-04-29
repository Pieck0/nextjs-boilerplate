"use client";

import { trpc } from "@/trpc/client";
import { useTranslations } from "next-intl";
import { IoCart, IoCartOutline, IoClose } from "react-icons/io5";
import CartProductTile from "@/components/CartProductTile";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

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
          <Button className="w-full rounded-none h-14 text-lg">
            {t("cart_checkout")}
          </Button>
        </a>
      </DrawerContent>
    </Drawer>
  );
};
