const express = require("express");
const { fetchFilms } = require("../db/films");

const filmRouter = express.Router();

filmRouter.get("/", async (req, res, next) => {
  const films = await fetchFilms();
  res.send({ success: true, films });
});

module.exports = filmRouter;
