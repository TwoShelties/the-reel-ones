import React, { useEffect, useState } from "react";

const Films = ({ films }) => {
  const [genreSearchInput, setGenreSearchInput] = useState("");
  const [directorSearchInput, setDirectorSearchInput] = useState("");
  const [filteredFilms, setFilteredFilms] = useState(films);
  const [query, setQuery] = useState("");

  useEffect(() => {
    search();
  }, [query, films]);

  const filmSearchInputHandler = (event) => {
    setQuery(event.target.value);
  };

  const genreSearchHandler = (event) => {
    setGenreSearchInput(event.target.value);
  };

  const directorSearchHandler = (event) => {
    setDirectorSearchInput(event.target.value);
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
            <select onChange={genreSearchHandler}>
              <option>Genre</option>
              <option>Drama</option>
            </select>
            <select onChange={directorSearchHandler}>
              <option>Director</option>
              <option>Orson Welles</option>
            </select>
            <button>Submit</button>
          </form>
          <ul>
            {filteredFilms.map((film) => {
              // console.log(film.genre);
              return (
                <li>
                  <div className="films-card-container">
                    <div className="film-card">
                      <h3>{film.title}</h3>
                      <p>({film.year})</p>
                      <img src={film.img} />
                      <div className="film-card-data">
                        <p onClick={() => setQuery(film.director)}>
                          Director:{" "}
                          <span className="film-data-tag">{film.director}</span>
                        </p>
                        <p onClick={() => setQuery(film.genre)}>
                          Genre:{" "}
                          <span className="film-data-tag">{film.genre}</span>
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
