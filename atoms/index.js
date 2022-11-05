import { atom, selector } from "recoil";
import _ from "lodash";
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
  set: ({ set, get }, newItem) => {
    const newCartItems = get(CartItemsAtom);
    newCartItems = _.cloneDeep(newCartItems);

    console.log("CartItems Setter - Old Cart = ", newCartItems);
    const index = newCartItems.findIndex((item) => {
      return item.slug === newItem.slug;
    });
    console.log("index", index);
    if (index === -1) {
      newCartItems = [...newCartItems, newItem];
    } else {
      newCartItems[index].quantity =
        newCartItems[index].quantity + newItem.quantity;
    }

    localStorage.setItem("cartItems", JSON.stringify(newCartItems));

    console.log("CartItems Setter - New Cart = ", newCartItems);
    set(CartItemsAtom, newCartItems);
  },
});
