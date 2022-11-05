import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { CartItemsAtom } from "../../atoms";
import OrderTable from "../../components/OrderTable";

const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

export async function getServerSideProps(params) {
  // let session = params?.query?.session_id;

  // const order = await stripe.checkout.sessions.retrieve(session, {
  //   expand: ["line_items"],
  // });

  // const expiry = new Date(order.expires_at);
  // expiry.getTime();
  // let current = new Date();
  // const isValid = current < expiry;
  // // console.log(isValid);
  // console.log(
  //   session,
  //   order,
  //   expiry.toLocaleDateString(),
  //   current.toLocaleDateString()
  // );
  return {
    props: { order: {}, isValid: false },
  };
}

const Success = ({ order }) => {
  const router = useRouter();
  const [cartItems, setCartItems] = useRecoilState(CartItemsAtom);

  useEffect(() => {
    setCartItems([]);
  }, []);

  return (
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
            {/* <div className="flex justify-between item-center">
              <div>Order ID </div>
              <div># {}</div>
            </div> */}

            {/* <OrderTable order={[]} /> */}

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
            onClick={() => router.push("/orders")}
          >
            Your Orders
          </p>
        </div>
      </div>
    </main>
  );
};

export default Success;
