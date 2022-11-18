const client = require(".");
const films = require("./afi-db");
const { createUser } = require("./users");
const {
  createFilm,
  getFilmById,
  getFilmByTitle,
  fetchFilms,
} = require("./films");
const {
  addGenreToFilm,
  addFilmIdToGenresTable,
  checkFilms,
} = require("./genres");

async function dropTables() {
  try {
    console.log("Dropping All Tables...");
    client.query(`
      DROP TABLE IF EXISTS user_films;
      DROP TABLE IF EXISTS genres;
      DROP TABLE IF EXISTS directors;
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
        director VARCHAR(255) NOT NULL,
        year INTEGER NOT NULL,
        genre VARCHAR(255) NOT NULL,
        img VARCHAR NOT NULL,
        description TEXT NOT NULL, 
        price FLOAT NOT NULL
      );
      
      CREATE TABLE user_films(
        id SERIAL PRIMARY KEY,
        “userId” INTEGER REFERENCES users(id),
        “filmId” INTEGER REFERENCES films(id),
        purchaseDate TIMESTAMP,
        expiryDate TIMESTAMP
      );

      CREATE TABLE genres(
        id SERIAL PRIMARY KEY,
        "filmId" INTEGER REFERENCES films(id),
        title VARCHAR(255) REFERENCES films(title),
        drama BOOLEAN DEFAULT FALSE,
        crime BOOLEAN DEFAULT FALSE,
        romance BOOLEAN DEFAULT FALSE,
        musical BOOLEAN DEFAULT FALSE,
        comedy BOOLEAN DEFAULT FALSE,
        western BOOLEAN DEFAULT FALSE,
        "scienceFiction" BOOLEAN DEFAULT FALSE,
        thriller BOOLEAN DEFAULT FALSE,
        mystery BOOLEAN DEFAULT FALSE,
        epic BOOLEAN DEFAULT FALSE,
        adventure BOOLEAN DEFAULT FALSE,
        war BOOLEAN DEFAULT FALSE,
        action BOOLEAN DEFAULT FALSE,
        "children's" BOOLEAN DEFAULT FALSE,
        fantasy BOOLEAN DEFAULT FALSE,
        spy BOOLEAN DEFAULT FALSE,
        other BOOLEAN DEFAULT FALSE
      );

      CREATE TABLE directors(
        id SERIAL PRIMARY KEY,
        "filmId" INTEGER REFERENCES films(id),
        director1 VARCHAR(255),
        director2 VARCHAR(255),
        director3 VARCHAR(255)
      );

    `);
    console.log("Finished constructing tables!");
  } catch (error) {
    console.error("Error constructing tables!");
    throw error;
  }
}

// ADDING INITIAL DATA
async function createInitialUsers() {
  console.log("Starting to create users...");
  try {
    const usersToCreate = [
      { username: "adam", password: "secretpass99" },
      { username: "sandy", password: "sandy123" },
      { username: "henry", password: "henry123" },
      { username: "sam", password: "password111" },
      { username: "user1", password: "123456" },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log("Users created:");
    // console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialFilms() {
  console.log("Starting to create films...");
  try {
    const createdFilms = await Promise.all(films.map(createFilm));

    console.log("Films created:");
    // console.log(createdFilms);
    console.log("Finished creating films!");
  } catch (error) {
    console.error("Error creating films!");
    throw error;
  }
}

async function seedGenresTable() {
  console.log("starting to seed genres table...");
  const addFilms = await addFilmIdToGenresTable();

  console.log(`seeded genres table with films: `, films);
  // const checkingFilms = await checkFilms();
  // console.log(checkingFilms);
}

async function addGenresToFilms() {}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialFilms();
    await seedGenresTable();
    await addGenresToFilms();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}
module.exports = {
  rebuildDB,
  dropTables,
  createTables,
  addGenresToFilms,
};
//seedDB();
