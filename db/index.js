require("dotenv").config();
const { Pool } = require("pg");

const client = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString:
          process.env.DATABASE_URL ||
          "postgres://the_reel_ones_db_user:E9WbFtmIAF8XFGL3V4HK1Pj7k0XW1Nz0@dpg-ce76sasgqg4eemp7a1qg-a.ohio-postgres.render.com/the_reel_ones_db",
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        // password: process.env.DB_PASSWORD,
        user: "postgres",
        password: "postgres",
        database: "the-reel-ones",
      }
);

module.exports = client;
