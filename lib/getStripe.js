const { loadStripe } = require("@stripe/stripe-js");

let stripe;

const getStripe = async () => {
  if (!stripe) {
    stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_LEY);
  }
  return stripe;
};

export default getStripe;

export const handleCheckout = async (cartItems) => {
  const stripe = await getStripe();
  const response = await fetch("/api/stripe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cartItems),
  });
  const data = await response.json();
  await stripe.redirectToCheckout({
    sessionId: data.id,
  });
};
