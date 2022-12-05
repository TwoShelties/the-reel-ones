const { response } = require("express");
const client = require("./index");

async function getGuestByUsername(username) {
  try {
    const response = await client.query(
      `
        SELECT * FROM guests
        WHERE username=$1;
        `,
      [username]
    );

    return response.rows;
  } catch (error) {
    console.error("an error occurred while getting guest by username");
  }
}

async function createGuest() {
  try {
    // create the random guest string so it is unique:
    async function generateRandomUsername(length) {
      try {
        let result = "guest_";
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        if (length > characters.length - 1) {
          return;
        }

        for (let i = 0; i < length - 1; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * characters.length)
          );
        }

        // make sure the random username isn't already taken:
        const checkedUser = await getGuestByUsername(result);
        // console.log(checkedUser);

        while (checkedUser.length > 0) {
          console.log(
            "randomly generated username is not unique, refactoring username..."
          );
          for (let i = 0; i < length - 1; i++) {
            result += characters.charAt(
              Math.floor(Math.random() * characters.length)
            );

            const checkedUser = await getGuestByUsername(result);

            if (checkedUser.length === 0) {
              console.log("found unique username :", result);
              break;
            }
          }
        }

        return result;
      } catch (error) {
        console.error(
          "an error occurred while generating a random guest username"
        );
        throw error;
      }
    }

    // assign random username to a variable 'guest':
    const guestUsername = await generateRandomUsername(10);
    // console.log("generated guest username: ", guestUsername);

    // insert the user into the guest table:
    const response = await client.query(
      `
      INSERT INTO users (username, password, "isGuest")
      VALUES ($1, $2, $3)
      RETURNING *; 
        `,
      [guestUsername, guestUsername, true]
    );

    delete response.rows[0].password;

    // console.log("new guest user: ", response.rows);
    return response.rows;
  } catch (error) {
    console.error("an error occurred while making a guest account");
    throw error;
  }
}
createGuest();

module.exports = { createGuest, getGuestByUsername };
