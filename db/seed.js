const client = require(".");

const seedDB = async () => {
  // before we insert a book what do we need to build?
  await client.query(`
    DROP TABLE IF EXISTS films;

    CREATE TABLE films (id SERIAL PRIMARY KEY, title VARCHAR(255) UNIQUE NOT NULL);

    INSERT INTO films (title) VALUES ('Shawshank Redemption');

    `);

  console.log("DB seeded.");
};

seedDB();
