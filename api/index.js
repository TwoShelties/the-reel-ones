const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getUserById } = require("../db/users");
const { JWT_SECRET } = process.env;

// set `req.user` if possible
apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        // console.log(req.user);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    // console.log("User is set:", req.user);
  }

  next();
});

// ROUTER: /api/films
const filmsRouter = require("./filmsRouter");
apiRouter.use("/films", filmsRouter);

// ROUTER: /api/genres
const genresRouter = require("./genresRouter");
apiRouter.use("/genres", genresRouter);

// ROUTER: /api/directors
const directorsRouter = require("./directorsRouter");
apiRouter.use("/directors", directorsRouter);

// ROUTER: /api/users
const usersRouter = require("./usersRouter");
apiRouter.use("/users", usersRouter);

// ROUTER: /api/cart
const cartsRouter = require("./cartsRouter");
apiRouter.use("/cart", cartsRouter);

// ROUTER: /api/usersFilms
const userFilmsRouter = require("./userFilmsRouter");
apiRouter.use("/usersFilms", userFilmsRouter);

// ROUTER: /api/reviews
const reviewsRouter = require("./reviewsRouter");
apiRouter.use("/reviews", reviewsRouter);

apiRouter.get("/", (req, res, next) => {
  res.send("api router working");
});

module.exports = apiRouter;
