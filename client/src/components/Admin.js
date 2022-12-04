import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Admin = ({ films, selectedFilm, setSelectedFilm, token, setFilms }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  let sortedUsers = [];
  const [nonAdmins, setNonAdmins] = useState([]);
  let sortedAdmins = [];
  const [admins, setAdmins] = useState([]);

  const [genres, setGenres] = useState([]);

  // New film state:
  const [newFilmTitle, setNewFilmTitle] = useState("");
  const [newFilmDirector, setNewFilmDirector] = useState("");
  const [newFilmYear, setNewFilmYear] = useState(null);
  const [newFilmGenre, setNewFilmGenre] = useState("");
  const [newFilmDescription, setNewFilmDescription] = useState("");
  const [newFilmPrice, setNewFilmPrice] = useState(0.99);
  const [newFilmImage, setNewFilmImage] = useState("");

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    // console.log(data);

    if (data.users) {
      setUsers(data.users);
      // console.log(data.users);

      // Setting list of alphabetical non-admins and a separate list
      // of admins:
      if (sortedUsers.length > 0 || sortedAdmins.length > 0) {
        return;
      }

      data.users.map((user) => {
        if (!user.isAdmin) {
          sortedUsers.push(user.username);
        } else {
          sortedAdmins.push(user.username);
        }
      });

      sortedUsers = sortedUsers.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
      setNonAdmins(sortedUsers);
      // console.log(sortedUsers);

      sortedAdmins = sortedAdmins.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
      setAdmins(sortedAdmins);
      // console.log(sortedAdmins);
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

  const [newAdmin, setNewAdmin] = useState(null);
  const [selectedUser, setSelectedUser] = useState({});

  const submitNewAdmin = async () => {
    if (!newAdmin) {
      return;
    }
    console.log("attempting to give admin status to user: " + newAdmin);

    const filteredUser = users.filter((user) => user.username === newAdmin)[0];
    const userId = filteredUser.id;

    if (filteredUser.isAdmin) {
      return;
    }
    console.log(token);

    const response = await fetch(`/api/users/${userId}/giveAdminStatus`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.response.isAdmin) {
      setSelectedUser("");
      alert(`You made ${data.response.username} an admin!`);
      fetchUsers();
      return;
    }
  };

  const checkImgUrl = async (url) => {
    console.log("checking validity of film src url...");
    const backupImageSrc = `https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png?20221130100445`;
    let http = new XMLHttpRequest();
    http.open("HEAD", url, false);
    http.send();
    if (http.status === 404) {
      alert(
        "Image URL provided isn't valid. If your film posts, the image will be replaced with a placeholder! You can edit the image if necessary."
      );
      setNewFilmImage(backupImageSrc);
    }
  };

  const createNewFilm = async () => {
    if (!token) {
      return;
    }

    await checkImgUrl(newFilmImage);

    console.log(
      "title: ",
      newFilmTitle,
      "director: ",
      newFilmDirector,
      "year: ",
      newFilmYear,
      "image: ",
      newFilmImage,
      "desc: ",
      newFilmDescription,
      "genre: ",
      newFilmGenre,
      "price: ",
      newFilmPrice
    );
    if (
      !newFilmTitle ||
      !newFilmDirector ||
      !newFilmYear ||
      !newFilmImage ||
      !newFilmDescription ||
      !newFilmYear ||
      !newFilmPrice
    ) {
      alert(
        "You have empty fields in the new film form. All fields must have values!"
      );
      return;
    }

    const response = await fetch(`/api/films`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: newFilmTitle,
        director: newFilmDirector,
        year: newFilmYear,
        img: newFilmImage,
        genre: newFilmGenre,
        description: newFilmDescription,
        price: newFilmPrice,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      alert(`You added a new film: ${data.newFilm.title}!`);

      const response = await fetch(`/api/films`);
      const result = await response.json();
      console.log(result);
      if (result.success) {
        setFilms(result.films);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchGenres();
  }, []);

  return (
    <div>
      <h1 style={{ color: "#fff" }}>Admin Dashboard</h1>
      <div className="allFilms" style={{ color: "#fff" }}>
        <p>Select a film to edit:</p>
        <select
          onChange={(event) => {
            setSelectedFilm(event.target.value);
            navigate(`/editFilm/${event.target.value}`);
          }}
        >
          <option>No Films Selected</option>
          {films.map((film) => {
            return <option>{film.title}</option>;
          })}
        </select>
      </div>

      <div className="allUsers" style={{ marginTop: "1rem" }}>
        <p style={{ color: "#fff" }}>Select a user to edit:</p>
        <select
          onChange={(event) => {
            navigate(`/editUser/${event.target.value}`);
          }}
        >
          <option>No Users Selected</option>
          {users.map((user) => {
            // console.log(user);
            return <option>{user.username}</option>;
          })}
        </select>
      </div>

      <div style={{ marginTop: "1rem", width: "100%" }}>
        <p style={{ color: "#fff" }}>Add a new film:</p>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "33vw",
          }}
        >
          <input
            placeholder="Film Title"
            type="text"
            onChange={(event) => setNewFilmTitle(event.target.value)}
          />
          <input
            placeholder="Film Director"
            type="text"
            onChange={(event) => setNewFilmDirector(event.target.value)}
          />
          <input
            placeholder="Year Released"
            type="number"
            onChange={(event) => setNewFilmYear(event.target.value)}
          />
          <input
            placeholder="Film URL"
            type="text"
            onChange={(event) => {
              setNewFilmImage(event.target.value);
            }}
          />
          {genres ? (
            <select
              onChange={(event) => {
                if (event.target.value !== "Genre") {
                  setNewFilmGenre(event.target.value);
                }
              }}
            >
              <option>Genre</option>
              {genres.map((genre) => {
                return <option>{genre}</option>;
              })}
            </select>
          ) : (
            <></>
          )}

          <textarea
            placeholder="Movie description"
            type="text"
            onChange={(event) => setNewFilmDescription(event.target.value)}
            style={{ height: "20vh" }}
          />
          <input
            type="number"
            max="2.99"
            min="0.99"
            step="0.10"
            id="price-input"
            placeholder="Film Price: 0.99"
            onKeyDown={(event) => {
              if (/\d/g.test(event.key)) {
                event.preventDefault();
              }
            }}
            onChange={(event) => setNewFilmPrice(event.target.value)}
            // onChange={(event) => {}}
          />
          <button
            className="add-review-btn"
            onClick={(event) => {
              event.preventDefault();
              createNewFilm();
            }}
          >
            Create Film
          </button>
        </form>
      </div>

      <div style={{ color: "#fff" }}>
        <form>
          <h3>The holiest of powers, giving admin status to a non-admin</h3>
          <select
            onChange={(event) => {
              setNewAdmin(event.target.value);

              if (users) {
                const filteredUser = users.filter(
                  (user) => user.username === event.target.value
                )[0];

                delete filteredUser.password;
                // console.log(filteredUser);

                setSelectedUser(filteredUser);
              }
            }}
          >
            <option>(select user)</option>
            {nonAdmins ? (
              nonAdmins.map((user) => {
                return <option>{user}</option>;
              })
            ) : (
              <></>
            )}
          </select>

          <button
            onClick={(event) => {
              event.preventDefault();
              submitNewAdmin();
            }}
            className="add-review-btn"
          >
            Submit
          </button>
          {/* {selectedUser ? (
            <div>
              <p style={{ textDecoration: "underline" }}>User selected</p>
              <p>{selectedUser.username}</p>
              <p>User ID: {selectedUser.id}</p>
            </div>
          ) : (
            <></>
          )} */}
        </form>
      </div>
    </div>
  );
};

export default Admin;
