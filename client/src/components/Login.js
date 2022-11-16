import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const userLogin = async (event) => {
    event.preventDefault();

    const response = await fetch(`api/users/login`, {
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
      setToken(info.token);
      localStorage.setItem("token", info.token);
      navigate("/profile");
    }
  };
  return (
    <div>
      <form onSubmit={userLogin}>
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
        <button>Login</button>
        <p>
          <Link to="/register">Need to create an account?</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
