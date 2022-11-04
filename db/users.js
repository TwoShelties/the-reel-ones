const client = require("./index");

async function createUser({ username, password }) {
  try {
    const result = client.query(
      `
       INSERT INTO users (username, password)
       VALUES ($1, $2)
       ON CONFLICT (username) DO NOTHING
       RETURNING *; 
       `,
      [username, password]
    );
    return result.rows[0];
  } catch (error) {
    console.log("error occured while creating user");
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
       SELECT *
       FROM users
       WHERE username=$1, password=$2;
       `,
      [username, password]
    );
    return user;
  } catch (error) {
    console.log("error getting user");
    throw error;
  }
}

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

module.exports = {
  createUser,
  getUser,
  getUserByUsername,
  deleteUser,
};
