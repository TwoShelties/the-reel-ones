const { response } = require("express");
const client = require("./index");

const fetchFilms = async () => {
  try {
    // console.log("calling fetchFilms()...");
    const response = await client.query(`
    SELECT * FROM films
    `);
    // console.log(response.rows);
    return response.rows;
  } catch (error) {
    console.error("an error occurred during fetchFilms()");
    throw error;
  }
};

// TEST FOR fetchFilms:
// async function testFetchFilms() {
//   const response = await fetchFilms();
//   console.log(response[100]);
// }
// testFetchFilms();

async function createFilm({
  title,
  director,
  year,
  genre,
  img,
  description,
  price,
}) {
  try {
    const result = await client.query(
      `
  INSERT INTO films(title, director, year, genre, img, description, price)
  VALUES($1,$2,$3,$4,$5,$6,$7)
  RETURNING *;
  `,
      [title, director, year, genre, img, description, price]
    );
    return result.rows[0];
  } catch (error) {
    console.log("error creating film");
    throw error;
  }
}

// TEST FOR createFilm:
// async function testCreateFilm() {
//   const newFilmObj = {
//     title: "Test Title 2",
//     director: "Test Director",
//     year: 1999,
//     genre: "Test Genre",
//     img: "test.com",
//     description: "Test description",
//     price: 1.99,
//   };
//   const response = await createFilm(newFilmObj);
//   console.log(response);
// }
// testCreateFilm();

async function getFilmByTitle(title) {
  try {
    const {
      rows: [film],
    } = await client.query(
      `
    SELECT *
    FROM films
    WHERE title=$1
    `,
      [title]
    );
    return film;
  } catch (error) {
    console.log("error getting film title");
    throw error;
  }
}

// TEST FOR getFilmByTitle:
// async function testGetFilmByTitle() {
//   const film = "Test sadfsdf 2";
//   const response = await getFilmByTitle(film);
//   console.log(response);
// }
// testGetFilmByTitle();

async function getFilmByDirector(director) {
  try {
    const response = await client.query(
      `
    SELECT *
    FROM films
    WHERE director=$1
    `,
      [director]
    );
    return response.rows;
  } catch (error) {
    console.log("error getting film director");
    throw error;
  }
}

// TEST FOR getFilmByDirector
// async function testGetFilmByDirector() {
//   const director = "Steven Spielberg";
//   const response = await getFilmByDirector(director);
//   console.log(response);
// }
// testGetFilmByDirector();

async function getFilmByYear(year) {
  try {
    const response = await client.query(
      `
    SELECT *
    FROM films
    WHERE year=$1
    `,
      [year]
    );
    return response.rows;
  } catch (error) {
    console.log("error getting film year");
    throw error;
  }
}

// TEST FOR getFilmByYear
// async function testGetFilmByYear() {
//   const year = 1979;
//   const response = await getFilmByYear(year);
//   console.log(response);
// }
// testGetFilmByYear();

async function getAllFilmGenres() {
  try {
    const response = await client.query(
      `
      SELECT * FROM genres;
      `
    );

    return response.rows;
  } catch (error) {
    console.error("error retrieving films from genres table...");
    throw error;
  }
}
// getAllFilmGenres();

async function getGenresByFilmId(id) {
  try {
    const response = await client.query(
      ` 
      SELECT * from genres
      WHERE "filmId"=$1;
      `,
      [id]
    );

    console.log(response.rows);
    return response.rows;
  } catch (error) {
    console.error("error getting film by genre");
    throw error;
  }
}

async function getFilmByGenre(genre) {
  try {
    console.log("searching films by genre: ", genre);
    // console.log(typeof genre);

    if (genre.includes("science")) {
      genre = `"scienceFiction"`;
    }

    if (genre.includes("children")) {
      genre = `"children's"`;
    }

    const response = await client.query(
      `
        SELECT * FROM genres
        WHERE genres.${genre}=true;
        `
    );

    // console.log(response.rows);

    if (response.rows) {
      const mapResponse = response.rows.map(async (film) => {
        const result = await client.query(
          `
            SELECT * FROM films
            WHERE films.id=$1;
            `,
          [film.filmId]
        );

        // console.log(result.rows);

        return result.rows;
      });
    } else {
      console.log(`no films found for input genre: ${genre}`);
    }
  } catch (error) {
    console.error("error retrieving films by genre");
    throw error;
  }
}

// getFilmByGenre("childrens");

async function getFilmByGenreId(genreId) {
  try {
    const response = await client.query(
      `
      SELECT * FROM genres
      WHERE id=$1
      `,
      [genreId]
    );

    console.log(response.rows);
    return response.rows;
  } catch (error) {
    console.error("an error occurred retrieving film by genre id");
    throw error;
  }
}

async function updateFilm({
  id,
  title,
  director,
  year,
  description,
  price,
  image,
  genre,
}) {
  try {
    id = Number(id);
    year = Number(year);

    console.log("attempting to update film ID: ", id);

    // director = "'" + director + "'";
    // console.log(director);
    // description = "'" + description + "'";
    // console.log(description);
    // console.log(year);

    const response = await client.query(
      `
      UPDATE films
      SET title=$1, director=$2, year=$3, description=$4, price=$5, img=$6, genre=$7
      WHERE id=$8
      RETURNING *;
      `,
      [title, director, year, description, price, image, genre, id]
    );
    console.log(response.rows);

    return response.rows[0];
  } catch (error) {
    console.log("error updating film");
    throw error;
  }
}

// TEST updateFilm:
// async function testUpdateFilm() {
//   const response = await updateFilm({ id: 103, img: "NEW IMG" });
//   console.log(response);
// }
// testUpdateFilm();

async function deleteFilm(id) {
  try {
    console.log("calling deleteFilm...");
    const result = await client.query(
      `
        DELETE 
        FROM films 
        WHERE id=$1
        RETURNING *;
        `,
      [id]
    );

    return result.rows;
  } catch (error) {
    console.log("error deleting film");
    throw error;
  }
}

// TEST deleteFilm:
// async function testDeleteFilm() {
//   const response = await deleteFilm(104);
//   console.log(response);
// }
// testDeleteFilm();

async function getFilmById(id) {
  try {
    const response = await client.query(
      `
      SELECT * FROM films
      WHERE id=$1
      `,
      [id]
    );

    return response.rows;
  } catch (error) {
    console.error("an error occurred during getFilmById");
    throw error;
  }
}

// async function x() {
//   const f = await getFilmById(101);
//   console.log(f);
// }
// x();

module.exports = {
  fetchFilms,
  createFilm,
  getFilmByTitle,
  getFilmByDirector,
  getFilmByGenre,
  getFilmByYear,
  updateFilm,
  deleteFilm,
  getFilmById,
  getAllFilmGenres,
  getGenresByFilmId,
};
