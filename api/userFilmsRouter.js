const express = require("express");
const {
  getAllPurchases,
  getAllPurchasesByUserId,
  getCurrentPurchasesByUserId,
  getPastPurchasesByUserId,
  getTimeLeft,
  addCartItemsToPurchase,
} = require("../db/userFilms");
const { requireUser } = require("./utils");
const userFilmsRouter = express.Router();

// GET /api/userFilms
userFilmsRouter.get("/", async (req, res, next) => {
  const purchases = await getAllPurchases();

  res.send({ success: true, purchases });
});

// GET /api/userFilms/:userId
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

      if (!userPurchases || userPurchases.length === 0) {
        res.send({
          error: "invalid userId",
          message: `purchases with the given userId do not exist`,
          name: "needs valid userId",
        });
      } else {
        res.send({ success: true, userPurchases });
      }
    }
  } catch (error) {
    res.status(404);
    res.send("Request failed");
  }
});

// GET /api/userFilms/pastPurchases/:userId
userFilmsRouter.get("/:userId/pastPurchases", async (req, res) => {
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

      if (!pastPurchases || pastPurchases.length === 0) {
        res.send({
          error: "no past purchases for this user",
          message: `past purchases with the given userId do not exist`,
          name: "no past purchases",
        });
      } else {
        res.send({ success: true, pastPurchases });
      }
    }
  } catch (error) {
    res.status(404);
    res.send("Request failed");
  }
});

// GET /api/userFilms/currentPurchases/:userId
userFilmsRouter.get("/:userId/currentPurchases", async (req, res) => {
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

      if (!currentPurchases || currentPurchases.length === 0) {
        res.send({
          error: "no current purchases for this user",
          message: `current purchases with the given userId do not exist`,
          name: "no current purchases",
        });
      } else {
        res.send({ success: true, currentPurchases });
      }
    }
  } catch (error) {
    res.status(404);
    res.send("Request failed");
  }
});

// GET /api/userFilms/timeLeft/:filmId
userFilmsRouter.get("/:filmId/timeLeft", requireUser, async (req, res) => {
  try {
    if (!req.user) {
      res.status(401);
      res.send({
        error: "error",
        message: "You must be logged in to perform this action",
        name: "name",
      });
    } else if (!req.params.filmId) {
      res.send({
        error: "no filmId found",
        message: `You must include the filmId`,
        name: "needs filmId",
      });
    } else {
      let id = req.user.id;
      //let id = 1;
      let filmId = req.params.filmId;
      const timeLeft = await getTimeLeft(id, filmId);

      if (!timeLeft || timeLeft.length === 0) {
        res.send({
          error: "no purchases for this user with this filmId",
          message: `purchases with the given userId and filmId do not exist`,
          name: "no purchase found",
        });
      } else {
        res.send({ success: true, timeLeft });
      }
    }
  } catch (error) {
    res.status(404);
    res.send("Request failed");
  }
});

// POST /api/userFilms/:userId
userFilmsRouter.post("/:userId", async (req, res, next) => {
  try {
    if (!req.params.userId) {
      res.send({
        error: "no userId found",
        message: `you must include the userId`,
        name: "needs userId",
      });
    } else {
      let id = req.params.userId;

      const purchaseItems = await addCartItemsToPurchase(id);
      if (!purchaseItems || purchaseItems.length === 0) {
        res.send({
          error: "cart does not exist",
          message: `There is no cart associated with the given user id`,
          name: "no cart/cart is empty",
        });
      } else {
        res.send({ success: true, purchaseItems });
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = userFilmsRouter;
