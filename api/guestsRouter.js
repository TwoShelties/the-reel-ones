const express = require("express");

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const { createGuest, getGuestByUsername } = require("../db/guests");
const { getUserByUsername } = require("../db/users");

const guestsRouter = express.Router();

// post route to guest
guestsRouter.post("/", async (req, res, next) => {
  try {
    const guest = await createGuest();
    // console.log(guest);

    const user = await getUserByUsername(guest[0].username);
    console.log("guest user: ", user);

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1 week",
      }
    );

    if (user && token) {
      res.send({
        success: true,
        user,
        token,
        message: "A guest account has been created and you're logged in!",
      });
    }
  } catch (error) {
    console.error("an error occurred while posting new guest");
    next({ message: "an error occurred while creating a guest account" });
  }
});

module.exports = guestsRouter;
