import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import React from "react";
const stripe = require(/* webpackIgnore: true */ "stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = getSession(ctx.req, ctx.res);
    const stripeId = session.user[`http://localhost:3000/stripe_customer_id`];

    const paymentIntents = await stripe.paymentIntents.list({
      customer: stripeId,
    });

    return {
      props: {
        orders: paymentIntents.data,
      },
    };
  },
});

const Orders = ({ user, orders }) => {
  const router = useRouter();

  if (!user) router.push("/");

  const renderOrders = (orders) => {
    return orders.map((order) => {
      const { id, createdAt, amount, shipping } = order;
      const orderId = id.slice(15, 25);
      const createdDate = order.created * 1000;
      const date = new Date(createdDate);
      const nf = Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      });

      return (
        <div
          key={order.id}
          className="flex justify-start items-stretch border w-full px-3 py-2 rounded-md 
          hover:border-navy-blue transition-all duration-100 cursor-pointer"
        >
          <div className="w-[50%] h-full flex flex-col items-stretch justify-start">
            <div
              className="text-xl text-pink font-josan font-light w-fit 
            mb-2 hover:text-purple hover:underline underline-offset-2"
            >
              # {orderId}
            </div>
            <div className="w-fit font-josan text-xl ">
              {" "}
              {date.toLocaleDateString(createdDate)}
            </div>
            <div className="w-fit font-josan font-light">
              {" "}
              {date.toLocaleTimeString(createdDate)}
            </div>
          </div>
          <div className="w-[50%] text-right h-full">
            <div className="w-full text-xl font-bold mb-2">
              {nf.format(amount)}
            </div>
            <div className="font-josan">
              <div className="text-navy-blue font-light text-xl">
                {shipping?.name}
              </div>
              <div>{shipping?.address?.city}</div>
              <div>
                {shipping?.address?.state} - {shipping?.address?.postal_code}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <main>
        <div className="bg-white p-5 md:p-10 flex flex-col justify-start items-center">
          <div
            className="text-2xl px-3  text-purple font-lato font-bold w-full 
          md:text-4xl md:font-light md:w-[50%] "
          >
            Orders
          </div>

          {orders.length ? (
            <div className="w-full mt-5 px-1 md:w-[50%] flex flex-col gap-y-5 md:gap-y-10">
              {renderOrders(orders)}
            </div>
          ) : (
            <div className="flex my-10">
              <div className="font-josan text-2xl font-light">
                {" "}
                You have not bought anything yet!
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Orders;
