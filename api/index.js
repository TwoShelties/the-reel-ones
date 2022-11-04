const express = require("express");
const filmRouter = require("./filmsRouter");

const apiRouter = express.Router();

apiRouter.use("/fils", filmRouter);

apiRouter.get("/", (req, res, next) => {
  res.send("api router working");
});

module.exports = apiRouter;
