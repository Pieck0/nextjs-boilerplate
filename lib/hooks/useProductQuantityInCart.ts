import { useAtomValue } from "jotai";
import { cartAtom } from "../atoms/cart.atom";

export function useProductQuantityInCart(itemId: number) {
  const cart = useAtomValue(cartAtom);
  return cart.find((item) => item.item.id === itemId)?.quantity;
}
