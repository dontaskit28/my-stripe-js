import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Product",
              },
              unit_amount: 1000,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/",
      });

      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end();
  }
}
