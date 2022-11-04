import React from "react";
import {
  BsDash,
  BsPlus,
  BsChevronDoubleLeft,
  BsBagCheckFill,
} from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import { CartItemsAtom, CartMenuAtom } from "../atoms";
import _ from "lodash";
import toast from "react-hot-toast";

const Cart = () => {
  const [cartItems, setCartItems] = useRecoilState(CartItemsAtom);
  const [cartMenu, setCartMenu] = useRecoilState(CartMenuAtom);

  const updateQuantity = (slug, quantity) => {
    let newCartItems = _.cloneDeep(cartItems);

    const index = newCartItems.findIndex((item) => item.slug === slug);

    if (quantity === 0) {
      const item = newCartItems.splice(index, 1);
      toast(
        <div>
          <div>
            {item[0].title} <span className="text-red">removed</span> from your
            cart.
          </div>
        </div>,
        {
          position: "bottom-left",
          duration: 2000,
          style: {
            style: {
              border: "2px solid rgb(251,46,134)",
              padding: "12px",
            },
          },
        }
      );
    } else {
      newCartItems[index].quantity = quantity;
    }

    setCartItems(newCartItems);
  };
  const newCartItems = [];

  const renderCartCards2 = (cartItems) => {
    return cartItems?.map((item) => {
      const { price, quantity, image, title, slug } = item;
      return (
        <div key="slug" className="CartCard">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={title} className="w-24" />
          <div className="w-[50%] flex flex-col">
            <h3 className="text-pink">{title}</h3>
            <h3>{price}</h3>
          </div>

          <div className="flex gap-3 w-[30%] justify-between items-center">
            <button
              className="btn-outline p-1 text-sm"
              onClick={() => updateQuantity(slug, quantity - 1)}
            >
              <BsDash className="text-l" />
            </button>

            <p className="w-[40%] text-center">{quantity}</p>
            <button
              className="btn-outline p-1 text-sm"
              onClick={() => updateQuantity(slug, quantity + 1)}
            >
              <BsPlus className="text-l" />
            </button>
          </div>
        </div>
      );
    });
  };

  const renderCartCards = (cartItems) => {
    return cartItems?.map((item) => {
      const { price, quantity, title, slug } = item;
      return (
        <div key={slug} className="CartCard">
          <span className="w-[40%] text-pink">{title}</span>
          <div className="flex gap-3 w-[30%] justify-between items-center">
            <button
              className="btn-outline p-1 w-[30%]"
              onClick={() => updateQuantity(slug, quantity - 1)}
            >
              <BsDash className="text-l" />
            </button>

            <span className="w-[40%] text-center">{quantity}</span>
            <button
              className="btn-outline p-1 w-[30%]"
              onClick={() => updateQuantity(slug, quantity + 1)}
            >
              <BsPlus className="text-l" />
            </button>
          </div>
          <span className="w-[20%] text-left">{price * quantity}</span>
        </div>
      );
    });
  };
  return (
    <div
      className={`${
        !cartMenu
          ? `translate-x-[0%]`
          : "translate-x-[-110%] md:translate-x-[-400%]"
      } CartContainer
      
      
      `}
    >
      <div className="flex justify-between align-center">
        <span className="flex text-xl justify-center items-center">
          Your Cart
        </span>
        <span>
          <button
            className="btn-outline p-1"
            onClick={() => setCartMenu((prevState) => !prevState)}
          >
            <BsChevronDoubleLeft className="text-xl" />
          </button>
        </span>
      </div>
      {cartItems.length ? (
        <div className="flex flex-col justify-start items-center">
          {renderCartCards2(cartItems)}

          <button className="btn w-full mt-5 py-3 text-lg md:text-2xl">
            <BsBagCheckFill className="" />
            Checkout
          </button>
        </div>
      ) : (
        <div className="text-2xl font-light font-lato text-pink">
          Your Cart is Empty :(
        </div>
      )}
    </div>
  );
};

export default Cart;
