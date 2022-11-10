// GET /api/books
require("dotenv").config();
const express = require("express");
const apiRouter = require("./api");
const app = express();

const morgan = require("morgan");
const cors = require("cors");

// Setup your Middleware and API Router here
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

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
