import { atom, selector } from "recoil";

export const sideMenuAtom = atom({
  key: "sideMenu",
  default: false,
});

export const CartMenuAtom = atom({
  key: "cartMenu",
  default: true,
});

export const CartItemsAtom = atom({
  key: "cart",
  default: [],
});

export const CartCountSelector = selector({
  key: "cartCount",
  get: ({ get }) => {
    const cartItems = get(CartItemsAtom);
    const count = cartItems.reduce((count, i) => count + i.quantity, 0);
    return count;
  },
});

export const CartItemsSelector = selector({
  key: "cartItems",
  get: ({ get }) => {
    const cartItems = get(CartItemsAtom);
    return cartItems;
  },
  set: ({ get, set }, newItem) => {
    const cartItems = get(CartItemsAtom);
    set(CartItemsAtom, [...cartItems, newItem]);
  },
});
