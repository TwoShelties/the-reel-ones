import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import troText2 from "./media/troText2.png";
import FilmsCardData from "./FilmsCardData";

const Films = ({ films, token, cartArray, setCartArray, userData }) => {
  const navigate = useNavigate();
  const [genreSearchInput, setGenreSearchInput] = useState("");
  const [directorSearchInput, setDirectorSearchInput] = useState("");
  const [filteredFilms, setFilteredFilms] = useState(films);
  const [query, setQuery] = useState("");
  //
  const directors = [];
  let directorsSet;
  const genres = [];
  let genresSet;

  useEffect(() => {
    search();
  }, [query, films]);

  const filmSearchInputHandler = (event) => {
    setQuery(event.target.value);
  };

  const genreSearchHandler = (event) => {
    setGenreSearchInput(event.target.value);

    if (event.target.value === "Genre") {
      setFilteredFilms(films);
      return;
    }

    let searchResults = films.filter((film) =>
      film.genre.includes(event.target.value)
    );
    setFilteredFilms(searchResults);
  };

  const directorSearchHandler = (event) => {
    setDirectorSearchInput(event.target.value);

    if (event.target.value === "Director") {
      setFilteredFilms(films);
      return;
    }

    let searchResults = films.filter(
      (film) => film.director === event.target.value
    );
    setFilteredFilms(searchResults);
  };

  const filmSearchFormHandler = (event) => {
    // event.preventDefault();
    // if (!query && !directorSearchInput && !genreSearchInput) {
    //   console.log("user attempting to submit a blank form");
    //   alert("You cannot submit an empty search form.");
    //   return;
    // }
    // console.log(
    //   `attempting to send a fetch request based on user form submission: input: ${query}, genre: ${genreSearchInput}, director: ${directorSearchInput}`
    // );
    // put a fetch request stuff here...
  };

  const search = () => {
    // console.log(query);
    const directorSelect = document.getElementById("director-select");
    const genreSelect = document.getElementById("genre-select");
    // console.log(directorSelect.value, genreSelect.value);

    let searchResults = films.filter(
      (film) =>
        film.title.includes(query) ||
        film.director.includes(query) ||
        film.genre.includes(query)
    );
    // console.log(searchResults);

    // add in a function for all permutations of the query string:
    setFilteredFilms(searchResults);
  };

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

  const createNewDirectorsString = (directorsString) => {
    const newDirectorString = directorsString
      .replace(/{|_/g, "")
      .replace(/}|_/g, "")
      .replace(/"|_/g, "")
      .replace(/,|_/g, ",");

    const newDirectors = newDirectorString.split(",");

    return newDirectors;
  };

  const addFilmToCart = (filmId) => {
    if (cartArray.includes(filmId)) {
      return;
    }

    setCartArray((current) => [...current, filmId]);
  };

  return (
    <div className="films-container">
      <div className="opaque-cover"></div>
      <img src={troText2} />
      {/* {token ? <h1>Films</h1> : <h1>Your choice of the greatest ever made</h1>} */}
      {!token ? (
        <div>
          <p>Like what you see?</p>
          <Link to="/register">Sign Up Today</Link>
        </div>
      ) : (
        <></>
      )}
      {filteredFilms ? (
        <div>
          <form onSubmit={filmSearchFormHandler} className="search-films-form">
            <input
              type="text"
              className="films-search-input"
              placeholder="search for films by title, director, or genre..."
              onChange={filmSearchInputHandler}
              value={query}
            />
          </form>

          <ul className="film-list-container">
            {filteredFilms.map((film) => {
              return (
                <li className="films-list-item">
                  <div className="film-card">
                    <h3
                      className="film-card-title"
                      onClick={(event) => {
                        console.log(
                          "navigating to page for film ID: " + film.id
                        );
                        navigate(`/films/${film.id}`);
                      }}
                    >
                      {film.title}
                    </h3>
                    <p className="film-card-year">({film.year})</p>
                    <img
                      src={film.img}
                      className="film-card-img"
                      onClick={(event) => {
                        navigate(`/films/${film.id}`);
                      }}
                    />
                    <div className="film-card-data">
                      <p>
                        Director:{" "}
                        <span className="film-data-tag">
                          {film.director.includes("{") ||
                          film.director.includes("}") ? (
                            createNewDirectorsString(film.director).map(
                              (director) => {
                                return (
                                  <span
                                    className="multiple-genre-wrapper"
                                    onClick={() => {
                                      setQuery(director);
                                      console.log(director);
                                    }}
                                  >
                                    {director}
                                  </span>
                                );
                              }
                            )
                          ) : (
                            <span
                              onClick={() => {
                                setQuery(film.director);
                              }}
                            >
                              {film.director}
                            </span>
                          )}
                        </span>
                      </p>
                      <p>
                        Genre:{" "}
                        <span className="film-data-tag">
                          {film.genre.includes("{") ||
                          film.genre.includes("}") ? (
                            createNewGenreStrings(film.genre).map((genre) => {
                              return (
                                <span
                                  className="multiple-genre-wrapper"
                                  onClick={() => {
                                    setQuery(genre);
                                  }}
                                >
                                  {genre}
                                </span>
                              );
                            })
                          ) : (
                            <span
                              onClick={() => {
                                setQuery(film.genre);
                              }}
                            >
                              {film.genre}
                            </span>
                          )}
                        </span>
                      </p>
                      {/* <p className="film-description">{film.description}</p> */}
                      <p>${film.price}/day</p>

                      <div className="films-card-data">
                        <FilmsCardData
                          film={film}
                          userData={userData}
                          token={token}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Films;
