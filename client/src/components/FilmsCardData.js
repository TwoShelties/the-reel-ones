import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FilmsCardData = ({ film, userData, token }) => {
  const today = new Date();
  const [totalPrice, setTotalPrice] = useState(film.price);
  const [rentalEndDate, setRentalEndDate] = useState(today);
  const [days, setDays] = useState(1);

  const calculateTotalPrice = (days) => {
    setTotalPrice(film.price * days);
  };

  const calculateEndDate = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    setRentalEndDate(result);
  };

  useEffect(() => {
    calculateEndDate(today, 1);
  }, []);

  const addItemToCart = async (userId, filmId, days) => {
    console.log(
      `User ID: ${userId} is adding film ID: ${filmId} to cart for amt of days: ${days}`
    );

    const response = await fetch(`/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
        filmId,
        days,
      }),
    });
    const info = await response.json();
    // console.log(info);
    if (info.success) {
      alert(`You have added ${film.title} to your cart for ${days} days!`);
    }
  };

  return (
    <div>
      <div className="film-card-days-container">
        <label>Days: </label>
        <select
          className="film-card-day-select"
          onChange={(event) => {
            calculateTotalPrice(event.target.value);
            calculateEndDate(today, Number(event.target.value));
            setDays(Number(event.target.value));
          }}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
        </select>
      </div>
      <p>Total: ${totalPrice}</p>
      {/* below we split the date string before GMT for legibility */}
      <p>Rental Ends: {String(rentalEndDate).split("G")[0]}</p>
      <button
        className="film-add-to-cart-btn"
        onClick={() => {
          // addFilmToCart(film.id);
          addItemToCart(userData.id, film.id, days);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default FilmsCardData;
