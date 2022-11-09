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
} = require("../db/films");

const { requireUser } = require("./utils");

const filmsRouter = express.Router();

filmsRouter.get("/", async (req, res, next) => {
  const films = await fetchFilms();
  res.send({ success: true, films });
});

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
});

filmsRouter.post("/", requireUser, async (req, res, next) => {
  const { title, director, year, genre, img, description, price } = req.body;
  console.log(req.body);
  const filmData = {
    authorId: req.user.id,
    title: title,
    director: director,
    year: year,
    genre: genre,
    img: img,
    description: description,
    price: price,
  };
  try {
    const film = await createFilm(filmData);
    res.send({ filmData });
  } catch ({ title, director, year, genre, img, description, price }) {
    next({ title, director, year, genre, img, description, price });
  }
});

filmsRouter.delete("/delete/:filmId", requireUser, async (req, res, next) => {
  const { filmId } = req.params;
  try {
    const deleteMovie = await deleteFilm(filmId);
    res.send(deleteMovie);
  } catch (error) {
    console.log("error deleting film");
    throw error;
  }
});

filmsRouter.patch("/:filmId", requireUser, async (req, res, next) => {
  const { filmId } = req.params;
  const fields = req.body;
  try {
    const update = await updateFilm({ id: filmId, ...fields });
    res.send(update);
  } catch (error) {
    console.log("error updating film");
    throw error;
  }
});

module.exports = filmsRouter;
