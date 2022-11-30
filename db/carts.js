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

async function checkForCartItem(userId, filmId) {
  try {
    const {
      rows: [response],
    } = await client.query(
      `
      SELECT * FROM carts
      WHERE "userId"=$1
      AND "filmId"=$2;
      `,
      [userId, filmId]
    );

    // console.log(response);
    if (response !== undefined) {
      return response;
    } else {
      return null;
    }
  } catch (error) {
    console.error("an error occurred while checking for cart item");
    throw error;
  }
}

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

async function editCartItem({ userId, filmId, days }) {
  try {
    if (days < 1 || days > 7) {
      console.error("days range out of acceptable parameters");
      return;
    }

    const response = await client.query(
      `
      UPDATE carts
      SET days=$1
      WHERE "userId"=$2
      AND "filmId"=$3
      RETURNING *;
      `,
      [days, userId, filmId]
    );

    // console.log(response.rows);
    return response.rows[0];
  } catch (error) {
    console.error("error updating cart item");
    throw error;
  }
}

module.exports = {
  getAllCarts,
  getCartByUserId,
  addFilmToUserCart,
  deleteCartItem,
  editCartItem,
  checkForCartItem,
};
