const client = require("./index");

async function createUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
       INSERT INTO users (username, password)
       VALUES ($1, $2)
       ON CONFLICT (username) DO NOTHING
       RETURNING *; 
       `,
      [username, password]
    );

    return user;
  } catch (error) {
    console.log("error occured while creating user");
    throw error;
  }
}

// TEST FOR createUser:
// async function testCreateUser() {
//   console.log("testing createUser...");
//   let userObj = { username: "zak2", password: "zakzakzak" };
//   const newUser = await createUser(userObj);
//   console.log(newUser);
// }
// testCreateUser();

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
// getAllUsers();

async function getUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
       SELECT *
       FROM users
       WHERE username=$1 AND password=$2;
       `,
      [username, password]
    );
    return user;
  } catch (error) {
    console.log("error getting user");
    throw error;
  }
}

// TEST FOR getUser:
// async function testGetUser() {
//   console.log("testing getUser...");
//   const userObj = { username: "adam", password: "secretpass99" };
//   const response = await getUser(userObj);
//   console.log("retrieved user:", response);
// }
// testGetUser();

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
};
