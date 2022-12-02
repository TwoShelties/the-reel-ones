import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditUser = ({ selectedUser, token }) => {
  const [users, setUsers] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [targetUser, setTargetUser] = useState({});

  // const navigate = useNavigate();
  const params = useParams();

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    console.log(data);

    if (data.users) {
      setUsers(data.users);

      // data.users.map((user) => {
      //   console.log(typeof user.username);
      //   console.log(params.username);
      //   if (user.username === params.username) {
      //     console.log(user);
      //     setTargetUser(user);
      //   }
      // });
      const filteredUser = data.users.filter(
        (user) => user.username === params.username
      )[0];
      console.log(filteredUser);
    }
  };

  const changeUser = async () => {
    // console.log("editing user");
    // console.log(token);
    if (!targetUser) {
      return;
    }
    console.log(targetUser);
    const response = await fetch(`/api/users/${targetUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: targetUser.id,
        username: targetUser.username,
      }),
    });
    const info = await response.json();
    console.log(info);

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

  useEffect(() => {
    fetchUsers();
  }, []);

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
        <button
          onClick={(event) => {
            event.preventDefault();
            changeUser();
          }}
        >
          Save changes for user
        </button>
        <p onClick={() => console.log(targetUser)}>Target User</p>
        <button onClick={(event) => deleteUser}>Delete User</button>
      </form>
    </div>
  );
};
export default EditUser;
