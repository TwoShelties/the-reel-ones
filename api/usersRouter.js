const express = require("express");

const {
  getUser,
  getUserByUsername,
  getAllUsers,
  deleteUser,
} = require("../db/users");
const { requireUser } = require("./utils");

const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

usersRouter.get("/", async (req, res, next) => {
  const users = await getAllUsers();

  res.send({ success: true, users });
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  // request must have both
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUser({ username, password });

    if (user) {
      const token = jwt.sign(user, JWT_SECRET);
      res.send({
        user: {
          id: user.id,
          username: `${username}`,
        },
        token: token,
        message: "you're logged in!",
      });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log("Error with logging in");
    throw error;
  }
});

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (password.length < 8) {
      res.status(500).send({
        error: "an error has occured password too short",
        message: "Password Too Short!",
        name: "Passworderror",
      });
    }
    const checkUsers = await getUserByUsername(username);
    if (checkUsers) {
      res.status(500).send({
        error: "error has occured",
        message: `User ${username} is already taken.`,
        name: "username already exists",
      });
    } else {
      const user = await createUser({ username, password });
      const token = jwt.sign(
        {
          id: user.id,
          username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1 week",
        }
      );
      if (user) {
        res.send({ message: "User is created", token: token, user: user });
      }
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.get("/me", requireUser, async (req, res) => {
  // console.log(req.user);
  const result = await getUserByUsername(req.user.username);
  res.send(result);
});

/*
usersRouter.get("/", async (req, res, next) => {
  try {
    const allUsers = await getAllUsers();
    console.log(allUsers);
    res.send(allUsers);
  } catch (error) {
    console.log("error geting all users");
    throw error;
  }
});
*/

usersRouter.delete("/userId", requireUser, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const deleteSingleUser = await deleteUser(userId);
    res.send(deleteSingleUser);
  } catch (error) {
    console.log("error deleting user");
    throw error;
  }
});

module.exports = usersRouter;
