const express = require("express");
const bookRouter = require("./bookRouter");

const apiRouter = express.Router();

apiRouter.use("/books", bookRouter);

apiRouter.get("/", (req, res, next) => {
  res.send("api router working");
});

module.exports = apiRouter;
