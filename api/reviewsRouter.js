const express = require("express");
const {
  getReviewsByFilmId,
  getReviewsByUserId,
  createReview,
  getReviewByReviewId,
  editReview,
  deleteReview,
  getAllReviews,
} = require("../db/reviews");
const { requireUser, requireAdmin } = require("./utils");
const reviewsRouter = express.Router();

// GET all reviews:
reviewsRouter.get("/", async (req, res, next) => {
  try {
    const reviews = await getAllReviews();

    if (reviews) {
      res.send({ success: true, reviews });
    }
  } catch (error) {
    console.error("error retrieving all reviews");
    next({
      error: "ReviewsRetrievalError",
      message: "An error occurred retrieving all reviews",
    });
  }
});

// GET reviews by filmId param:
reviewsRouter.get("/films/:filmId", async (req, res, next) => {
  try {
    const filmId = req.params.filmId;

    const reviews = await getReviewsByFilmId(filmId);

    if (reviews) {
      res.send({
        success: true,
        reviews,
      });
    }
  } catch (error) {
    console.error("an error occurred retrieving reviews for params.filmId");
    next({ message: "an error occurred while getting film by ID" });
  }
});

// GET reviews by userId param:
reviewsRouter.get("/users/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const reviews = await getReviewsByUserId(userId);

    if (reviews) {
      res.send({
        success: true,
        reviews,
      });
    }
  } catch (error) {
    console.error("an error occurred retrieving reviews for params.filmId");
    next({ message: "an error occurred while getting user's reviews" });
  }
});

// POST review for films/:filmId param:
reviewsRouter.post("/films/:filmId", requireUser, async (req, res, next) => {
  try {
    const filmId = req.params.filmId;
    const userId = req.user.id;

    console.log(
      `User ID: ${userId} is attempting to post a review for film ID: ${filmId}`
    );

    if (!req.body.review) {
      res.status(500);
      next({
        message:
          "Your POST request must include a key called 'review' in the body",
      });
      return;
    }

    const reviewContent = req.body.review;

    const review = await createReview({ filmId, userId, reviewContent });

    if (review) {
      res.send({ success: true, review });
    }
  } catch (error) {
    console.error("an error occurred posting review");
    next({
      error: "CreateReviewError",
      message: "an error occurred while creating review",
    });
  }
});

// GET review by /:reviewId param:
reviewsRouter.get("/:reviewId", async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;

    const review = await getReviewByReviewId(reviewId);

    if (review) {
      res.send({ success: true, review });
    }
  } catch (error) {
    console.error("an error occurred retrieving review by ID");
    next({
      error: "NotAccessibleError",
      message: "an error occurred while retrieving review",
    });
  }
});

// PATCH review for /:reviewId param:
reviewsRouter.patch("/:reviewId", requireUser, async (req, res, next) => {
  try {
    const id = req.params.reviewId;

    if (!req.body.review) {
      res.status(500);
      next({
        error: "MissingPatchParamsError",
        message: "Your call must supply a 'review' key in the body",
      });
      return;
    }

    const reviewContent = req.body.review;

    const review = await editReview({ id, reviewContent });

    if (review) {
      res.send({ success: true, review });
    }
  } catch (error) {
    console.error("an error occurred patching review");
    next({
      error: "PatchReviewError",
      message: "an error occurred while patching review",
    });
  }
});

// DELETE review for users to delete their own reviews:
reviewsRouter.delete("/:reviewId", requireUser, async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    console.log(
      `user ID: ${req.user.id} is attempting to delete review ID: ${reviewId}`
    );

    const reviewToDelete = await getReviewByReviewId(reviewId);
    console.log(reviewToDelete);

    // check to see if user deleting the film has access or if admin:
    if (reviewToDelete[0].userId !== req.user.id && !req.user.isAdmin) {
      res.status(500);
      next({
        error: "NotAuthorizedError",
        message: "You are not authorized to delete this review",
      });
      return;
    }

    const reviewDeleted = await deleteReview(reviewId);
    if (reviewDeleted) {
      res.send({ success: true, reviewDeleted });
    }
  } catch (error) {
    console.error("an error occurred trying to delete review");
    next({
      error: "ReviewDeletionError",
      message: "an error occurred while attempting to delete review",
    });
  }
});

module.exports = reviewsRouter;
