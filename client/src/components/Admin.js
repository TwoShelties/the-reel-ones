import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin = ({ films, selectedFilm, setSelectedFilm, token }) => {
  // const params = useParams();
  // const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  let sortedUsers = [];
  const [nonAdmins, setNonAdmins] = useState([]);
  let sortedAdmins = [];
  const [admins, setAdmins] = useState([]);
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
  const [editUserId, setEditUserId] = useState(null);

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
    // event.preventDefault();

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
    // event.preventDefault();

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
      alert(`You made ${data.response.username} an admin!`);
      fetchUsers();
      return;
    }
  };

  const findUserId = (username) => {
    const filteredUsers = users.filter((user) => user.username === username)[0];
    // console.log(filteredUsers);
    setEditUserId(filteredUsers.id);
    navigate(`/editUser/${editUserId}`);
  };

  useEffect(() => {
    // getallGenres();
    insertnewFilm();
    fetchUsers();
    // fetchFilms();
    deleteFilm();
  }, []);

  return (
    <div>
      <ul>
        <div className="allFilms">
          <table>
            <tbody>
              <tr>
                <td>
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
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ul>
      <ul>
        <div className="allUsers">
          <table>
            <tbody>
              <tr>
                <td>
                  <select
                    onChange={(event) => {
                      setUsers(event.target.value);
                      findUserId(event.target.value);
                    }}
                  >
                    <option>No Users Selected</option>
                    {users.map((user) => {
                      return <option>{user.username}</option>;
                    })}
                  </select>
                </td>
              </tr>
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

      {/* <p>{console.log("Error")}</p> */}
      <div style={{ backgroundColor: "#fff" }}>
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
          >
            Submit
          </button>
          {selectedUser ? (
            <div>
              <p style={{ textDecoration: "underline" }}>User selected</p>
              <p>{selectedUser.username}</p>
              <p>User ID: {selectedUser.id}</p>
            </div>
          ) : (
            <></>
          )}
        </form>
        {/* <p style={{ textDecoration: "underline" }}>Current Admins</p>
        <ul>
          {admins ? (
            admins.map((admin) => {
              return <li style={{ fontSize: "smaller" }}>{admin}</li>;
            })
          ) : (
            <></>
          )}
        </ul> */}
      </div>
    </div>
  );
};

export default Admin;
