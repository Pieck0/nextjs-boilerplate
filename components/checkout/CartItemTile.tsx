"use client";

import { RouterOutput } from "@/lib/trpcInferTypes";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CartAction } from "@/lib/enums/CartAction.enum";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
import { useProductCartManagement } from "@/lib/hooks/useProductCartManagement";
import Big from "big.js";
import { MdDelete } from "react-icons/md";

export default function CartItemTile({
  cartItem,
}: {
  cartItem: NonNullable<RouterOutput["cart"]["getCart"]>["items"][number];
}) {
  const { onQuantityChange, currentQuantity, isPending, onRemoveFromCart } =
    useProductCartManagement(cartItem.product.id);

  return (
    <div className="flex gap-4 px-8 py-4 not-last:border-b">
      <Image
        src={`/products/${cartItem.product.image}`}
        alt="Loop by Family story"
        width={600}
        height={600}
        className="object-cover w-1/4 aspect-square rounded-xl"
        loading="eager"
      />
      <div className="flex flex-col justify-between flex-1">
        <div className="flex items-center">
          <p className="font-semibold text-lg flex-1">
            {cartItem.product.translations[0]?.name ?? ""}
          </p>
          {/* <Button className="bg-none"> */}
          <MdDelete
            size={32}
            className="text-amber-600 hover:text-amber-700"
            onClick={onRemoveFromCart}
          />
          {/* </Button> */}
        </div>
        <div className="flex self-center items-center gap-8 flex-wrap">
          <p className="font-semibold text-lg flex-1">{`${cartItem.product.price.toFixed(2)} PLN`}</p>

          <div className="flex flex-row items-center gap-4">
            <Button
              className=" bg-amber-600 hover:bg-amber-700"
              onClick={() => onQuantityChange(CartAction.REMOVE)}
            >
              <FaMinus />
            </Button>
            <p className="flex-1 justify-center flex text-xl font-semibold min-w-8">
              {isPending ? (
                <ClipLoader size={24} color="#ffba00" />
              ) : (
                currentQuantity
              )}
            </p>
            <Button
              className=" bg-amber-600 hover:bg-amber-700"
              onClick={() => onQuantityChange(CartAction.ADD)}
            >
              <FaPlus />
            </Button>
          </div>

          <p className="font-semibold text-lg">{`${Big(cartItem.product.price).times(currentQuantity).toFixed(2)} PLN`}</p>
        </div>
      </div>
    </div>
  );
}
