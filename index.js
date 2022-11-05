// GET /api/books

const express = require("express");
const apiRouter = require("./api");

const app = express();

app.use("/api", apiRouter);

const PORT = process.env.PORT || 4000;

app.use(function (error, req, res, next) {
  res.send({
    error: "An error occurred",
    message: error.message,
    name: "Notauthorizederror",
  });
});

app.listen(PORT, () => {
  console.log("Server is up on ", PORT);
});
