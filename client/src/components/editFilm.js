import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditFilm = ({ selectedFilm, token }) => {
  const [users, setUsers] = useState([]);
  const [film, setFilm] = useState([]);
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [img, setImg] = useState({});
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const changeFilm = async (event) => {
    event.preventDefault();

    const response = await fetch(`api/films/:filmId`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        director: director,
        year: year,
        genre: genre,
        img: img,
        description: description,
        price: price,
      }),
    });
    const info = await response.json();

    if (info.title) {
      console.log(info);
    }
  };

  const deleteFilm = async (event) => {
    event.preventDefault();

    const response = await fetch(`api/films/delete/:filmId`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const info = response.json();
    return info;
  };

  return (
    <div>
      <form onSubmit={changeFilm}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="New title"
        />
        <input
          value={director}
          onChange={(event) => setDirector(event.target.value)}
          placeholder="New director"
        />
        <input
          value={year}
          onChange={(event) => setYear(event.target.value)}
          placeholder="Updated Year"
        />
        <input
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
          placeholder="Updated genre"
        />
        <input
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="New movie description"
        />
        <input
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          placeholder="New movie price"
        />
        <button>Edit film in inventory navigate</button>
        <button onClick={(event) => deleteFilm}>Delete Film</button>
      </form>
    </div>
  );
};

export default EditFilm;
