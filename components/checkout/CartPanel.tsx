"use client";

import { trpc } from "@/trpc/client";
import { useTranslations } from "next-intl";
import { IoCartOutline } from "react-icons/io5";
import CartItemTile from "./CartItemTile";

export default function CartPanel() {
  const cart = trpc.cart.getCart.useQuery();
  const t = useTranslations("CheckoutPage");

  return (
    <div className="flex gap-4">
      <div className="bg-white rounded-lg py-4 mt-4 flex-2">
        {cart.data?.items.length === 0 ? (
          <div className="flex flex-col items-center self-center">
            <IoCartOutline size={128} className="text-amber-400" />
            <p className="text-xl font-bold text-amber-400">
              {t("cart_empty")}
            </p>
          </div>
        ) : (
          <div className="flex flex-col not-last:border-b-2 not-last:border-gray-200 ">
            {cart.data?.items.map((cartItem, idx) => (
              <CartItemTile cartItem={cartItem} key={idx} />
            ))}
          </div>
        )}
      </div>
      <div className="bg-white rounded-lg p-8 mt-4 flex-1"></div>
    </div>
  );
}
