const client = require(".");
const films = require("./afi-db");


async function dropTables() {
  try {
    console.log(films);
    console.log("Dropping All Tables...");

    client.query(`
      DROP TABLE IF EXISTS user_films;
      DROP TABLE IF EXISTS films;
      DROP TABLE IF EXISTS users;
    `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error while dropping tables!");

    throw error;
  }
}

async function createTables() {
  // create all tables, in the correct order
  try {
    console.log("Starting to build tables...");

    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );

      CREATE TABLE films(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) UNIQUE NOT NULL,
        director VARCHAR(255) UNIQUE NOT NULL,
        year VARCHAR(255) UNIQUE NOT NULL,
        genre VARCHAR(255) UNIQUE NOT NULL,
        boxArt TEXT NOT NULL
      );

const seedDB = async () => {
  // before we insert a book what do we need to build?
  await client.query(`
    DROP TABLE IF EXISTS films;

    CREATE TABLE films (id SERIAL PRIMARY KEY, title VARCHAR(255) UNIQUE NOT NULL);

    INSERT INTO films (title) VALUES ('Shawshank Redemption');


      CREATE TABLE user_films(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "filmId" INTEGER REFERENCES films(id),
        purchaseDate TIMESTAMP,
        expiryDate TIMESTAMP
        
      );
    `);

    console.log("Finished constructing tables!");
  } catch (error) {
    console.error("Error constructing tables!");

    throw error;
  }
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    //await createInitialUsers();
    //await createInitialFilms();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};
//seedDB();
