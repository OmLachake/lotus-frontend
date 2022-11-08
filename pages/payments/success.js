import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { CartItemsAtom } from "../../atoms";

export async function getServerSideProps(params) {
  return {
    props: { order: {}, isValid: false },
  };
}

const Success = ({ order }) => {
  const router = useRouter();
  const [cartItems, setCartItems] = useRecoilState(CartItemsAtom);

  useEffect(() => {
    setCartItems([]);
    localStorage.setItem("cartItems", "");
  }, []);

  return (
    <div>
      <Head>
        <title>Purchase Successful!</title>
        <meta
          name="description"
          content="Purchased Product Successfully on Lotus Wear"
        />
      </Head>
      <main>
        <div className="w-full h-full flex justify-center items-center border bg-white rounded-md">
          <div
            className="flex justify-center flex-col w-full items-center my-10 h-20vh
        p-5 py-10 bg-white rounded-lg
        "
          >
            <div className="font-josan text-2xl font-light text-center">
              Your Payment was successful!
            </div>

            <div className="font-josan text-2xl font-light text-center">
              Thank you for shopping with us.
            </div>

            <div className="text-center w-[80%] mt-6 md:w-[50%]">
              <div className="font-lato mt-5">
                A confirmation has been sent to your specified Email ID
              </div>
            </div>

            <button
              className="my-10 text-xl py-4 btn-outline w-full md:w-auto "
              onClick={() => router.push("/")}
            >
              <BsBagCheckFill className="text-4xl" />
              Continue Shopping
            </button>

            <p
              className="text-pink underline cursor-pointer"
              onClick={() => router.push("/profile/orders")}
            >
              Your Orders
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Success;
