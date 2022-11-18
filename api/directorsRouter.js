const express = require("express");
const { getAllDirectors } = require("../db/directors");

const directorsRouter = express.Router();

directorsRouter.get("/", async (req, res, next) => {
  try {
    const directors = await getAllDirectors();
    res.send({ success: true, directors });
  } catch (error) {
    res.status(404);
    next({ message: `Error fetching all directors` });
    return;
  }
});

module.exports = directorsRouter;
