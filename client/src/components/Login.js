import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setToken, setUserData }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameInputHandler = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const passwordInputHandler = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const loginHandler = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      alert("You must enter a username and password");
      return;
    }

    if (password.length < 8) {
      alert("Your password must be 8 characters or longer");
      return;
    }

    console.log(
      `user attempting to login with username: ${username}, password: ${password}`
    );

    await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (!result.error) {
          setToken(result.token);
          localStorage.setItem("token", result.token);
          setUserData(result.user);
          navigate("/profile");
        }
      });
  };

  return (
    <div>
      <form onSubmit={loginHandler}>
        <input
          type="text"
          placeholder="Username"
          onChange={usernameInputHandler}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={passwordInputHandler}
        />
        <button>Submit</button>
        <p>
          <Link to="/register">Don't have an account yet?</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
