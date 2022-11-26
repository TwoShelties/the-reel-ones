const { response } = require("express");
const client = require("./index");

async function getAllCarts() {
  try {
    const carts = await client.query(
      `
          SELECT * FROM carts;
      `
    );
    return carts.rows;
  } catch (error) {
    console.log("Error with getting carts");
    throw error;
  }
}

//TEST FOR getAllCarts: Works
/*
async function getCarts() {
  const allCarts = await getAllCarts();
  console.log(allCarts);
}
getCarts();
*/

async function getCartByUserId(userId) {
  try {
    const response = await client.query(
      `
            SELECT * 
            FROM carts
            WHERE "userId" = $1;
            `,
      [userId]
    );
    return response.rows;
  } catch (error) {
    console.log("Error with getting cart by userId");
    throw error;
  }
}

//TEST FOR getCartByUserId: Works
/*
async function testGetCartByUserId() {
  console.log("testing getCartByUserId...");
  const response = await getCartByUserId(1);
  console.log("retrieved cart:", response);
}
testGetCartByUserId();
*/

async function addFilmToUserCart({ userId, filmId, days }) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
        INSERT INTO carts ("userId", "filmId", days)
        VALUES ($1, $2, $3) 
        RETURNING *;
        `,
      [userId, filmId, days]
    );
    return cart;
  } catch (error) {
    console.log("Error with adding film to user cart");
    throw error;
  }
}

async function deleteCartItem(userId, filmId) {
  try {
    // added var name to reference which item is deleted:
    const response = await client.query(
      `
          DELETE 
          FROM carts 
          WHERE "userId" = $1 
          AND
          "filmId" = $2
          RETURNING *;
          `,
      [userId, filmId]
    );

    // returning deleted item, will make call to GET updated cart within
    // cartsRouter route:
    return response.rows;

    const updatedCart = await getCartByUserId(userId);

    return updatedCart;
  } catch (error) {
    console.log("error deleting cart item");
    throw error;
  }
}

// TEST FOR deleteCartItem: Works
/*
async function testDeleteCartItem() {
  const response = await deleteCartItem(1, 1);
  console.log(response);
}
testDeleteCartItem();
*/

module.exports = {
  getAllCarts,
  getCartByUserId,
  addFilmToUserCart,
  deleteCartItem,
};
