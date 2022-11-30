const express = require("express");
const { getDirectorByFilmId } = require("../db/directors");
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

const { requireUser, requireAdmin } = require("./utils");

const filmsRouter = express.Router();

// filmsRouter.get("/", async (req, res, next) => {
//   const films = await fetchFilms();
//   res.send({ success: true, films });
// });

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

filmsRouter.get("/:filmId", async (req, res, next) => {
  try {
    const filmId = req.params.filmId;

    if (typeof filmId !== Number) {
      next({ message: `Film ID paramter must be a number` });
      return;
    }

    const films = await getFilmById(filmId);

    if (films.length > 0) {
      res.send({ success: true, films });
    } else {
      next(error);
    }
  } catch (error) {
    console.error("Error retrieving films with id provided");
    res.status(404);
    next({ message: `Error retriving film with ID ${req.params.filmId}` });
    return;
  }
});

// filmsRouter.get("/:title", async (req, res, next) => {
//   try {
//     const title = req.params.title;
//     const films = await getFilmByTitle(title);
//     res.send({ success: true, films });
//   } catch (error) {
//     console.log("Error with getting film by title");
//     next({ message: `Film with title ${req.params.title} does not exist` });
//     return;
//   }
// });

filmsRouter.get("/:filmId/directors", async (req, res, next) => {
  try {
    // let directors = [];
    // let filmId = req.params.filmId;
    // const films = await getFilmById(filmId);
    // const filmsMap = films.map((film) => {
    //   directors.push(film.director);
    // });

    // if (directors.length > 0) {
    //   res.send({ success: true, directors });
    // } else {
    //   next(error);
    // }

    const filmId = req.params.filmId;
    const directors = await getDirectorByFilmId(filmId);
    res.send(directors);
  } catch (error) {
    res.status(404);
    next({
      message: `Film with director ${req.params.director} does not exist`,
    });
    return;
  }
});

filmsRouter.get("/year/:year", async (req, res, next) => {
  try {
    const year = req.params.year;
    const films = await getFilmByYear(year);

    if (films.length > 0) {
      res.send({ success: true, films });
    } else {
      next(error);
    }
  } catch (error) {
    console.log("Error with getting film by year");
    res.status(404);
    next({
      message: `Film with year ${req.params.year} does not exist`,
    });
    return;
  }
});

filmsRouter.get("/genres", async (req, res, next) => {
  try {
    const films = await getAllFilmGenres();
    console.log(films);

    res.send({ success: true, films });
  } catch (error) {
    res.status(404);
    next({
      message: "could not retrieve film genres",
    });
  }
});

filmsRouter.get("/:filmId/genres", async (req, res, next) => {
  try {
    const filmId = req.params.filmId;

    const films = await getGenresByFilmId(filmId);

    if (films.length > 0) {
      const filmTitle = films[0].title;
      const film_id = films[0].filmId;
      const filmGenres = films[0];
      // delete filmGenres.title;
      // delete filmGenres.id;
      // delete filmGenres.filmId;

      let genresList = [];

      const propertyNames = Object.keys(filmGenres);
      // console.log(propertyNames);

      const propertyValues = Object.values(filmGenres);
      // console.log(propertyValues);

      const entries = genresList.push(Object.entries(filmGenres));
      console.log(genresList);

      res.send({
        success: true,
        message: `retrieved genres for film ID: ${filmId}, title: ${filmTitle}`,
        genresList,
      });
    } else {
      next(error);
    }
  } catch (error) {
    res.status(404);
    next({
      message: `Could not retrieve genres for film ID: ${req.params.filmId}`,
    });
  }
});

// filmsRouter.get("genres/:genre", async (req, res, next) => {
//   try {
//     const genre = req.params.genre;
//     const films = await getFilmByGenre(genre);

//     res.send({ films });
//   } catch (error) {
//     console.log("Error with getting film by genre");
//     res.status(404);
//     next({
//       message: `Film with genre ${req.params.genre} does not exist`,
//     });
//     return;
//   }
// });

filmsRouter.post("/", requireAdmin, async (req, res, next) => {
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
    next({ message: "could not create film" });
  }
});

filmsRouter.delete("/delete/:filmId", requireAdmin, async (req, res, next) => {
  const { filmId } = req.params;
  try {
    const deleteMovie = await deleteFilm(filmId);
    res.send(deleteMovie);
  } catch (error) {
    console.log("error deleting film");
    throw error;
  }
});

filmsRouter.patch("/:filmId", requireAdmin, async (req, res, next) => {
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
