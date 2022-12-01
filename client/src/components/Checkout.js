import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51M9vLZCGmXM6FzSe7rp7hvFIeh4jhYNpTQug9Tdq7x0xHtUmqffgooZpuCeAxryL6Rj9l4GYjNPOSDK8z3lPZfzt00vKFYr1df"
);

const Checkout = ({
  totalCartPrice,
  checkingOut,
  setCheckingOut,
  userData,
  token,
  setCartItems,
}) => {
  return (
    <div>
      {/* <p>Total Price of Cart: ${totalCartPrice}</p> */}
      <Elements stripe={stripePromise}>
        <PaymentForm
          totalCartPrice={totalCartPrice}
          checkingOut={checkingOut}
          setCheckingOut={setCheckingOut}
          userData={userData}
          token={token}
          setCartItems={setCartItems}
        />
      </Elements>
    </div>
  );
};

export default Checkout;
