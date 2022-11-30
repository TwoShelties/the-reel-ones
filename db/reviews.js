const { response } = require("express");
const client = require("./index");

async function getAllReviews() {
  try {
    const response = await client.query(
      `
        SELECT * FROM reviews;
        `
    );

    return response.rows;
  } catch (error) {
    console.error("error getting all reviews");
    throw error;
  }
}

async function createReview({ filmId, userId, reviewContent }) {
  //   console.log(filmId, userId);
  try {
    console.log(
      `creating a review for film ID: ${filmId} | user ID: ${userId} | with review content: ${reviewContent}`
    );

    if (!filmId || !userId || !reviewContent) {
      return;
    }

    const response = await client.query(
      `
        INSERT INTO reviews ("filmId", "userId", review)
        VALUES ($1, $2, $3)
        RETURNING *; 
        `,
      [filmId, userId, reviewContent]
    );

    // console.log(response.rows);
    return response.rows;
  } catch (error) {
    console.error("an error occurred creating a review");
    throw error;
  }
}
// createReview({ filmId: 1, userId: 5, reviewContent: "a reeeeeeview 123abc" });

async function getReviewsByFilmId(filmId) {
  try {
    if (!filmId) {
      return;
    }

    console.log("attempting to get reviews for film ", filmId);

    const response = await client.query(
      `
        SELECT * FROM reviews
        WHERE "filmId"=$1;
        `,
      [filmId]
    );

    // console.log(response.rows);
    return response.rows;
  } catch (error) {
    console.error("could not get reviews");
    throw error;
  }
}
// getReviewsByFilmId(1000);

async function getReviewsByUserId(userId) {
  try {
    if (!userId) {
      return;
    }

    console.log("attempting to get reviews by user ID: ", userId);

    const response = await client.query(
      `
            SELECT * FROM reviews
            WHERE "userId"=$1;
            `,
      [userId]
    );

    console.log(response.rows);
    return response.rows;
  } catch (error) {
    console.error("error getting reviews by UserId");
    throw error;
  }
}
// getReviewsByUserId(3);

async function getReviewByReviewId(id) {
  try {
    if (!id) {
      return;
    }

    const response = await client.query(
      `
            SELECT * FROM reviews
            WHERE id=$1;
            `,
      [id]
    );

    return response.rows;
  } catch (error) {
    console.error("an error occurred retrieving review by ID");
    throw error;
  }
}

async function deleteReview(id) {
  try {
    if (!id) {
      return;
    }

    console.log("attempting to delete review ID: ", id);

    const response = await client.query(
      `
        DELETE FROM reviews
        WHERE id=$1
        RETURNING *;
        `,
      [id]
    );

    console.log("DELETED: ", response.rows);
    return response.rows;
  } catch (error) {
    console.error("error occurred while attempting to delete review");
    throw error;
  }
}
// deleteReview(5);

async function editReview({ id, reviewContent }) {
  try {
    if (!id || !reviewContent) {
      return;
    }

    console.log(
      `attempting to edit review ID: ${id} with new review content ${reviewContent}`
    );

    await client.query(
      `
       UPDATE reviews
       SET review = $1
       WHERE id=$2;     
      `,
      [reviewContent, id]
    );

    const {
      rows: [response],
    } = await client.query(
      `
        SELECT * FROM reviews
        WHERE id=$1;
        `,
      [id]
    );

    console.log("edited review: ", response);
    return response;
  } catch (error) {
    console.error("an error occurred while attempting to edit review");
    throw error;
  }
}
// editReview({
//   id: 2,
//   reviewContent: "I changed my mind, I don't love film 2 :(",
// });

module.exports = {
  createReview,
  getReviewsByFilmId,
  getReviewsByUserId,
  deleteReview,
  editReview,
  getReviewByReviewId,
  getAllReviews,
};
