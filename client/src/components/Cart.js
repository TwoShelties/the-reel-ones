import React, { useEffect, useState } from "react";
import TableData from "./TableData";

const Cart = ({ cartArray, setCartArray, films, userData, token }) => {
  const [cartItems, setCartItems] = useState([]);
  const [today, setToday] = useState("");

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
    }
  };

  useEffect(() => {
    getCartContents();
  }, [userData, films]);

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
                />
              );
            })}
          </table>
          <button>Purchase </button>
        </form>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
