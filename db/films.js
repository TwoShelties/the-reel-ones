const { response } = require("express");
const client = require("./index");

const fetchFilms = async () => {
  try {
    console.log("calling fetchFilms()...");
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

async function getFilmByGenre(genre) {
  try {
    const response = await client.query(
      `
    SELECT *
    FROM films
    WHERE genre=$1
    `,
      [genre]
    );
    return response.rows;
  } catch (error) {
    console.log("error getting film genre");
    throw error;
  }
}

// async function testGetFilmByGenre() {
//   const genre = "war";
//   const response = await getFilmByGenre(genre);
//   console.log(response);
// }
// testGetFilmByGenre();

async function updateFilm({ id, ...fields }) {
  console.log(fields);
  try {
    for (let key in fields) {
      await client.query(`
      UPDATE films
      SET ${key} = '${fields[key]}'
      WHERE id= ${id}
      `);
      const {
        rows: [response],
      } = await client.query(`
      SELECT *
      FROM films
      WHERE id= ${id}
      `);
      return response;
    }
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
    const result = await client.query(
      `
        DELETE 
        FROM films 
        WHERE id=$1
        RETURNING *;
        `,
      [id]
    );
    return result;
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
};
