const express = require("express");
const {
  getAllUserFilms,
  getFilmByUserId,
  addFilmToUserId,
} = require("../db/userFilms");
const userFilmsRouter = express.Router();

// GET /api/userFilmsRouter
userFilmsRouter.get("/", async (req, res) => {
  try {
    const userFilms = await getAllUserFilms();
    res.send(userFilms);
  } catch (error) {
    res.send("Request failed");
  }
});

// GET /api/userFilmsRouter/:userId
userFilmsRouter.get("/:userId", async (req, res) => {
  try {
    if (!req.params.userId) {
      res.send({
        error: "no userId found",
        message: `You must include the userId`,
        name: "needs userId",
      });
    } else {
      let id = req.params.userId;
      const userFilms = await getFilmByUserId(id);

      if (!userFilms) {
        res.send({
          error: "invalid userId",
          message: `userFilms with the given userId do not exist`,
          name: "needs valid userId",
        });
      }
      res.send(userFilms);
    }
  } catch (error) {
    res.send("Request failed");
  }
});

// POST /api/userFilmsRouter/:userId
userFilmsRouter.post("/:userId", async (req, res) => {
  try {
    if (!req.params.userId) {
      res.send({
        error: "no userId found",
        message: `you must include the userId`,
        name: "needs userId",
      });
    } else if (
      !req.body.filmId ||
      !req.body.purchaseDate ||
      !req.body.expiryDate
    ) {
      res.send({
        error: "parameters not found",
        message: `you must include a filmId, purchaseDate, and expiryDate`,
        name: "needs filmId, purchaseDate, and expiryDate",
      });
    } else {
      let id = req.params.userId;
      let film = req.body.filmId;
      let purchased = req.body.purchaseDate;
      let expires = req.body.expiryDate;

      const alreadyExists = await getFilmByUserId(id);

      if ((alreadyExists.filmId = film)) {
        res.send({
          error: "already exists",
          message: `userFilm with the given userId and filmId already exists`,
          name: "user with this film already exists",
        });
      } else {
        const userFilms = await addFilmToUserId({
          id: id,
          filmId: film,
          purchaseDate: purchased,
          expiryDate: expires,
        });

        res.send(userFilms);
      }
    }
  } catch (error) {
    res.send("Request failed");
  }
});

module.exports = userFilmsRouter;
