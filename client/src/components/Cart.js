import React, { useEffect, useState } from "react";
import TableData from "./TableData";
import Checkout from "./Checkout";

const Cart = ({ cartArray, setCartArray, films, userData, token }) => {
  const [cartItems, setCartItems] = useState([]);
  const [today, setToday] = useState("");
  const [checkingOut, setCheckingOut] = useState(false);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  const getCartContents = async () => {
    const response = await fetch(`/api/cart/${userData.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const info = await response.json();
    // console.log(info);
    if (info.success) {
      setCartItems(info.cart);
      // console.log("retrieved cart for user ID: " + userData.id);
      calculateTotalCartPrice();
    }
  };

  const calculateTotalCartPrice = () => {
    if (!cartItems || !films) {
      return;
    }

    // Get array of days (per film):
    let daysArr = [];
    cartItems.map((item) => {
      daysArr.push(item.days);
    });

    // console.log(daysArr);

    // Revert cart to array of film objects and push their price keys:
    let cartFilmsPrices = [];

    cartItems.map((item) => {
      films.map((film) => {
        if (film.id === item.filmId) {
          cartFilmsPrices.push(film.price);
        }
      });
    });

    // console.log(cartFilmsPrices);

    let result = [];

    for (let i = 0; i < daysArr.length; i++) {
      result[i] = (daysArr[i] * cartFilmsPrices[i]).toFixed(2);
    }

    // console.log("result: ", result);

    // Convert array of number strings to integers:
    const numberArr = [];
    for (let value of result) {
      numberArr.push(Number(value));
    }
    // console.log(numberArr);

    // Get sum price of all cart items:
    const sum = numberArr.reduce((a, b) => a + b, 0).toFixed(2);
    // console.log("cart sum total: " + sum);

    setTotalCartPrice(sum);
  };

  useEffect(() => {
    getCartContents();
  }, [userData, films, cartItems]);

  /*
  const purchaseItems = async (userId) => {
    console.log(`User ID: ${userId} is purchasing cart items`);

    const response = await fetch(`api/userFilms/${userData.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const info = await response.json();
    console.log(info);
    if (info.success) {
      alert(`items purchased!`);
    }
  };
  */

  return (
    <div className="cart-container">
      <button
        onClick={(event) => {
          event.preventDefault();
          console.log(cartItems);
        }}
      >
        CL cart items
      </button>
      {cartItems.length > 0 ? (
        <form>
          <table className="cart-items-table">
            <tr>
              <td>Film Title</td>
              <td>Rental Length (days)</td>
              <td>Total Price</td>
              <td>Rental Ends</td>
            </tr>
            {cartItems.map((item) => {
              return (
                <TableData
                  item={item}
                  today={today}
                  films={films}
                  userData={userData}
                  token={token}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  checkingOut={checkingOut}
                  setCheckingOut={setCheckingOut}
                />
              );
            })}
          </table>
          <button
            onClick={(event) => {
              event.preventDefault();
              calculateTotalCartPrice();
              setCheckingOut(!checkingOut);
            }}
          >
            {!checkingOut ? <span>Checkout</span> : <span>Cancel</span>}
          </button>
        </form>
      ) : (
        <p>Your cart is empty</p>
      )}
      {checkingOut ? (
        <div>
          <Checkout
            totalCartPrice={totalCartPrice}
            checkingOut={checkingOut}
            setCheckingOut={setCheckingOut}
            userData={userData}
            token={token}
            setCartItems={setCartItems}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Cart;
