import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ setToken, setUserData }) => {
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

  const registerHandler = async (event) => {
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
      `user attempting to register account: ${username}, password: ${password}`
    );

    await fetch("/api/users/register", {
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
      <form onSubmit={registerHandler}>
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
          <Link to="/login">Already have an account?</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
