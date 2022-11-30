import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Reviewing from "./Reviewing";
import Reviews from "./Reviews";

const Film = ({ films, userData, token }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [focusFilm, setFocusFilm] = useState({});
  const [focusDirector, setFocusDirector] = useState([]);
  const [genres, setGenres] = useState([]);
  const [recommendedFilmsByGenre, setReccomendedFilmsByGenre] = useState([]);
  const [recommendedFilmsByYear, setReccomendedFilmsByYear] = useState([]);

  const [reviews, setReviews] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [reviewing, setReviewing] = useState(false);
  const [newReviewContent, setNewReviewContent] = useState("");
  const [viewReviews, setViewReviews] = useState(false);

  const today = new Date();
  const [totalPrice, setTotalPrice] = useState(0);
  const [rentalEndDate, setRentalEndDate] = useState(today);
  const [days, setDays] = useState(1);

  const fetchReviews = async () => {
    const response = await fetch(`/api/reviews/films/${params.filmId}`);
    const data = await response.json();
    // console.log(data);
    if (data) {
      setReviews(data.reviews);
    }
  };

  const fetchAllUsers = async () => {
    const response = await fetch(`/api/users`);
    const data = await response.json();
    // console.log(data);

    if (data.users) {
      setAllUsers(data.users);
    }
  };

  const findTargetFilm = () => {
    const targetFilmId = Number(params.filmId);
    const result = films.filter((film) => film.id === targetFilmId)[0];
    setFocusFilm(result);
  };

  const setTargetFilmDirector = async () => {
    if (!focusFilm || focusFilm.id === undefined) {
      return;
    }

    const response = await fetch(`/api/films/${focusFilm.id}/directors`);
    const data = await response.json();
    // console.log(data);
    if (!data.error) {
      setFocusDirector(data);
    }
  };

  const setTargetFilmGenre = async () => {
    // console.log(focusFilm.id);

    if (!focusFilm || focusFilm.id === undefined) {
      return;
    }
    // Get film genres by film id:
    const response = await fetch(`/api/films/${focusFilm.id}/genres`);
    const data = await response.json();
    // console.log(data);

    let genreValues = [];
    if (!data.genresList) {
      return;
    }
    const dataMap = data.genresList[0].map((genreKey) => {
      // console.log(genreKey);
      if (genreKey.includes(true)) {
        genreValues.push(genreKey[0]);
      }
    });
    // console.log(genreValues);

    if (genreValues.length > 0) {
      setGenres(genreValues);
    }
  };

  const similarFilmsCheckByGenre = async (genre) => {
    if (!focusFilm) {
      return;
    }

    async function findCurrentFilmGenre() {
      const id = Number(params.filmId);
      const result = films.filter((film) => film.id === id)[0];
      return result;
    }

    const currentFilmGenre = await findCurrentFilmGenre();
    // console.log(currentFilmGenre.genre);

    if (!currentFilmGenre) {
      return;
    }

    genre = currentFilmGenre.genre;
    let result = [];

    if (genre.includes(`}`) || genre.includes(`{`)) {
      // console.log("restructuring genre string...");

      const createNewGenreStrings = (genreString) => {
        // console.log(genreString);

        const newGenreString = genreString
          .replace(/{|_/g, "")
          .replace(/}|_/g, "")
          .replace(/"|_/g, "")
          .replace(/,|_/g, " ");
        // console.log(newGenreString);

        const newGenres = newGenreString.split(" ");
        // console.log(newGenres);

        return newGenres;
      };
      const genreArray = createNewGenreStrings(genre);

      function checkGenreArray(array) {
        for (let genre of array) {
          result.push(films.filter((film) => film.genre === genre));
        }
        result = [].concat.apply([], result);
        // console.log("recommended films: ", result);
        setReccomendedFilmsByGenre(result);
      }
      checkGenreArray(genreArray);
      return;
    }

    result = films.filter(
      (film) => film.genre === genre && focusFilm.title !== film.title
    );
    setReccomendedFilmsByGenre(result);
  };

  const similarFilmsCheckByYear = (year) => {
    if (!focusFilm) {
      return;
    }

    year = focusFilm.year;

    let yearRange = [];
    const minYear = year - 5;
    const maxYear = year + 5;

    for (let i = minYear; i <= maxYear; i++) {
      yearRange.push(i);
    }

    function checkYearRange(yearArr) {
      let result = [];

      for (let year of yearArr) {
        result.push(
          films.filter(
            (film) => film.year === year && film.title !== focusFilm.title
          )
        );
      }

      if (result.length === 0) {
        return;
      }

      result = [].concat.apply([], result);

      setReccomendedFilmsByYear(result);
    }
    checkYearRange(yearRange);
    return;
  };

  const calculateInitialPrice = () => {
    if (!focusFilm) {
      return;
    }

    setTotalPrice(focusFilm.price);
  };

  const calculateTotalPrice = (days) => {
    setTotalPrice(focusFilm.price * days);
  };

  const calculateEndDate = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    setRentalEndDate(result);
  };

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
      alert(`You have added ${focusFilm.title} to your cart for ${days} days!`);
    }
  };

  useEffect(() => {
    findTargetFilm();
    setTargetFilmGenre();
    setTargetFilmDirector();
    similarFilmsCheckByGenre();
    similarFilmsCheckByYear();
    fetchReviews();
    fetchAllUsers();
    calculateEndDate(today, 1);
    calculateInitialPrice();
  }, [films, focusFilm, params.filmId]);

  if (!focusFilm) {
    return <></>;
  }

  return (
    <div>
      <div className="target-film">
        <h1>
          {focusFilm.title}
          <span className="film-year-wrapper">({focusFilm.year})</span>
        </h1>
        <ul>
          {focusDirector && focusDirector.length > 1 ? (
            <span>
              {/* {console.log("focusDirector ", focusDirector)} */}
              {focusDirector.map((director) => {
                return <li>{director}</li>;
              })}
            </span>
          ) : (
            <li>
              {/* {console.log("focusDirector: ", focusDirector)} */}
              {focusDirector[0]}
            </li>
          )}
        </ul>
        {/* <p>{focusFilm.director}</p> */}
        <img src={focusFilm.img} className="film-img" />
        <p>Genre(s):</p>
        {genres ? (
          <ul className="focus-film-genre-tags">
            {genres.map((genre) => {
              return (
                <li
                  onClick={() => {
                    // console.log(genre);
                  }}
                >
                  {genre}
                </li>
              );
            })}
          </ul>
        ) : (
          <></>
        )}
        <p>{focusFilm.description}</p>
        <p>${focusFilm.price}/day</p>
        <div className="film-page-cart-content">
          <select
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
          <p>Total: ${totalPrice}</p>
          <p>Rental Ends: {String(rentalEndDate)}</p>
          <button
            className="film-add-to-cart-btn"
            onClick={() => {
              // addFilmToCart(film.id);
              addItemToCart(userData.id, focusFilm.id, days);
            }}
          >
            Add to Cart
          </button>
        </div>
        {/* REVIEWS */}
        <button
          onClick={(event) => {
            event.preventDefault();
            setViewReviews(!viewReviews);
          }}
          className="view-reviews-toggle"
        >
          {viewReviews ? (
            <span>Close</span>
          ) : (
            <span>Reviews for {focusFilm.title}</span>
          )}
        </button>
        {viewReviews ? (
          <div className="reviews-container">
            {reviews && allUsers ? (
              <div>
                {!reviewing ? (
                  <button
                    className="add-review-btn"
                    onClick={(event) => {
                      event.preventDefault();
                      setReviewing(!reviewing);
                    }}
                  >
                    Add a Review
                  </button>
                ) : (
                  <></>
                )}

                {reviewing ? (
                  <Reviewing
                    reviews={reviews}
                    setReviews={setReviews}
                    focusFilm={focusFilm}
                    reviewing={reviewing}
                    setReviewing={setReviewing}
                    setNewReviewContent={setNewReviewContent}
                    token={token}
                    newReviewContent={newReviewContent}
                  />
                ) : (
                  <></>
                )}
                {reviews.map((review) => {
                  // console.log(review);
                  return (
                    <Reviews
                      review={review}
                      userData={userData}
                      token={token}
                      focusFilm={focusFilm}
                      setReviews={setReviews}
                    />
                  );
                })}
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="recommended-films">
        {recommendedFilmsByGenre ? (
          <div className="recommended-films-tables">
            <h4>People also enjoyed</h4>
            {recommendedFilmsByGenre.length > 0 ? (
              <div>
                <ul className="recommended-films-list">
                  {recommendedFilmsByGenre.map((film) => {
                    return (
                      <li
                        className="recommended-film-tag"
                        onClick={(event) => {
                          event.preventDefault();
                          similarFilmsCheckByGenre(film.genre);
                          navigate(`/films/${film.id}`);
                          window.scrollTo(0, 0);
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <p>{film.title}</p>
                          <img src={film.img} style={{ width: "7rem" }} />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <></>
            )}

            <div>
              {/* below are the films that were made around the same
              time as focusFilm */}
              {/* <ul>
                <h4>Films made around the same time as {focusFilm.title}</h4>
                {recommendedFilmsByYear.length > 0 ? (
                  <div>
                    <ul className="recommended-films-list">
                      {recommendedFilmsByYear.map((film) => {
                        return (
                          <li
                            className="recommended-film-tag"
                            onClick={(event) => {
                              event.preventDefault();
                              console.log(film);
                              similarFilmsCheckByYear(film.year);
                              navigate(`/films/${film.id}`);
                            }}
                          >
                            {film.title} ({film.year})
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : (
                  <></>
                )}
              </ul> */}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Film;
