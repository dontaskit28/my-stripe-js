import React, { useState } from "react";
import PaymentForm from "./components/PaymentForm";

const Checkout = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
  };

  return (
    <div>
      <h1>Checkout</h1>
      {paymentSuccess ? (
        <div>Payment successful! Thank you!</div>
      ) : (
        <PaymentForm onPaymentSuccess={handlePaymentSuccess} />
      )}
    </div>
  );
};

export default Checkout;
