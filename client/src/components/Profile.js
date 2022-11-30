import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Profile = ({ userData, films }) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pastItems, setPastItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const navigate = useNavigate();
  let id = userData.id;

  const currentRentals = async () => {
    const response = await fetch(`api/usersFilms/${id}/currentPurchases`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const info = await response.json();
    console.log(info);

    if (info.success) {
      setCurrentItems(info.currentPurchases);
      console.log(info.currentPurchases);
    }
  };

  const pastRentals = async () => {
    const response = await fetch(`api/usersFilms/${id}/pastPurchases`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const info = await response.json();
    console.log(info);

    if (info.success) {
      setPastItems(info.pastPurchases);
      console.log(info.pastPurchases);
    }
  };

  const allRentals = async () => {
    const response = await fetch(`api/usersFilms/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const info = await response.json();
    console.log(info);

    if (info.success) {
      setAllItems(info.userPurchases);
      console.log(info.userPurchases);
    }
  };

  useEffect(() => {
    currentRentals();
    pastRentals();
    allRentals();
  }, [userData]);

  return (
    <div>
      <h1 className="profile-text">Welcome Back {userData.username}</h1>
      {currentItems.length > 0 ? (
        <div>
          <h3 className="profile-text">Current Purchases</h3>
          <div className="current-purchase-container">
            {currentItems.map((item) => {
              return (
                <div className="purchase-item">
                  {films.map((film) => {
                    if (film.id === item.filmId) {
                      return (
                        <div>
                          <img
                            src={film.img}
                            className="film-purchase-image"
                            onClick={(event) => {
                              navigate(`/films/${film.id}`);
                            }}
                          />
                          <p className="purchase-details">
                            Purchased On: {item.purchasedate.slice(0, 10)}
                          </p>
                          <p className="purchase-details">
                            Ends On: {item.expirydate.slice(0, 10)}
                          </p>
                          <p className="purchase-details">
                            Price: ${film.price}/day
                          </p>
                        </div>
                      );
                    }
                  })}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h3>No current purchases </h3>
      )}
      {pastItems.length > 0 ? (
        <div>
          <h3>Past Purchases</h3>
          <div className="past-purchase-container">
            {pastItems.map((item) => {
              return (
                <div className="purchase-item">
                  {films.map((film) => {
                    if (film.id === item.filmId) {
                      return (
                        <div>
                          <img
                            src={film.img}
                            className="film-purchase-image"
                            onClick={(event) => {
                              navigate(`/films/${film.id}`);
                            }}
                          />
                          <p className="purchase-details">
                            Purchased On: {item.purchasedate.slice(0, 10)}
                          </p>
                        </div>
                      );
                    }
                  })}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h3></h3>
      )}
    </div>
  );
};

export default Profile;
