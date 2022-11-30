import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51M9vLZCGmXM6FzSe7rp7hvFIeh4jhYNpTQug9Tdq7x0xHtUmqffgooZpuCeAxryL6Rj9l4GYjNPOSDK8z3lPZfzt00vKFYr1df"
);

const Checkout = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default Checkout;
