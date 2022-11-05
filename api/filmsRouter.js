const express = require("express");
const { fetchFilms } = require("../db/films");

const filmsRouter = express.Router();

filmsRouter.get("/", async (req, res, next) => {
  const films = await fetchFilms();
  res.send({ success: true, films });
});

module.exports = filmsRouter;
