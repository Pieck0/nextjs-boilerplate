import { useEffect, useRef, useState } from "react";
import { useProductQuantityInCart } from "@/lib/hooks/useProductQuantityInCart";
import { trpc } from "@/trpc/client";
import { useSetAtom } from "jotai";
import { messageAtom } from "@/lib/atoms/message.atom";
import { MessageType } from "@/components/MessageContainer";
import { CartAction } from "@/lib/enums/CartAction.enum";
import { showModalAtom } from "../atoms/show-modal";
import { ModalType } from "../enums/ModalType.enum";

export const useProductCartManagement = (productId: number) => {
  const utils = trpc.useUtils();
  const setMessage = useSetAtom(messageAtom);
  const setShowModal = useSetAtom(showModalAtom);

  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [quantity, setQuantity] = useState<number>(0);
  const [currentQuantity, setCurrentQuantity] = useState<number>(0);

  const productQuantityInCart = useProductQuantityInCart(productId);

  useEffect(() => {
    setQuantity(productQuantityInCart);
    setCurrentQuantity(productQuantityInCart);
  }, [productQuantityInCart]);

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

  function updateCart(q: number) {
    if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);
    updateTimeoutRef.current = setTimeout(() => {
      changeQuantity({
        id: productId,
        quantity: q,
      });
    }, 750);
  }

  function onRemoveFromCart() {
    setShowModal({
      type: ModalType.REMOVE_FROM_CART,
      onSuccess: () => {
        updateCart(0);
      },
    });
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

  return {
    onQuantityChange,
    onRemoveFromCart,
    currentQuantity,
    isPending,
  };
};
