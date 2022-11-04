const client = require(".");

const fetchFilms = async () => {
  const response = await client.query(`
    SELECT * FROM films
    `);
  return response.rows;
};

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
  INSERT INTO films(title, director, year, genre, img, description)
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
async function getFilmByDirector(director) {
  try {
    const {
      rows: [film],
    } = await client.query(
      `
    SELECT *
    FROM films
    WHERE director=$1
    `,
      [director]
    );
    return film;
  } catch (error) {
    console.log("error getting film director");
    throw error;
  }
}
async function getFilmByYear(year) {
  try {
    const {
      rows: [film],
    } = await client.query(
      `
    SELECT *
    FROM films
    WHERE year=$1
    `,
      [year]
    );
    return film;
  } catch (error) {
    console.log("error getting film year");
    throw error;
  }
}
async function getFilmByGenre(genre) {
  try {
    const {
      rows: [film],
    } = await client.query(
      `
    SELECT *
    FROM films
    WHERE genre=$1
    `,
      [genre]
    );
    return film;
  } catch (error) {
    console.log("error getting film genre");
    throw error;
  }
}

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
    return result.rows[0];
  } catch (error) {
    console.log("error deleting film");
    throw error;
  }
}

module.exports = {
  fetchFilms,
  createFilm,
  getFilmByTitle,
  getFilmByDirector,
  getFilmByGenre,
  getFilmByYear,
  updateFilm,
  deleteFilm,
};
