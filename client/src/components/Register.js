import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ setToken, setUserData }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const userRegister = async (event) => {
    event.preventDefault();

    const response = await fetch(`api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const info = await response.json();

    if (info) {
      localStorage.setItem("token", info.token);
      setToken(info.token);
      setUserData(info.user);
      navigate("/profile");
    }
  };
  return (
    <div>
      <form onSubmit={userRegister}>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="username"
        />
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder={"password"}
          type={"password"}
        />
        <button>Register</button>
        <p>
          <Link to="/login">Already have an account?</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
