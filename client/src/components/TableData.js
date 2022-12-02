import React, { useEffect, useState } from "react";

const TableData = ({
  item,
  films,
  userData,
  token,
  cartItems,
  setCartItems,
  checkingOut,
  setCheckingOut,
  fetchCart,
  setFetchCart,
}) => {
  let today = new Date();

  const [totalPrice, setTotalPrice] = useState(item.price);
  const [rentalEndDate, setRentalEndDate] = useState(today);
  const [cartItem, setCartItem] = useState({});

  const calculateEndDate = (date, days) => {
    days = Number(days);
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    // console.log(result);
    setRentalEndDate(result);
  };

  const calculateInitialEndDate = (date, days) => {
    date = today;
    date.setDate(date.getDate() + item.days);
    setRentalEndDate(date);
  };

  const calculateInitialPrices = () => {
    if (!cartItem) {
      return;
    }

    setTotalPrice((cartItem.price * item.days).toFixed(2));
  };

  const filterFilms = async () => {
    if (!films || !cartItems) {
      return;
    }

    let filteredFilm = films.filter((film) => film.id === item.filmId)[0];

    cartItems.map((data) => {
      if (data.filmId === filteredFilm.id) {
        setCartItem(filteredFilm);
      }
    });

    // setCartItem(filteredFilm);
  };

  const removeCartItem = async (userId, filmId) => {
    if (!userId || !filmId || !token) {
      return;
    }

    // console.log(
    //   `attempting to remove film ID: ${filmId} from user ID: ${userId}'s cart`
    // );

    const response = await fetch(`/api/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
        filmId,
      }),
    });
    const info = await response.json();
    // console.log(info);
    if (info.success) {
      alert(`You have removed ${cartItem.title} from your cart.`);
      setCartItems(info.updatedCart);
      filterFilms();
    }
  };

  const updateCartItem = async (days) => {
    if (!userData || !cartItem || !token) {
      return;
    }
    console.log(`changing rental length on cart item to ${days} days`);
    // console.log(cartItem);
    // console.log(userData);
    // console.log(token);

    const response = await fetch(`/api/cart/${userData.id}/${cartItem.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        days,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.success && data.editedCartItem) {
      setFetchCart(!fetchCart);
      setCheckingOut(false);
      // alert(
      //   `You have changed the the rental length for ${cartItem.title} to ${days} days!`
      // );
    }
  };

  useEffect(() => {
    filterFilms();
    calculateInitialEndDate();
    calculateInitialPrices();
  }, [item, cartItem, userData, cartItems]);

  if (!item || !cartItem) {
    return <></>;
  }

  return (
    <tr>
      <td>{cartItem.title}</td>
      <td>
        <select
          onChange={(event) => {
            setTotalPrice(event.target.value * cartItem.price);
            // console.log(event.target.value);
            calculateEndDate(today, event.target.value);
            updateCartItem(Number(event.target.value));
          }}
          value={item.days}
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
      <td>${totalPrice}</td>
      <td>{String(rentalEndDate)}</td>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "1rem",
        }}
      >
        <button
          onClick={(event) => {
            event.preventDefault();
            if (!userData.id) {
              return;
            }
            removeCartItem(userData.id, cartItem.id);
          }}
          className="review-edit-btn"
        >
          Remove
        </button>
      </div>
      {/* <button
        onClick={async (event) => {
          event.preventDefault();
          const response = await fetch(`/api/cart/${userData.id}`);
          const data = await response.json();
          console.log(data);
        }}
      >
        GET cart
      </button> */}
    </tr>
  );
};

export default TableData;
