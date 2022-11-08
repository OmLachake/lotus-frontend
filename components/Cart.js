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
import getStripe, { handleCheckout } from "../lib/getStripe";
const { motion } = require("framer-motion");

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
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  const renderCartCards2 = (cartItems) => {
    return cartItems?.map((item) => {
      const { price, quantity, image, title, slug } = item;
      return (
        <motion.div
          key="slug"
          className={`CartCard  ${cartMenu ? `opacity-0 ` : `opacity-1 `}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={title}
            className="w-24 border h-28 object-cover rounded-lg"
          />

          <motion.div className="w-[60%] flex flex-col justify-between ">
            <motion.div className="text-pink flex justify-between text-xl">
              {title}
            </motion.div>

            <motion.div className="flex gap-3 w-[30%] justify-between items-center">
              <button
                className="btn-outline p-1 text-sm"
                onClick={() => updateQuantity(slug, quantity - 1)}
              >
                <BsDash className="text-l" />
              </button>

              <motion.p className="w-[40%] text-center">{quantity}</motion.p>
              <button
                className="btn-outline p-1 text-sm"
                onClick={() => updateQuantity(slug, quantity + 1)}
              >
                <BsPlus className="text-l" />
              </button>
            </motion.div>
            <motion.div className="flex justify-between">₹.{price}</motion.div>
          </motion.div>
        </motion.div>
      );
    });
  };

  //Payments
  // const handleCheckout = async () => {
  //   const stripe = await getStripe();
  //   const response = await fetch("/api/stripe", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(cartItems),
  //   });
  //   const data = await response.json();
  //   console.log("checkout session -", data);
  //   await stripe.redirectToCheckout({
  //     sessionId: data.id,
  //   });
  // };

  const total = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  return (
    <motion.div
      className={`${
        !cartMenu
          ? `translate-x-[0%] lg:translate-x-[-233%] `
          : "translate-x-[-110%] md:translate-x-[-400%] "
      } CartContainer`}
    >
      <motion.div className="flex justify-between align-center">
        <motion.span className="flex text-xl justify-center items-center">
          Your Cart
        </motion.span>
        <motion.span>
          <button
            className="btn-outline p-1"
            onClick={() => setCartMenu((prevState) => !prevState)}
          >
            <BsChevronDoubleLeft className="text-xl" />
          </button>
        </motion.span>
      </motion.div>
      {cartItems.length ? (
        <motion.div className="flex flex-col justify-start items-center">
          {renderCartCards2(cartItems)}
          <motion.div className="flex justify-between w-full px-1 mt-4">
            <div>Cart Price </div>
            <div>₹. {total}</div>
          </motion.div>
          <button
            className="btn w-full mt-5 py-3 text-lg md:text-2xl"
            onClick={() => handleCheckout(cartItems)}
          >
            <BsBagCheckFill className="" />
            Checkout
          </button>
        </motion.div>
      ) : (
        <div className="text-2xl font-light font-lato text-pink">
          Your Cart is Empty :(
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
