require("dotenv").config();
const { Pool } = require("pg");

const client = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        password: process.env.DB_PASSWORD,
        user: "postgres",
        database: "the-reel-ones",
      }
);

module.exports = client;
