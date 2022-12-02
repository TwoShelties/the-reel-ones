import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = ({ selectedUser, token }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [users, setUsers] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [targetUser, setTargetUser] = useState({});

  const fetchUsers = async () => {
    console.log("fetching users...");
    const response = await fetch("/api/users");
    const data = await response.json();
    console.log(data);

    if (data.users) {
      setUsers(data.users);

      const filteredUser = data.users.filter(
        (user) => user.username === params.username
      )[0];
      // console.log(filteredUser);

      if (filteredUser.id) {
        setTargetUser(filteredUser);
      }
    }
  };

  const changeUser = async () => {
    // console.log("editing user");
    // console.log(token);
    if (!targetUser || !username) {
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
        username,
      }),
    });
    const info = await response.json();
    console.log(info);

    if (info.success) {
      console.log(`changed username ${username} to :`, info.update[0].username);
      let newUsername = info.update[0].username;
      // console.log(newUsername);
      setUsername(newUsername);
      alert(`You have changed username: ${params.username} to: ${newUsername}`);
      navigate(`/admin`);
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

  if (!targetUser) {
    return <></>;
  }

  return (
    <div>
      {targetUser.id ? (
        <form onSubmit={changeUser} style={{ color: "#fff" }}>
          <p>Current Username: {targetUser.username}</p>

          <input
            defaultValue={targetUser.username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            placeholder="New username"
          />
          <button
            onClick={(event) => {
              event.preventDefault();
              changeUser();
            }}
          >
            Save changes for user
          </button>
          <button onClick={(event) => deleteUser}>Delete User</button>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
};
export default EditUser;
