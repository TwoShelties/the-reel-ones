const client = require(".");

async function getAllUserFilms() {
  try {
    const {
      result: [film],
    } = await client.query(
      `
            SELECT * FROM user_films;
      `
    );
    return film;
  } catch (error) {
    console.log("Error with getting user films");
    throw error;
  }
}

async function getFilmByUserId(userId) {
  try {
    const {
      result: [film],
    } = await client.query(
      `
            SELECT * FROM user_films 
            WHERE "userId" = $1;
            `,
      [userId]
    );
    return film;
  } catch (error) {
    console.log("Error with getting film by userId");
    throw error;
  }
}

async function addFilmToUserId(userId, filmId, purchaseDate, expiryDate) {
  try {
    const {
      result: [film],
    } = await client.query(
      `
        INSERT INTO user_films (“userId”, “filmId”, "purchaseDate", "expiryDate")
        VALUES ($1, $2, $3, $4) 
        RETURNING *;
        `,
      [userId, filmId, purchaseDate, expiryDate]
    );
  } catch (error) {
    console.log("Error with adding film to user profile");
    throw error;
  }
}

module.exports = {
  getAllUserFilms,
  getFilmByUserId,
  addFilmToUserId,
};
