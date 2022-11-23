import React, { useEffect, useState } from "react";
import TableData from "./TableData";

const Cart = ({ cartArray, setCartArray, films }) => {
  const [cartItems, setCartItems] = useState([]);
  const [today, setToday] = useState("");

  const getCartFilms = () => {
    if (!films || cartArray.length < 1) {
      return;
    }

    let cartItemsArr = [];
    films.map((film) => {
      cartArray.map((cartItem) => {
        if (film.id === cartItem) {
          cartItemsArr.push(film);
        }
      });
    });

    if (cartItemsArr.length < 1) {
      return;
    }

    setCartItems(cartItemsArr);
  };

  const getDate = () => {
    setToday(new Date());
  };

  useEffect(() => {
    getCartFilms();
    getDate();
  }, [films]);

  return (
    <div>
      <button
        onClick={(event) => {
          event.preventDefault();
          console.log(cartItems);
        }}
      >
        CL cart array
      </button>
      {cartItems ? (
        <form>
          {cartItems.map((item) => {
            let totalPrice = item.price;

            return (
              <table className="cart-items-table">
                <TableData item={item} />
                <tr>
                  <td>Film Title</td>
                  <td>Rental Length (days)</td>
                  <td>Total Price (${item.price}/day)</td>
                  <td>Rental Ends</td>
                </tr>
                {/* <tr>
                  <td>{item.title}</td>
                  <td>
                    <select
                      onChange={(event) => {
                        totalPrice = event.target.value * item.price;
                        console.log(totalPrice);
                        return totalPrice;
                      }}
                      defaultValue="1"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                    </select>
                  </td>
                  <td>{totalPrice}</td>
                  <td>{String(today)}</td>
                </tr> */}
              </table>
            );
          })}
        </form>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
