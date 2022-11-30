import React, { useEffect, useState } from "react";

const EditUser = ({ selectedUser, token }) => {
  const [users, setUsers] = useState([]);
  const [film, setFilm] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const navigate = useNavigate();

  const changeUser = async (event) => {
    event.preventDefault();

    const response = await fetch(`api/films/:userId`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const info = await response.json();

    if (info.username) {
      console.log(info);
    }
  };

  const deleteUser = async (event) => {
    event.preventDefault();

    const response = await fetch(`api/users/delete/:userId`, {
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
      <form onSubmit={changeUser}>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="New username"
        />
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="New password"
        />
        <button>Save changes for user</button>
        <button onClick={(event) => deleteUser}>Delete User</button>
      </form>
    </div>
  );
};
export default EditUser;
