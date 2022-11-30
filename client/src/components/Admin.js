import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin = ({ films, selectedFilm, setSelectedFilm }) => {
  // const params = useParams();
  // const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [film, setFilm] = useState([]);
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [img, setImg] = useState({});
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  // const [allgenres, setAllgenres] = useState([]);
  // const [films, setFilms] = useState([]);

  const [token, setToken] = useState("");

  const navigate = useNavigate();

  // const fetchFilms = async () => {
  //   const response = await fetch("/api/films");
  //   const data = await response.json();
  //   // console.log(data);
  //   setFilms(data.films);
  // };

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    // console.log(data);
    setUsers(data.users);
  };

  // const getallGenres = aysnc () => {
  //   const response = await fetch(`api/genres`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },

  //     });
  //     const info = await response.json();

  //     if (info) {
  //       console.log(info);
  //     }
  // }

  const insertnewFilm = async (event) => {
    event.preventDefault();

    const response = await fetch(`api/films`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: users.id,
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

  useEffect(() => {
    // getallGenres();
    insertnewFilm();
    fetchUsers();
    // fetchFilms();
    deleteFilm();
  }, []);

  // const renderFilms = (films) =>
  //     films.map((r) => {
  //       const key = <td>{Object.keys(r)[0]}</td>;
  //       const values = Object.values(r)[0].map((v) => <td>{v}</td>);
  //       return (
  //         <tr>
  //           {key}
  //           {values}
  //         </tr>
  //       );
  //     });

  return (
    <div>
      <ul>
        <div className="allFilms">
          <table>
            <tbody>
              <select
                onChange={(event) => {
                  setSelectedFilm(event.target.value);
                  navigate("/editFilm");
                }}
              >
                <option>No Films Selected</option>
                {films.map((film) => {
                  return <option>{film.title}</option>;
                })}
              </select>
            </tbody>
          </table>
        </div>
      </ul>
      <ul>
        <div className="allUsers">
          <table>
            <tbody>
              <select
                onChange={(event) => {
                  setUsers(event.target.value);
                  navigate("/editUser");
                }}
              >
                <option>No Users Selected</option>
                {users.map((user) => {
                  return <option>{user.userid}</option>;
                })}
              </select>
            </tbody>
          </table>
        </div>
      </ul>
      <form onSubmit={insertnewFilm}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Film title"
        />
        <input
          value={director}
          onChange={(event) => setDirector(event.target.value)}
          placeholder="Film's director"
        />
        <input
          value={year}
          onChange={(event) => setYear(event.target.value)}
          placeholder="Year released"
        />
        <input
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
          placeholder="Movie genre"
        />
        <input
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Movie description"
        />
        <input
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          placeholder="Movie price"
        />
        <button>Create film in inventory</button>
      </form>
      {/* <button
              onClick={(event) => {
                event.preventDefault();
                deleteFilm();
              }}
            >Delete Film
        </button> */}

      <p>{console.log("Error")}</p>
    </div>
  );
};

export default Admin;
