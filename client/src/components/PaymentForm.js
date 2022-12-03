import React from "react";
import { useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const PaymentForm = ({
  totalCartPrice,
  checkingOut,
  setCheckingOut,
  userData,
  token,
  setCartItems,
}) => {
  const navigate = useNavigate();
  const elements = useElements();
  const stripe = useStripe();

  const handleSubmit = async (event, amt) => {
    event.preventDefault();

    if (!stripe || !elements || !totalCartPrice) {
      return;
    }

    amt = totalCartPrice;
    amt = parseInt(amt.toString().replace(".", ""), 10);

    // create payment intent on the server:
    const clientSecret = await fetch("/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentMethodType: "card",
        currency: "usd",
        amt: amt,
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
    // console.log(paymentIntent);

    if (paymentIntent.status === "succeeded") {
      console.log("payment succeeded, amount: " + paymentIntent.amount);
      setCheckingOut(!checkingOut);
      //alert("Your payment has been accepted!");

      // enter cart data into usersFilms table

      const createPurchase = await fetch(`api/usersFilms/${userData.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const purchase = await createPurchase.json();
      console.log(purchase);

      if (purchase.success) {
        //setCurrentItems(purchase.currentPurchases);
        console.log(purchase.purchaseItems);

        const response = await fetch(`/api/cart/${userData.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);

        if (data.success) {
          setCartItems([]);
          alert("Your payment has been accepted!");
          navigate("/profile");
          //return;
        }
      }

      /*
      const response = await fetch(`/api/cart/${userData.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);

      if (data.success) {
        setCartItems([]);
        return;
      }
      */
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
