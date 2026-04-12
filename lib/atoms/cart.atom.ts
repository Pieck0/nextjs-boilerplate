import { atom } from "jotai";

export enum CartAction {
  ADD = "add",
  REMOVE = "remove",
}

export interface CartItem {
  id: number;
  price: number;
  name?: string | null;
  image?: string | null;
}

export const cartAtom = atom<{ item: CartItem; quantity: number }[]>([]);

export const changeCartStateAtom = atom(
  null,
  (get, set, value: { quantity: number; item: CartItem }) => {
    const cart = get(cartAtom);
    const cartItemIdx = cart.findIndex(
      (cartItem) => cartItem.item.id === value.item.id,
    );

    if (cartItemIdx === -1) {
      set(cartAtom, [
        ...cart,
        {
          item: value.item,
          quantity: value.quantity,
        },
      ]);
    } else {
      if (value.quantity === 0) {
        const newCart = [...cart];
        newCart.splice(cartItemIdx, 1);
        set(cartAtom, newCart);
        return;
      }
      const newCart = [...cart];
      newCart[cartItemIdx].quantity = value.quantity;
      set(cartAtom, newCart);
    }
  },
);
