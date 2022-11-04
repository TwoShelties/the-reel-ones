const client = require(".");

const fetchFilms = async () => {
  const response = await client.query(`
    SELECT * FROM films
    `);
  return response.rows;
};

async function createFilm({ title, director, year, genre, img, description }) {
  try {
    const result = await client.query(
      `
  INSERT INTO films(title, director, year, genre, img, description)
  VALUES($1,$2,$3,$4,$5,$6)
  RETURNING *;
  `,
      [title, director, year, genre, img, description]
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

module.exports = {
  fetchFilms,
  createFilm,
  getFilmByTitle,
};
