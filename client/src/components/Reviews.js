import React, { useEffect, useState } from "react";

const Reviews = ({ review, userData, token, focusFilm, setReviews }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  const fetchAllUsers = async () => {
    const response = await fetch(`/api/users`);
    const data = await response.json();
    // console.log(data);

    if (data.users) {
      setAllUsers(data.users);
    }
  };

  const submitEdit = async (reviewId) => {
    if (!editedContent || !token) {
      return;
    }

    // console.log(
    //   "user attempting to update review with new review content:" +
    //     editedContent
    // );

    const response = await fetch(`/api/reviews/${reviewId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        review: editedContent,
      }),
    });
    const data = await response.json();
    // console.log(data);
    if (data.success) {
      fetchReviews().then(alert("Your review has been updated!"));
      setEditing(!editing);
      return;
    }
  };

  const deleteReview = async (reviewId) => {
    if (!token) {
      return;
    }

    const response = await fetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      fetchReviews().then(alert("Your review has been deleted"));
      setEditing(!editing);
      return;
    }
  };

  const fetchReviews = async () => {
    const response = await fetch(`/api/reviews/films/${focusFilm.id}`);
    const data = await response.json();
    // console.log("fetchReviews data:", data);
    if (data) {
      setReviews(data.reviews);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      <p>"{review.review}"</p>
      {allUsers ? (
        <div>
          {allUsers.map((user) => {
            // console.log(user);
            if (user.id === review.userId) {
              // console.log(user.username);
              return <p>- {user.username}</p>;
            }
          })}
        </div>
      ) : (
        <></>
      )}

      {userData.id === review.userId && !editing ? (
        <div>
          <button
            onClick={(event) => {
              event.preventDefault();
              setEditing(!editing);
            }}
          >
            Edit/Delete
          </button>
        </div>
      ) : (
        <></>
      )}

      {editing ? (
        <div>
          <form>
            <textarea
              className="review-edit-textarea"
              defaultValue={review.review}
              onChange={(event) => {
                event.preventDefault();
                setEditedContent(event.target.value);
              }}
            />
            <button
              type="submit"
              onClick={(event) => {
                event.preventDefault();
                submitEdit(review.id);
              }}
            >
              Submit
            </button>
            <button
              onClick={(event) => {
                event.preventDefault();
                deleteReview(review.id);
              }}
            >
              Delete Review
            </button>
            <button
              onClick={(event) => {
                event.preventDefault();
                setEditing(!editing);
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Reviews;
