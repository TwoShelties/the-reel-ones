const client = require("./index");
const bcrypt = require("bcrypt");

async function createUser({ username, password }) {
  try {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    const {
      rows: [user],
    } = await client.query(
      `
       INSERT INTO users (username, password)
       VALUES ($1, $2)
       ON CONFLICT (username) DO NOTHING
       RETURNING *; 
       `,
      [username, hashedPassword]
    );

    return user;
  } catch (error) {
    console.log("error occured while creating user");
    throw error;
  }
}

// TEST FOR createUser:
/*
async function testCreateUser() {
  console.log("testing createUser...");
  let userObj = { username: "zakTest", password: "zakzakzak" };
  const newUser = await createUser(userObj);
  console.log(newUser);
}
testCreateUser();
*/

async function getAllUsers() {
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM users;
      `
    );

    return rows;
  } catch (error) {
    console.error("an error occurred during getAllUsers()");
    throw error;
  }
}

// TEST FOR getAllUsers:
/*
async function getUsers() {
  const allUsers = await getAllUsers();
  console.log(allUsers);
}
getUsers();
*/

async function getUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(password, hashedPassword);

    if (user && isValid) {
      return user;
    }
  } catch (error) {
    console.log("error getting user");
    throw error;
  }
}

// TEST FOR getUser:
/*
async function testGetUser() {
  console.log("testing getUser...");
  const userObj = { username: "adam", password: "secretpass99" };
  const response = await getUser(userObj);
  console.log("retrieved user:", response);
}
testGetUser();
*/

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT *
        FROM users
        WHERE username=$1;
        `,
      [username]
    );
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.log("invalid username");
    throw error;
  }
}

// TEST FOR getUserByUsername
// async function testGetUserByUsername() {
//   const testUsername = "zak";
//   const response = await getUserByUsername("zak");
//   console.log(response);
// }
// testGetUserByUsername();

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT id, username
      FROM users
      WHERE id=$1;
    `,
      [userId]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

/*
async function testGetUserById() {
  const testId = 1;
  const response = await getUserById(testId);
  console.log(response);
}
testGetUserById();
*/

async function deleteUser(username) {
  try {
    const result = await client.query(
      `
        DELETE 
        FROM users 
        WHERE username=$1
        RETURNING *;
        `,
      [username]
    );
    return result.rows[0];
  } catch (error) {
    console.log("error deleting user");
    throw error;
  }
}

// TEST FOR deleteUser:
// async function testDeleteUser() {
//   const user = "zak2";
//   const response = await deleteUser(user);
//   console.log(response);
// }
// testDeleteUser();

module.exports = {
  createUser,
  getUser,
  getUserByUsername,
  deleteUser,
  getAllUsers,
  getUserById,
};
