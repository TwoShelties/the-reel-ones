const express = require("express");
const usersRouter = express.Router();
const {
  getUser,
  getUserByUsername,
  getAllUsers,
  deleteUser,
  createUser,
  adminCheck,
  updateUser,
  giveAdminStatus,
} = require("../db/users");
const jwt = require("jsonwebtoken");
const { requireUser, requireAdmin } = require("./utils");
const { JWT_SECRET } = process.env;

usersRouter.get("/", async (req, res, next) => {
  const users = await getAllUsers();
  console.log(users);

  res.send({ success: true, users });
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body);

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
    next({ message: "an error occurred while logging in" });
  }
});

usersRouter.post("/register", async (req, res, next) => {
  // const usernameCheck = await getUserByUsername(req.body.username);
  // if (req.body.username === usernameCheck) {
  //   res.status(500);
  //   next({
  //     error: "UnavailableUsernameError",
  //     message: "This username is already taken",
  //   });
  //   return;
  // }
  if (!req.body.username || !req.body.password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
    return;
  }

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
          username: username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1 week",
        }
      );
      if (user) {
        res.send({ message: "User is created", token, user });
      }
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.get("/me", requireUser, async (req, res) => {
  // console.log(req.user);
  if (!req.user) {
    res.status(401);
    res.send({
      error: "error",
      message: "You must be logged in to perform this action",
      name: "name",
    });
  }
  //const result = await getUserByUsername(req.user.username);
  res.send(req.user);
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

usersRouter.get("/:userId/checkAdmin", async (req, res, next) => {
  try {
    console.log("calling adminCheck");
    const userId = req.params.userId;
    console.log(userId);
    const response = await adminCheck(userId);
    console.log(response[0].isAdmin);

    if (response.length > 0 && response[0].isAdmin) {
      res.send({ isAdmin: true });
    }
  } catch (error) {
    res.status(500).next({ message: "user is not an admin" });
    return;
  }
});

usersRouter.delete("/:userId", requireAdmin, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const deleteSingleUser = await deleteUser(userId);
    res.send(deleteSingleUser);
  } catch (error) {
    console.log("error deleting user");
    throw error;
  }
});

usersRouter.patch("/:userId", requireUser, async (req, res, next) => {
  const { userId } = req.params;
  const username = req.body.username;
  // console.log(userId, username);

  try {
    const update = await updateUser({ id: userId, username });
    console.log(update);
    res.send({ success: true, update });
  } catch (error) {
    console.log("error updating user");
    next({ message: "an error occurred while updating user" });
  }
});

usersRouter.patch(
  "/:userId/giveAdminStatus",
  requireAdmin,
  async (req, res, next) => {
    console.log(req.user);
    try {
      const userId = Number(req.params.userId);
      const response = await giveAdminStatus(userId);
      // console.log(response);
      res.send({ success: true, response });
    } catch (error) {
      next({ message: "error updating admin status of user" });
    }
  }
);

module.exports = usersRouter;
