const { response } = require("express");
const { getFilmById, fetchFilms } = require("./films");
const client = require("./index");
const filmsArr = require("./afi-db");

async function addGenreToFilm(film) {
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
    // console.log("calling db/genres/addGenreToFilm");
    // const allFilms = await client.query(
    //   `
    //   SELECT * FROM films;
    //   `
    // );
    // // console.log(allFilms.rows);
    // allFilms.rows.map(async (film) => {
    //   // console.log(film.id);
    //   const response = await client.query(
    //     `
    //     INSERT INTO genres("filmId")
    //     VALUES(1)
    //     RETURNING *;
    //     `
    //   );
    //   // console.log(films);
    //   return response;
    // });
    // const x = await client.query(
    //   `
    //   INSERT INTO genres("filmId")
    //   VALUES(1)
    //   RETURNING *
    //   `
    // );
    // return x;

    const { rows: films } = await client.query(
      `
      SELECT * FROM films;
      `
    );

    // console.log(films);

    const insertionsIntoGenres = await Promise.all(
      films.map(async (film) => {
        const { rows: films } = await client.query(
          `
        INSERT INTO genres("filmId", title)
        VALUES($1, $2)
        RETURNING *;
        `,
          [film.id, film.title]
        );
        console.log(films);
      })
    );

    // console.log(insertionsIntoGenres);

    // const response = await client.query(
    //   `
    //     INSERT INTO genres("filmId")
    //     VALUES(1)
    //     RETURNING *;

    //   SELECT films.id AS "idFromFilms", genres.* FROM films
    //   INNER JOIN genres
    //   ON films.id=genres."filmId";
    //   `
    // );

    // return response;
  } catch (error) {
    throw error;
  }
}

module.exports = { addGenreToFilm };
