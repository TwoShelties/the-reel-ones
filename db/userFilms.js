const client = require(".");
const { getCartByUserId, deleteCartItem } = require("./carts");

async function getAllPurchases() {
  try {
    const result = await client.query(
      `
            SELECT * FROM user_films;
      `
    );
    return result.rows;
  } catch (error) {
    console.log("Error with getting user films");
    throw error;
  }
}

// TEST FOR getAllPurchases: works
/*
async function testGetAllPurchases() {
  const allPurchases = await getAllPurchases();
  console.log(allPurchases);
}
testGetAllPurchases();
*/

async function getAllPurchasesByUserId(userId) {
  try {
    const response = await client.query(
      `
            SELECT *
            FROM user_films 
            WHERE "userId" = $1;
            `,
      [userId]
    );
    return response.rows;
  } catch (error) {
    console.log("Error with getting film by userId");
    throw error;
  }
}

//TEST FOR getAllPurchasesByUserId: Tested, Works
/*
async function testGetAllPurchasesByUserId() {
  console.log("testing getAllPurchasesByUserId...");
  const response = await getAllPurchasesByUserId(1);
  console.log("retrieved purchase:", response);
}
testGetAllPurchasesByUserId();
*/

async function getPastPurchasesByUserId(userId) {
  try {
    const userPurchases = await getAllPurchasesByUserId(userId);

    const pastPurchases = await Promise.all(
      userPurchases.map(async (purchase) => {
        const filmid = purchase.filmId;
        const time = await getTimeLeft(userId, filmid);
        //console.log(time);

        if (time.days && time.days < 0) {
          //console.log(purchase);
          return purchase;
        } else {
          //console.log("h", purchase);
          return null;
        }
      })
    );

    // filters out null values
    const pastPurchaseArr = pastPurchases.filter(Boolean);

    //console.log(pastPurchaseArr);

    return pastPurchaseArr;
  } catch (error) {
    console.log("Error with getting film by userId");
    throw error;
  }
}

//TEST FOR getPastPurchasesByUserId: Works
/*
async function testGetPastPurchasesByUserId() {
  console.log("testing getPastPurchasesByUserId...");
  const response = await getPastPurchasesByUserId(7);
  console.log("retrieved purchase:", response);
}
testGetPastPurchasesByUserId();
*/

async function getCurrentPurchasesByUserId(userId) {
  try {
    const userPurchases = await getAllPurchasesByUserId(userId);

    const currentPurchases = await Promise.all(
      userPurchases.map(async (purchase) => {
        const filmid = purchase.filmId;
        const time = await getTimeLeft(userId, filmid);

        if (time.days && time.days > 0) {
          //console.log(purchase);
          return purchase;
        } else {
          //console.log("h", purchase);
          return null;
        }
      })
    );
    // filters out null values
    const currentPurchaseArr = currentPurchases.filter(Boolean);

    //console.log(currentPurchaseArr);

    return currentPurchaseArr;
  } catch (error) {
    console.log("Error with getting film by userId");
    throw error;
  }
}

//TEST FOR getCurrentPurchasesByUserId: Works
/*
async function testGetCurrentPurchasesByUserId() {
  console.log("testing getCurrentPurchasesByUserId...");
  const response = await getCurrentPurchasesByUserId(7);
  console.log("retrieved purchase:", response);
}
testGetCurrentPurchasesByUserId();
*/

async function setExpiryDate(days) {
  try {
    const {
      rows: [day],
    } = await client.query(
      `
        SELECT CURRENT_DATE + INTERVAL '1 day' * $1;
        `,
      [days]
    );

    return day["?column?"];
  } catch (error) {
    console.log("Error with adding date");
    throw error;
  }
}

// Tested, works
/*
async function testSetExpiryDate() {
  const response = await setExpiryDate(5);
  console.log(response);
}
testSetExpiryDate();
*/

async function getTimeLeft(userId, filmId) {
  try {
    const {
      rows: [time],
    } = await client.query(
      `
        SELECT AGE(expiryDate, CURRENT_DATE) AS duration
        FROM user_films
        WHERE "userId" = $1 AND "filmId" = $2;
        `,
      [userId, filmId]
    );

    return time.duration;
  } catch (error) {
    console.log("Error with getting time left");
    throw error;
  }
}

// Tested, works
/*
async function testGetTimeLeft() {
  const response = await getTimeLeft(1, 1);
  console.log(response);
}
testGetTimeLeft();
*/

async function createTableEntry(userId, filmId, expiryDate) {
  try {
    const {
      rows: [purchase],
    } = await client.query(
      `
        INSERT INTO user_films ("userId", "filmId", expiryDate)
        VALUES ($1, $2, $3) 
        RETURNING *;
        `,
      [userId, filmId, expiryDate]
    );
    return purchase;
  } catch (error) {
    console.log("Error with adding film to table");
    throw error;
  }
}

async function addCartItemsToPurchase(userId) {
  try {
    const userCart = await getCartByUserId(userId);
    //console.log(userCart);

    let purchases = [];

    for (item of userCart) {
      let daysRented = item.days;
      let userid = item.userId;
      let filmid = item.filmId;

      let expiresOn = await setExpiryDate(daysRented);

      let newPurchase = await createTableEntry(userid, filmid, expiresOn);
      purchases.push(newPurchase);

      // delete cart now...works
      //let deleteItem = await deleteCartItem(userId, filmid);
      //let updatedCart = await getCartByUserId(userId);
      //console.log(updatedCart, "here");
    }
    return purchases;
  } catch (error) {
    console.log("Error with adding film to user cart");
    throw error;
  }
}

// Tested, works
// Test for addCartItemsToPurchase
/*
async function testAddCartItemsToPurchase() {
  const response = await addCartItemsToPurchase(5);
  console.log(response);
}
testAddCartItemsToPurchase();
*/

module.exports = {
  getAllPurchases,
  getAllPurchasesByUserId,
  getCurrentPurchasesByUserId,
  getPastPurchasesByUserId,
  setExpiryDate,
  getTimeLeft,
  createTableEntry,
  addCartItemsToPurchase,
};
