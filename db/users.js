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
       INSERT INTO users (username, password, "isAdmin")
       VALUES ($1, $2, $3)
       ON CONFLICT (username) DO NOTHING
       RETURNING *; 
       `,
      [username, hashedPassword, false]
    );

    return user;
  } catch (error) {
    console.log("error occured while creating user");
    throw error;
  }
}

async function createInitialAdmins() {
  try {
    console.log("calling createInitialAdmins...");
    const users = await client.query(
      `
      UPDATE users
      SET "isAdmin"=true
      RETURNING *;
      `
    );

    console.log(users.rows);
    return users.rows;
  } catch (error) {
    console.error("error creating initial admins");
    throw error;
  }
}

async function createDummies({ username, password }) {
  try {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    const {
      rows: [user],
    } = await client.query(
      `
       INSERT INTO users (username, password, "isAdmin")
       VALUES ($1, $2, $3)
       ON CONFLICT (username) DO NOTHING
       RETURNING *; 
       `,
      [username, hashedPassword, false]
    );

    return user;
  } catch (error) {
    console.log("error occured while creating user");
    throw error;
  }
}

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
    console.log(username);
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

async function updateUser({ id, username }) {
  try {
    const response = await client.query(
      `
    UPDATE users 
    SET username=$1
    WHERE id=$2
    RETURNING *;
    `,
      [username, id]
    );
    return response.rows;
  } catch (error) {
    console.log("Error updating user");
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

async function adminCheck(userId) {
  try {
    console.log("calling adminCheck");
    const response = await client.query(
      `
      SELECT * FROM users
      WHERE id=$1
      AND "isAdmin"=true;
      `,
      [userId]
    );

    // console.log("result from adminCheck", response.rows);
    return response.rows;
  } catch (error) {
    console.error("Error with checking admin");
    throw error;
  }
}

async function giveAdminStatus(userId) {
  try {
    console.log("calling giveAdminStatus");
    const user = await client.query(
      `
      SELECT * FROM users
      WHERE id=$1
      `,
      [userId]
    );
    console.log(
      "attempting to give admin status to user ID: ",
      user.rows[0].id
    );

    if (user.rows[0].id) {
      const response = await client.query(
        `
        UPDATE users
        SET "isAdmin"=true
        WHERE id=$1
        RETURNING *;
        `,
        [userId]
      );

      delete response.rows[0].password;
      console.log("gave admin status to user ID: ", userId);
      return response.rows[0];
    }
  } catch (error) {
    console.error("an error occurred giving admin status to a user");
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getUserByUsername,
  deleteUser,
  getAllUsers,
  getUserById,
  adminCheck,
  updateUser,
  giveAdminStatus,
  createInitialAdmins,
  createDummies,
};
