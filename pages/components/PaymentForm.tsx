import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const PaymentForm = ({ onPaymentSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
      });

      const data = await response.json();
      const sessionId = data.sessionId;

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        console.error("Error redirecting to checkout:", error);
        setIsLoading(false);
      } else {
        onPaymentSuccess();
      }
    } catch (error) {
      console.error("Error fetching session ID or handling payment:", error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button id="payNow" type="submit" disabled={isLoading}>
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default PaymentForm;
