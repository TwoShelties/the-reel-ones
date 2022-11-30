import React from "react";
import { useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const navigate = useNavigate();
  const elements = useElements();
  const stripe = useStripe();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // create payment intent on the server:
    const clientSecret = await fetch("/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentMethodType: "card",
        currency: "usd",
      }),
    });

    const data = await clientSecret.json();
    // console.log(data);

    // confirm payment on the client:
    const { paymentIntent } = await stripe.confirmCardPayment(
      data.clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    // console.log(`Payment Intent (${paymentIntent})`);
    console.log(paymentIntent);

    if (paymentIntent.status === "succeeded") {
      alert("Your payment has been accepted!");
      navigate("/profile");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        width: "50%",
        margin: "0 auto",
        color: "#000",
      }}
    >
      <form onSubmit={handleSubmit}>
        <CardElement id="card-element" />

        <button>Pay</button>
        <p>note: payment integration developed with Stripe.js</p>
      </form>
    </div>
  );
};

export default PaymentForm;
