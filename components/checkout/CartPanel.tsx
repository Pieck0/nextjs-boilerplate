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
import { createOrderSchema } from "@/lib/trpcInputs/create-order-schema";
import ClipLoader from "react-spinners/ClipLoader";
import { useSetAtom } from "jotai";
import { messageAtom } from "@/lib/atoms/message.atom";
import { MessageType } from "../MessageContainer";
import Input from "../ui/input";
import { showModalAtom } from "@/lib/atoms/show-modal";
import { ModalType } from "@/lib/enums/ModalType.enum";

export default function CartPanel() {
  const utils = trpc.useUtils();
  const cart = trpc.cart.getCart.useQuery();
  const t = useTranslations("CheckoutPage");

  const setMessage = useSetAtom(messageAtom);
  const setShowModal = useSetAtom(showModalAtom);

  // const form = useForm<z.infer<typeof createOrderSchema>>({
  //   defaultValues: {
  //     email: "",
  //   },
  //   resolver: zodResolver(createOrderSchema),
  // });

  // const { mutate: createOrder, isPending } = trpc.order.createOrder.useMutation(
  //   {
  //     onSuccess: () => {
  //       form.reset();
  //       utils.cart.getCart.invalidate();
  //       setMessage({
  //         message: "CheckoutPage.order_created",
  //         type: MessageType.SUCCESS,
  //       });
  //     },
  //     onError: () => {
  //       setMessage({
  //         message: "CheckoutPage.order_creation_error",
  //         type: MessageType.ERROR,
  //       });
  //     },
  //   },
  // );

  function onSubmit() {
    // data: z.infer<typeof createOrderSchema>
    // createOrder(data);
    setShowModal({
      type: ModalType.SHOP_IN_PROGRESS,
    });
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
        {/* <div>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Input
                inputProps={field}
                errorMessage={
                  fieldState.error && t(`email_${fieldState.error?.type}`)
                }
              />
            )}
          />
        </div> */}
        <Button type="button" onClick={onSubmit}>
          {t("create_order")}
        </Button>
      </form>
    </div>
  );
}
