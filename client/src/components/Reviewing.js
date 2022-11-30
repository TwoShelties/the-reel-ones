import React from "react";
import { useParams } from "react-router-dom";

const Reviewing = ({
  reviews,
  setReviews,
  focusFilm,
  reviewing,
  setReviewing,
  setNewReviewContent,
  token,
  newReviewContent,
}) => {
  const params = useParams();
  const submitNewReview = async (filmId) => {
    if (!newReviewContent || !token) {
      return;
    }

    console.log(
      "user is attempting to create a new review for film: " + filmId
    );

    const response = await fetch(`/api/reviews/films/${filmId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        review: newReviewContent,
      }),
    });
    const data = await response.json();
    if (data.success) {
      alert("Your review has been created!");
      fetchReviews();
      setReviewing(!reviewing);
      return;
    }
  };

  const fetchReviews = async () => {
    const response = await fetch(`/api/reviews/films/${params.filmId}`);
    const data = await response.json();
    // console.log(data);
    if (data) {
      setReviews(data.reviews);
    }
  };

  return (
    <div>
      <form>
        <textarea
          className="review-edit-textarea"
          placeholder={"Your review here..."}
          onChange={(event) => {
            event.preventDefault();
            setNewReviewContent(event.target.value);
          }}
        />
        <button
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            submitNewReview(focusFilm.id);
          }}
        >
          Submit
        </button>
        <button
          onClick={(event) => {
            event.preventDefault();
            setReviewing(!reviewing);
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Reviewing;
