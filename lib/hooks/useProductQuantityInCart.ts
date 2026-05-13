"use client";

import { trpc } from "@/trpc/client";

export function useProductQuantityInCart(productId: number) {
  const { data: cart } = trpc.cart.getCart.useQuery();
  return (
    cart?.items.find((item) => item.product.id === productId)?.quantity ?? 0
  );
}
