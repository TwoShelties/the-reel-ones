const express = require("express");
const {
  getAllPurchases,
  getAllPurchasesByUserId,
  getCurrentPurchasesByUserId,
  getPastPurchasesByUserId,
  getTimeLeft,
  addCartItemsToPurchase,
} = require("../db/userFilms");
const userFilmsRouter = express.Router();

// GET /api/userFilmsRouter
userFilmsRouter.get("/", async (req, res) => {
  try {
    const purchases = await getAllPurchases();
    res.send(purchases);
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
      const userPurchases = await getAllPurchasesByUserId(id);

      if (!userPurchases) {
        res.send({
          error: "invalid userId",
          message: `purchases with the given userId do not exist`,
          name: "needs valid userId",
        });
      }
      res.send(userPurchases);
    }
  } catch (error) {
    res.send("Request failed");
  }
});

// GET /api/userFilmsRouter/pastPurchases/:userId
userFilmsRouter.get("/pastPurchases/:userId", async (req, res) => {
  try {
    if (!req.params.userId) {
      res.send({
        error: "no userId found",
        message: `You must include the userId`,
        name: "needs userId",
      });
    } else {
      let id = req.params.userId;
      const pastPurchases = await getPastPurchasesByUserId(id);

      if (!pastPurchases) {
        res.send({
          error: "no past purchases for this user",
          message: `past purchases with the given userId do not exist`,
          name: "no past purchases",
        });
      }
      res.send(pastPurchases);
    }
  } catch (error) {
    res.send("Request failed");
  }
});

// GET /api/userFilmsRouter/currentPurchases/:userId
userFilmsRouter.get("/currentPurchases/:userId", async (req, res) => {
  try {
    if (!req.params.userId) {
      res.send({
        error: "no userId found",
        message: `You must include the userId`,
        name: "needs userId",
      });
    } else {
      let id = req.params.userId;
      const currentPurchases = await getCurrentPurchasesByUserId(id);

      if (!currentPurchases) {
        res.send({
          error: "no current purchases for this user",
          message: `current purchases with the given userId do not exist`,
          name: "no current purchases",
        });
      }
      res.send(currentPurchases);
    }
  } catch (error) {
    res.send("Request failed");
  }
});

// GET /api/userFilmsRouter/currentPurchases/:userId
userFilmsRouter.get("/timeLeft/:filmId", async (req, res) => {
  try {
    if (!req.params.filmId) {
      res.send({
        error: "no filmId found",
        message: `You must include the filmId`,
        name: "needs filmId",
      });
    } else {
      let id = 1;
      const timeLeft = await getTimeLeft(id, filmId);

      if (!timeLeft) {
        res.send({
          error: "no purchases for this user with this filmId",
          message: `purchases with the given userId and filmId do not exist`,
          name: "no purchase found",
        });
      }
      res.send(timeLeft);
    }
  } catch (error) {
    res.send("Request failed");
  }
});

/*
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
*/

module.exports = userFilmsRouter;
