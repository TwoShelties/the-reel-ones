const express = require("express");
const {
  getAllCarts,
  getCartByUserId,
  addFilmToUserCart,
  deleteCartItem,
  editCartItem,
  checkForCartItem,
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
  const { userId, filmId, days } = req.body;
  console.log(req.body);

  try {
    const checkedItem = await checkForCartItem(userId, filmId);
    // console.log("checkedItem: ", checkedItem);
    if (checkedItem !== null) {
      next({
        message: `user ID: ${userId} already has film ID: ${filmId} in their cart`,
      });
      return;
    }

    const cart = await addFilmToUserCart({ userId, filmId, days });
    res.send({ success: true, cart });
    return;
  } catch ({ userId, filmId }) {
    next({ userId, filmId });
  }
});

// DELETE /api/cart
// Tested, works
cartsRouter.delete("/", requireUser, async (req, res, next) => {
  try {
    const { userId, filmId } = req.body;
    const deletedItem = await deleteCartItem(userId, filmId);
    // console.log(deletedItem);

    const updatedCart = await getCartByUserId(userId);
    console.log(updatedCart);
    res.send({ success: true, deletedItem, updatedCart });
  } catch (error) {
    console.log("error deleting item from cart");
    next({ message: "an error occurred while deleting cart item" });
  }
});

// PATCH /api/cart/:userId/:cartItemId
cartsRouter.patch("/:userId/:filmId", requireUser, async (req, res, next) => {
  try {
    const { userId, filmId } = req.params;
    const days = req.body.days;
    const editedCartItem = await editCartItem({ userId, filmId, days });
    console.log(editCartItem);

    res.send({ success: true, editedCartItem });
  } catch (error) {
    console.error("an error occurred while patching cart item");
    next({ message: "an error occurred while patching cart item" });
  }
});

module.exports = cartsRouter;
