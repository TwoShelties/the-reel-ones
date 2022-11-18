const express = require("express");
const {
  fetchFilms,
  getFilmByTitle,
  getFilmByDirector,
  getFilmByGenre,
  getFilmByYear,
  createFilm,
  deleteFilm,
  updateFilm,
  getAllFilmGenres,
  getFilmById,
  getGenresByFilmId,
} = require("../db/films");

const { requireUser } = require("./utils");

const genresRouter = express.Router();

genresRouter.get("/", async (req, res, next) => {
  try {
    const films = await getAllFilmGenres();
    res.send({ success: true, films });
  } catch (error) {
    res.status(404);
    next({ message: `Error fetching film genres` });
    return;
  }
});

genresRouter.get("/:genre", async (req, res, next) => {
  try {
    const genre = req.params.genre;
    genre = `"${genre}"`;

    const films = await getFilmByGenre(genre);
    if (films.length > 0) {
      res.send({ success: true, films });
    }
  } catch (error) {
    res.status(404);
    next({
      message: `Error fetching films with genre: ${req.params.genre}`,
    });
    return;
  }
});

module.exports = genresRouter;
