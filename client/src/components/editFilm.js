import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FilmEditor from "./FilmEditor";

const EditFilm = ({ selectedFilm, token, films, setFilms }) => {
  const navigate = useNavigate();
  const params = useParams();

  const [targetFilm, setTargetFilm] = useState({});
  const [editing, setEditing] = useState(false);
  const [editField, setEditField] = useState(null);
  const [editKey, setEditKey] = useState("");

  const [newTitle, setNewTitle] = useState("");
  const [newDirector, setNewDirector] = useState("");
  const [newYear, setNewYear] = useState(null);
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState(null);
  const [newGenre, setNewGenre] = useState("");
  const [newImage, setNewImage] = useState("");

  const [editedFilm, setEditedFilm] = useState(false);
  const [deletedFilmTitle, setDeletedFilmTitle] = useState("");

  const [genres, setGenres] = useState([]);

  const findTargetFilm = () => {
    if (!films || !token) {
      return;
    }

    console.log("finding target film...");
    const paramsFilm = params.filmTitle;
    // console.log(film);

    const filteredFilm = films.filter((film) => film.title === paramsFilm)[0];

    if (filteredFilm) {
      console.log("found film: ", filteredFilm);
      setTargetFilm(filteredFilm);
    } else {
      console.log("no target film found");
      setTargetFilm({});
    }
  };

  const fetchGenres = async () => {
    const response = await fetch(`/api/genres/all-genres`);
    const data = await response.json();
    // console.log(data);

    if (data.success) {
      setGenres(data.genres);
    }
  };

  const submitChanges = async () => {
    console.log("attempting to submit changes...");
    console.log(
      "newTitle: ",
      newTitle,
      " | newDirector: ",
      newDirector,
      " | newYear: ",
      newYear,
      " | newDescription: ",
      newDescription,
      " | newPrice: ",
      newPrice
    );

    let yearSafeCheck;
    if (newYear === null) {
      yearSafeCheck = targetFilm.year;
      console.log("no new year provided, making year: " + yearSafeCheck);
    }

    let priceSafeCheck;
    if (newPrice === null) {
      priceSafeCheck = targetFilm.price;
      console.log(
        "no new price defined, setting price to default... ",
        priceSafeCheck
      );
    }

    let titleSubmission;
    let directorSubmission;
    let yearSubmission;
    let descSubmission;
    let priceSubmission;
    let imageSubmission;
    let genreSubmission;

    if (yearSafeCheck) {
      yearSubmission = yearSafeCheck;
    } else {
      yearSubmission = newYear;
    }
    if (priceSafeCheck) {
      priceSubmission = priceSafeCheck;
    } else {
      priceSubmission = newPrice;
    }
    if (!newTitle) {
      titleSubmission = targetFilm.title;
    } else {
      titleSubmission = newTitle;
    }
    if (!newDirector) {
      directorSubmission = targetFilm.director;
    } else {
      directorSubmission = newDirector;
    }
    if (!newDescription) {
      descSubmission = targetFilm.description;
    } else {
      descSubmission = newDescription;
    }
    if (!newImage) {
      imageSubmission = targetFilm.img;
    } else {
      imageSubmission = newImage;
    }
    if (!newGenre) {
      genreSubmission = targetFilm.genre;
    } else {
      genreSubmission = newGenre;
    }

    console.log("fields for submission:");
    console.log(
      titleSubmission,
      directorSubmission,
      yearSubmission,
      descSubmission,
      priceSubmission,
      imageSubmission,
      genreSubmission
    );

    const response = await fetch(`/api/films/${targetFilm.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: titleSubmission,
        director: directorSubmission,
        year: yearSubmission,
        description: descSubmission,
        price: priceSubmission,
        image: imageSubmission,
        genre: genreSubmission,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      setTargetFilm(data.updatedFilm);
      navigate(`/editFilm/${data.updatedFilm.title}`);
    }
    if (data.success) {
      const response = await fetch(`/api/films`);
      const data = await response.json();
      console.log(data);
      setNewTitle("");
      setNewDirector("");
      setNewYear(null);
      setNewDescription("");
      setNewPrice(null);
      // setFilms(data.films);
    }
  };

  const deleteFilm = async (filmId) => {
    if (!token) {
      return;
    }

    const response = await fetch(`/api/films/delete/${filmId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    // console.log(data);

    if (data.success) {
      setDeletedFilmTitle(data.deletedFilm[0].title);
      const response = await fetch(`/api/films`);
      const result = await response.json();
      // console.log(data);
      setFilms(result.films);
      alert(`You have deleted ${data.deletedFilm[0].title}`);
    }
  };

  useEffect(() => {
    findTargetFilm();
    fetchGenres();
  }, [films]);

  return (
    <div style={{ color: "#fff" }}>
      {targetFilm.id ? (
        <div>
          <form>
            <p style={{ textDecoration: "underline" }}>Edit Film</p>
            <ul className="edit-film-list">
              <li onClick={() => alert("You cannot edit film IDs.")}>
                Film ID: {targetFilm.id}
              </li>
              <li
                onClick={() => {
                  setEditField(targetFilm.title);
                  setEditKey("title");
                  if (!editing) {
                    setEditing(true);
                  }
                }}
              >
                Title: {targetFilm.title}
                {newTitle ? <span> | edit: {newTitle}</span> : <></>}
              </li>
              <li
                onClick={() => {
                  setEditField(targetFilm.director);
                  setEditKey("director");
                  if (!editing) {
                    setEditing(true);
                  }
                }}
              >
                Director: {targetFilm.director}{" "}
                {newDirector ? <span> | edit: {newDirector}</span> : <></>}
              </li>
              <li
                onClick={() => {
                  setEditField(targetFilm.year);
                  setEditKey("year");
                  if (!editing) {
                    setEditing(true);
                  }
                }}
              >
                Year: {targetFilm.year}
                {newYear ? <span> | edit: {newYear}</span> : <></>}
              </li>
              <li
                style={{ display: "flex" }}
                onClick={() => {
                  setEditField(targetFilm.img);
                  setEditKey("image");
                  if (!editing) {
                    setEditing(true);
                  }
                }}
              >
                Image:
                <img
                  src={targetFilm.img}
                  style={{ width: "15rem", height: "22rem", padding: "1rem" }}
                />
                {newImage ? <div>New Image URL: {newImage}</div> : <></>}
              </li>
              <li style={{ marginTop: "1rem" }}>
                New Genre:{" "}
                <select
                  onChange={(event) => {
                    setEditField(targetFilm.genre);
                    setEditKey("genre");
                    setNewGenre(event.target.value);
                  }}
                  onClick={() => {
                    if (editing) {
                      setEditing(false);
                    }
                  }}
                >
                  {genres.map((genre) => {
                    return <option>{genre}</option>;
                  })}
                </select>
              </li>
              <li
                onClick={() => {
                  setEditField(targetFilm.description);
                  setEditKey("description");
                  if (!editing) {
                    setEditing(true);
                  }
                }}
              >
                Description: {targetFilm.description}
                {newDescription ? <div>edit: {newDescription}</div> : <></>}
              </li>
              <li
                onClick={() => {
                  setEditField(targetFilm.price);
                  setEditKey("price");
                  if (!editing) {
                    setEditing(true);
                  }
                }}
              >
                Price ${targetFilm.price}
                {newPrice ? <span> | edit: {newPrice}</span> : <></>}
              </li>
            </ul>
          </form>
          {editing ? (
            <FilmEditor
              editField={editField}
              editKey={editKey}
              newTitle={newTitle}
              setNewTitle={setNewTitle}
              setNewDirector={setNewDirector}
              newYear={newYear}
              setNewYear={setNewYear}
              setNewDescription={setNewDescription}
              editing={editing}
              setEditing={setEditing}
              setNewPrice={setNewPrice}
              setNewImage={setNewImage}
            />
          ) : (
            <></>
          )}
          {(newYear ||
            newTitle ||
            newDirector ||
            newYear ||
            newDescription ||
            newImage ||
            newGenre ||
            newPrice) &&
          !editing ? (
            <button
              className="add-review-btn"
              onClick={(event) => {
                event.preventDefault();
                submitChanges();
              }}
            >
              Submit Changes
            </button>
          ) : (
            <></>
          )}

          <div style={{ marginTop: "2rem" }}>
            <p style={{ fontSize: "1.5rem" }}>Yikes territory...</p>
            <button
              onClick={(event) => {
                event.preventDefault();
                deleteFilm(targetFilm.id);
              }}
              className="add-review-btn"
            >
              Delete Film
            </button>
          </div>
        </div>
      ) : (
        <p>
          No film found with passed in parameters, pick a film from the admin
          page...
        </p>
      )}
    </div>
  );
};

export default EditFilm;
