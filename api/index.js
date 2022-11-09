const express = require("express");

const apiRouter = express.Router();

const filmsRouter = require("./filmsRouter");
apiRouter.use("/films", filmsRouter);

const usersRouter = require("./usersRouter");
apiRouter.use("/users", usersRouter);

const userFilmsRouter = require("./userFilmsRouter");
apiRouter.use("/usersFilms", userFilmsRouter);

apiRouter.get("/", (req, res, next) => {
  res.send("api router working");
});

module.exports = apiRouter;
