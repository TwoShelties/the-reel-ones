const { response } = require("express");
const { getFilmById, fetchFilms } = require("./films");
const client = require("./index");
const filmsArr = require("./afi-db");

async function addFilmIdToGenresTable(film) {
  // try {
  //   console.log("calling addGenreToFilm inside db/genres.js");
  //   const films = await fetchFilms();
  //   console.log("successfully fetched all films in db/genres.js");
  //   // console.log(films);
  //   let allGenres = [];
  //   let genresSet;
  //   const x = await Promise.all(
  //     filmsArr.map((film) => {
  //       // console.log(film.genre);
  //       if (Array.isArray(film.genre)) {
  //         // console.log("film.genre IS an array");
  //         film.genre.map((genre) => {
  //           allGenres.push(genre);
  //           // console.log(genre);
  //         });
  //       } else {
  //         // console.log("film.genre is NOT an array");
  //         allGenres.push(film.genre);
  //       }
  //     })
  //   );
  //   genresSet = [...new Set(allGenres)];
  //   console.log("genresSet:", genresSet);
  //   films.forEach(async (element) => {
  //     console.log("adding filmId: ", element.id, " to genres table");
  //     // const result = await client.query(
  //     //   `
  //     //   INSERT INTO genres("filmId")
  //     //   VALUES ($1)
  //     //   RETURNING *;
  //     //   `,
  //     //   [element.id]
  //     // );
  //     // console.log("genres table:", result.rows);
  //     console.log("dfsdfsdfsd");
  //     for (let genre of genresSet) {
  //       if (element.genre.includes(genre)) {
  //         console.log(
  //           element.title,
  //           " id: ",
  //           element.id,
  //           "includes genre:",
  //           genre
  //         );
  //         async function addToGenresTable(filmId) {
  //           try {
  //             // console.log("adding filmId: ", filmId, " to genres table");
  //             // const result = await client.query(
  //             //   `
  //             //   INSERT INTO genres("filmId")
  //             //   VALUES($1)
  //             //   RETURNING *;
  //             //   `,
  //             //   [filmId]
  //             // );
  //             // const f = await client.query(
  //             //   `
  //             //   SELECT * FROM genres;
  //             //   `
  //             // );
  //             // console.log(f);
  //             // if (!result) {
  //             //   console.log("fdsdfsdfsd");
  //             // }
  //             // return result;
  //           } catch (error) {
  //             console.error("an error occurred during addToGenresTable");
  //             throw error;
  //           }
  //         }
  //         addToGenresTable(element.id);
  //         // console.log(addedFilms);
  //       }
  //     }
  //   });
  // } catch (error) {
  //   console.error("an error occurred during db/addGenreToFilm");
  //   throw error;
  // }
  try {
    let allGenres = [];
    let genresSet;
    const x = await Promise.all(
      filmsArr.map((film) => {
        // console.log(film.genre);
        if (Array.isArray(film.genre)) {
          // console.log("film.genre IS an array");
          film.genre.map((genre) => {
            allGenres.push(genre);
            // console.log(genre);
          });
        } else {
          // console.log("film.genre is NOT an array");
          allGenres.push(film.genre);
        }
      })
    );
    genresSet = [...new Set(allGenres)];
    console.log("genresSet:", genresSet);

    const { rows: filmData } = await client.query(
      `
      SELECT * FROM films;
      `
    );

    // console.log(films);

    const insertionsIntoGenres = await Promise.all(
      filmData.map(async (film) => {
        const { rows: films } = await client.query(
          `
        INSERT INTO genres("filmId", title)
        VALUES($1, $2)
        RETURNING *;
        `,
          [film.id, film.title]
        );
        // console.log(films);

        let genresMap = genresSet.map(async (genre) => {
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

          let newGenreString;
          if (film.genre.includes("{")) {
            newGenreString = createNewGenreStrings(film.genre);
            // console.log(newGenreString);
          }

          if (
            film.genre.includes(genre) &&
            !film.genre.includes("{") &&
            !film.genre.includes("science") &&
            !film.genre.includes("children's")
          ) {
            const { rows: filmGenres } = await client.query(
              `
              UPDATE genres SET ${genre}=true
              WHERE "filmId"=$1
              RETURNING *;
              `,
              [film.id]
            );

            // console.log(filmGenres);
          }

          if (
            film.genre.includes(genre) &&
            film.genre.includes("{") &&
            !film.genre.includes("science") &&
            !film.genre.includes("children's")
          ) {
            newGenreString.map(async (genreString) => {
              const { rows: newFilmGenres } = await client.query(
                `
                UPDATE genres SET ${genreString}=true
                WHERE "filmId"=$1
                RETURNING *;
                `,
                [film.id]
              );

              // console.log(newFilmGenres);
            });
          }

          if (film.genre.includes("science")) {
            const { rows: response } = await client.query(
              `
              UPDATE genres SET "scienceFiction"=true
              WHERE "filmId"=$1
              RETURNING *
              `,
              [film.id]
            );
          }

          if (film.genre.includes("children")) {
            const { rows: response } = await client.query(
              `
              UPDATE genres SET "children's"=true
              WHERE "filmId"=$1
              RETURNING *
              `,
              [film.id]
            );
          }

          if (film.genre.includes("musical")) {
            const { rows: response } = await client.query(
              `
              UPDATE genres SET "musical"=true
              WHERE "filmId"=$1
              RETURNING *
              `,
              [film.id]
            );
          }
        });
      })
    );
  } catch (error) {
    throw error;
  }
}

async function checkFilms() {
  try {
    const { rows: response } = await client.query(
      `
      SELECT * FROM genres;
      `
    );

    return response;
  } catch (error) {
    throw error;
  }
}

module.exports = { addFilmIdToGenresTable, checkFilms };
