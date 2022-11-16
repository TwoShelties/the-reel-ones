import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Films = ({ films }) => {
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

  return (
    <div>
      <h1>Films</h1>
      {filteredFilms ? (
        <div>
          <form onSubmit={filmSearchFormHandler}>
            <input
              type="text"
              className="films-search-input"
              onChange={filmSearchInputHandler}
              value={query}
            />
            <select onChange={genreSearchHandler} id="genre-select">
              <option>Genre</option>
              {films.map((film) => {
                if (!film.genre.includes("{") || !film.genre.includes("}")) {
                  genres.push(film.genre);
                } else {
                  const newGenreString = film.genre
                    .replace(/{|_/g, "")
                    .replace(/}|_/g, "")
                    .replace(/"|_/g, "")
                    .replace(/,|_/g, " ");
                  // console.log(newGenreString);

                  const newGenres = newGenreString.split(" ");
                  // console.log(newGenres);

                  newGenres.forEach((element) => {
                    genres.push(element);
                  });
                }
              })}
              {(genresSet = [...new Set(genres)].sort())}
              {genresSet.map((genre) => {
                return <option>{genre}</option>;
              })}
            </select>
            <select onChange={directorSearchHandler} id="director-select">
              <option>Director</option>
              {films.map((film) => {
                if (
                  !film.director.includes("{") ||
                  !film.director.includes("}")
                ) {
                  directors.push(film.director);
                } else {
                  const newDirectorString = film.director
                    .replace(/{|_/g, "")
                    .replace(/}|_/g, "")
                    .replace(/"|_/g, "")
                    .replace(/,|_/g, ",");
                  // console.log(newDirectorString);

                  const newDirectors = newDirectorString.split(",");
                  // console.log(newDirectors);

                  newDirectors.forEach((element) => {
                    directors.push(element);
                  });
                }
              })}
              {(directorsSet = [...new Set(directors)].sort())}
              {directorsSet.map((director) => {
                return <option>{director}</option>;
              })}
            </select>
            <button onClick={(event) => event.preventDefault()}>Submit</button>
          </form>

          <ul>
            {filteredFilms.map((film) => {
              // console.log(film.genre);
              return (
                <li>
                  <div className="films-card-container">
                    <div
                      className="film-card"
                      onClick={(event) => {
                        console.log(film.id);
                        navigate(`/films/${film.id}`);
                      }}
                    >
                      <h3>{film.title}</h3>
                      <p>({film.year})</p>
                      <img src={film.img} />
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
                        <p className="film-description">{film.description}</p>
                        <p>${film.price}/day</p>
                        <button className="film-add-to-cart-btn">
                          Add to Cart
                        </button>
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
