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
    console.log(paymentIntent);

    if (paymentIntent === undefined) {
      alert(
        "Your credit card was not processed, please ensure you've entered in all information. If your transaction still does not process, please consult your card provider."
      );
      return;
    }

    if (paymentIntent.status === "succeeded") {
      console.log("payment succeeded, amount: " + paymentIntent.amount);
      setCheckingOut(!checkingOut);
      //   alert("Your payment has been accepted!");
      console.log("Attempting to clear cart...");

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
        navigate("/confirmation");
        return;
      }
    }
  };

  return (
    <div className="login-reg-form" style={{ color: "#fff" }}>
      <form onSubmit={handleSubmit}>
        <p style={{ textAlign: "center", margin: "0.5rem" }}>
          Total ${totalCartPrice}
        </p>
        <div
          style={{ width: "33vw", padding: "1rem" }}
          className="cc-payment-form"
        >
          <CardElement id="card-element" style={{ color: "#fff" }} />
        </div>
        <button className="review-edit-btn" style={{ margin: "0.5rem auto" }}>
          Pay
        </button>
        {/* <p style={{ margin: "0.5rem auto" }}>payment integration with Stripe</p> */}
      </form>
    </div>
  );
};

export default PaymentForm;
