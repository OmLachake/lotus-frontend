import Stripe from "stripe";

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export default async function hadnler(req, res) {
  if (req.method === "POST") {
    try {
      console.log(req.body);
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["US", "IN", "CA"],
        },
        shipping_options: [{ shipping_rate: "shr_1M0mmuSJ6W495wkif2yqvjER" }],
        allow_promotion_codes: true,
        line_items: req.body.map((item) => {
          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.title,
                images: [item.image],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        // Bring People to Success or Failed Page
        success_url: `${req.headers.origin}/payments/success?&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/payments/cancelled`,
      });
      res.status(200).json(session);
    } catch (error) {
      res.status(error.statusCode || 500).json({
        error: error,
        message: "Something went wrong, please try again",
      });
    }
  }
}
