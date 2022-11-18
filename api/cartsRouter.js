const express = require("express");
const {
  getAllCarts,
  getCartByUserId,
  addFilmToUserCart,
  deleteCartItem,
} = require("../db/carts");

const { requireUser } = require("./utils");

const cartsRouter = express.Router();

// GET /api/cart
// Tested, works
cartsRouter.get("/", async (req, res, next) => {
  try {
    const carts = await getAllCarts();
    res.send({ success: true, carts });
  } catch (error) {
    console.log("Error with getting carts");
    res.status(404);
    next({ message: `Error fetching all carts` });
    return;
  }
});

// GET /api/cart/:userId
// Tested, works
cartsRouter.get("/:userId", async (req, res, next) => {
  try {
    if (!req.params.userId) {
      res.send({
        error: "no userId found",
        message: `You must include the userId`,
        name: "needs userId",
      });
    } else {
      const id = req.params.userId;
      const cart = await getCartByUserId(id);

      if (cart.length === 0) {
        res.status(404);
        res.send({
          error: "invalid userId",
          message: `cart with the given userId does not exist`,
          name: "needs valid userId",
        });
      } else {
        res.send({ success: true, cart });
      }
    }
  } catch (error) {
    console.log("Error with getting cart by userId");
    next({ message: `Cart with userId ${req.params.userId} does not exist` });
    return;
  }
});

// POST /api/cart
// Tested, works
cartsRouter.post("/", requireUser, async (req, res, next) => {
  const { userId, filmId } = req.body;
  console.log(req.body);

  try {
    const cart = await addFilmToUserCart({ userId, filmId });
    res.send({ success: true, cart });
  } catch ({ userId, filmId }) {
    next({ userId, filmId });
  }
});

// DELETE /api/cart
// Not working
cartsRouter.delete("/", async (req, res, next) => {
  try {
    const { userId, filmId } = req.body;
    const deletedItem = await deleteCartItem(userId, filmId);
    res.send({ success: true, deletedItem });
  } catch (error) {
    console.log("error deleting item from cart");
    throw error;
  }
});

module.exports = cartsRouter;
