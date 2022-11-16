import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const Film = ({ films, userData, token }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [focusFilm, setFocusFilm] = useState({});
  const [recommendedFilmsByGenre, setReccomendedFilmsByGenre] = useState([]);
  const [recommendedFilmsByYear, setReccomendedFilmsByYear] = useState([]);

  const findTargetFilm = () => {
    const targetFilmId = Number(params.filmId);
    const result = films.filter((film) => film.id === targetFilmId)[0];
    setFocusFilm(result);
  };

  const similarFilmsCheckByGenre = (genre) => {
    let result = [];
    if (genre.includes(`}`) || genre.includes(`{`)) {
      console.log("restructuring genre string...");

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
        console.log("recommended films: ", result);
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
    let yearRange = [];
    const minYear = year - 5;
    const maxYear = year + 5;

    for (let i = minYear; i <= maxYear; i++) {
      yearRange.push(i);
    }

    function checkYearRange(yearArr) {
      let result = [];

      for (let year of yearArr) {
        result.push(films.filter((film) => film.year === year));
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

  useEffect(() => {
    findTargetFilm();
  }, [films, params.filmId]);

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
        <p>{focusFilm.director}</p>
        <img src={focusFilm.img} className="film-img" />
        <p>{focusFilm.genre}</p>
        <p>{focusFilm.description}</p>
        <p>${focusFilm.price}/day</p>
        <p>
          {token ? (
            <button
              onClick={(event) => {
                event.preventDefault();
                if (!token) {
                  return;
                }

                navigate(`/cart`);
              }}
            >
              Add to Cart
            </button>
          ) : (
            <></>
          )}
        </p>
        <button
          onClick={(event) => {
            event.preventDefault();
            console.log(
              "checking data in reference to focusFilm: " + focusFilm.title
            );

            similarFilmsCheckByGenre(focusFilm.genre);
            similarFilmsCheckByYear(focusFilm.year);
          }}
          className="similar-films-btn"
        >
          Similar Films
        </button>
      </div>
      <div className="recommended-films">
        {recommendedFilmsByGenre.length > 0 ? (
          <div className="recommended-films-tables">
            <h4>Films with a similar genre to {focusFilm.title}</h4>
            {recommendedFilmsByGenre.map((film) => {
              return (
                <div>
                  <ul>
                    <li
                      onClick={(event) => {
                        event.preventDefault();
                        similarFilmsCheckByGenre(film.genre);
                        navigate(`/films/${film.id}`);
                      }}
                    >
                      {film.title}({film.year})
                    </li>
                  </ul>
                </div>
              );
            })}

            <div>
              <ul>
                <h4>Films made around the same time as {focusFilm.title}</h4>
                {recommendedFilmsByYear.length > 0 ? (
                  <div>
                    {recommendedFilmsByYear.map((film) => {
                      return (
                        <div>
                          <ul>
                            <li
                              onClick={(event) => {
                                event.preventDefault();
                                similarFilmsCheckByYear(film.year);
                                navigate(`/films/${film.id}`);
                              }}
                            >
                              {film.title}({film.year}) - {film.genre}
                            </li>
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p>No films found</p>
                )}
              </ul>
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
