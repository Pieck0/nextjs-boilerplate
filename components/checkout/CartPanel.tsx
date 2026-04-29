"use client";

import { trpc } from "@/trpc/client";
import { useTranslations } from "next-intl";
import { IoCartOutline } from "react-icons/io5";
import CartItemTile from "./CartItemTile";
import Big from "big.js";
import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrderSchema } from "@/lib/trpcInputs/create-order";
import ClipLoader from "react-spinners/ClipLoader";
import { useSetAtom } from "jotai";
import { messageAtom } from "@/lib/atoms/message.atom";
import { MessageType } from "../MessageContainer";

export default function CartPanel() {
  const utils = trpc.useUtils();
  const cart = trpc.cart.getCart.useQuery();
  const t = useTranslations("CheckoutPage");

  const setMessage = useSetAtom(messageAtom);

  const form = useForm<z.infer<typeof createOrderSchema>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(createOrderSchema),
  });

  const { mutate: createOrder, isPending } = trpc.order.createOrder.useMutation(
    {
      onSuccess: () => {
        form.reset();
        utils.cart.getCart.invalidate();
        setMessage({
          message: "CheckoutPage.order_created",
          type: MessageType.SUCCESS,
        });
      },
      onError: () => {
        setMessage({
          message: "CheckoutPage.order_creation_error",
          type: MessageType.ERROR,
        });
      },
    },
  );

  function onSubmit(data: z.infer<typeof createOrderSchema>) {
    createOrder(data);
  }

  return (
    <div className="flex gap-4">
      <div className="bg-white rounded-lg py-4 mt-4 flex-2">
        {!cart.data?.items.length ? (
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
      <form
        action=""
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white rounded-lg p-8 mt-4 flex-1 flex flex-col justify-between h-56"
      >
        <div className="flex justify-between w-full">
          <p className="text-lg font-semibold">{`${t("total")}:`}</p>
          <p className="text-lg font-semibold">
            {cart.data?.items.reduce(
              (acc, item) =>
                Big(acc)
                  .add(Big(item.product.price).times(item.quantity))
                  .toNumber(),
              0,
            )}
            PLN
          </p>
        </div>
        <div>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <div className="relative flex">
                  <input
                    {...field}
                    type="text"
                    placeholder="f"
                    className="peer bg-white focus:outline-none text-lg placeholder:text-transparent border-b px-1 border-amber-600 w-full"
                  />
                  <p className="transition-all text-slate-400 duration-300 ease-in-out absolute pl-1 peer-focus:text-sm not-peer-placeholder-shown:text-sm peer-focus:-translate-y-4 not-peer-placeholder-shown:-translate-y-4 peer-focus:text-amber-700 not-peer-placeholder-shown:text-amber-700">
                    Email
                  </p>
                  <p
                    className={`text-red-600 absolute translate-y-7 pl-1 text-sm`}
                  >
                    {fieldState.error
                      ? t(`email_${fieldState.error.type}`)
                      : ""}
                  </p>
                </div>
              </>
            )}
          />
        </div>
        <Button type="submit">
          {isPending ? (
            <ClipLoader size={24} color="#ffba00" />
          ) : (
            t("create_order")
          )}
        </Button>
      </form>
    </div>
  );
}
