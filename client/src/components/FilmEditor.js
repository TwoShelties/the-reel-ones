import React, { useEffect, useState } from "react";

const FilmEditor = ({
  editField,
  editKey,
  setNewTitle,
  setNewYear,
  setNewDirector,
  setNewDescription,
  setNewPrice,
  editing,
  setEditing,
  setNewImage,
}) => {
  const [editValue, setEditValue] = useState(null);

  const changeHandler = (edits) => {
    setEditValue(edits);
  };

  const editHandler = async () => {
    // if (!editValue) {
    //   return;
    // }
    // console.log(editKey);
    // check to make sure image includes domain:
    if (editKey === "image") {
      // console.log("editKey is an image");
      // let domains = [".com", ".org", ".net", ".io", ".gov", ".edu"];

      setNewImage(editValue);
    }

    if (editKey === "title") {
      setNewTitle(editValue);
    }

    if (editKey === "director") {
      setNewDirector(editValue);
    }

    if (editKey === "year") {
      setNewYear(editValue);
    }

    if (editKey === "description") {
      setNewDescription(editValue);
    }

    if (editKey === "price") {
      setNewPrice(editValue);
    }

    if (editing) {
      setEditing(false);
    }
  };

  // const priceInput = document.querySelector("price-input")
  // priceInput.addEventListener('keydown', function)

  return (
    <div style={{ marginTop: "2rem" }}>
      <p>Editing: {editKey}</p>
      {editKey === "year" || editKey === "price" ? (
        <div>
          {editKey === "price" ? (
            <input
              type="number"
              max="2.99"
              min="0.99"
              step="0.10"
              placeholder={editField}
              id="price-input"
              onKeyDown={(event) => {
                if (/\d/g.test(event.key)) {
                  event.preventDefault();
                }
              }}
              onChange={(event) => {
                setEditValue(Number(event.target.value));
              }}
            />
          ) : (
            <input
              type="number"
              placeholder={editField}
              onChange={(event) => {
                setEditValue(Number(event.target.value));
              }}
            />
          )}
        </div>
      ) : (
        <textarea
          placeholder={editField}
          onChange={(event) => {
            // console.log("calling changeHandler");

            changeHandler(event.target.value);
          }}
          style={{ width: "50vw", height: "20vh" }}
        />
      )}

      <button
        onClick={(event) => {
          event.preventDefault();
          editHandler();
        }}
        className="add-review-btn"
      >
        Make Edit
      </button>
    </div>
  );
};

export default FilmEditor;
