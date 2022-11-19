import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const Film = ({ films, userData, token }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [focusFilm, setFocusFilm] = useState({});
  const [focusDirector, setFocusDirector] = useState([]);
  const [genres, setGenres] = useState([]);
  const [recommendedFilmsByGenre, setReccomendedFilmsByGenre] = useState([]);
  const [recommendedFilmsByYear, setReccomendedFilmsByYear] = useState([]);

  const findTargetFilm = () => {
    const targetFilmId = Number(params.filmId);
    const result = films.filter((film) => film.id === targetFilmId)[0];
    setFocusFilm(result);
  };

  const setTargetFilmDirector = async () => {
    if (!focusFilm || focusFilm === undefined) {
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

    if (!focusFilm) {
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
    console.log(currentFilmGenre.genre);

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

  useEffect(() => {
    findTargetFilm();
    setTargetFilmGenre();
    setTargetFilmDirector();
    similarFilmsCheckByGenre();
    similarFilmsCheckByYear();
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
        {/* <p>{focusFilm.genre}</p> */}
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
        <h3>Reviews for {focusFilm.title}</h3>
        <p>Lorem ipsum</p>
      </div>
      <div className="recommended-films">
        {recommendedFilmsByGenre ? (
          <div className="recommended-films-tables">
            <h4>Films with a similar genre to {focusFilm.title}</h4>
            {recommendedFilmsByGenre.length > 0 ? (
              <div>
                {recommendedFilmsByGenre.map((film) => {
                  return (
                    <div>
                      <ul>
                        <li
                          className="recommended-film-tag"
                          onClick={(event) => {
                            event.preventDefault();
                            similarFilmsCheckByGenre(film.genre);
                            navigate(`/films/${film.id}`);
                          }}
                        >
                          {film.title} ({film.year})
                        </li>
                      </ul>
                    </div>
                  );
                })}
              </div>
            ) : (
              <></>
            )}

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
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <></>
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
