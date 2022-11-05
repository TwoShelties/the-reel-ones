const express = require("express");
const {
  fetchFilms,
  getFilmByTitle,
  getFilmByDirector,
  getFilmByGenre,
  getFilmByYear,
} = require("../db/films");

const filmsRouter = express.Router();


filmsRouter.get("/", async (req, res, next) => {
  try {
    const films = await fetchFilms();
    res.send({ success: true, films });
  } catch (error) {
    console.log("Error with getting films");
    res.status(404);
    next({ message: `Error fetching all films` });
    return;
  }
});

filmsRouter.get("/:title", async (req, res, next) => {
  try {
    const title = req.params.title;
    const films = await getFilmByTitle(title);
    res.send({ success: true, films });
  } catch (error) {
    console.log("Error with getting film by title");
    next({ message: `Film with title ${req.params.title} does not exist` });
    return;
  }
});

filmsRouter.get("/:director", async (req, res, next) => {
  try {
    const director = req.params.director;
    const films = await getFilmByDirector(director);
    res.send({ success: true, films });
  } catch (error) {
    console.log("Error with getting film by director");
    res.status(404);
    next({
      message: `Film with director ${req.params.director} does not exist`,
    });
    return;
  }
});

filmsRouter.get("/:year", async (req, res, next) => {
  try {
    const year = req.params.year;
    const films = await getFilmByYear(year);
    res.send({ success: true, films });
  } catch (error) {
    console.log("Error with getting film by year");
    res.status(404);
    next({
      message: `Film with year ${req.params.year} does not exist`,
    });
    return;
  }
});

filmsRouter.get("/:genre", async (req, res, next) => {
  try {
    const genre = req.params.genre;
    const films = await getFilmByGenre(genre);
    res.send({ success: true, films });
  } catch (error) {
    console.log("Error with getting film by genre");
    res.status(404);
    next({
      message: `Film with genre ${req.params.genre} does not exist`,
    });
    return;
  }

filmsRouter.get("/", async (req, res, next) => {
  const films = await fetchFilms();
  res.send({ success: true, films });

});

module.exports = filmsRouter;
