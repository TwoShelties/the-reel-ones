const express = require("express");
const { fetchBooks } = require("../db/books");

const bookRouter = express.Router();

bookRouter.get("/", async (req, res, next) => {
  const books = await fetchBooks();
  res.send({ success: true, books });
});

module.exports = bookRouter;
