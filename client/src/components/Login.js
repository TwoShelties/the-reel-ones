import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameInputHandler = (event) => {
    event.preventDefault();
  };

  const passwordInputHandler = (event) => {
    event.preventDefault();
  };

  const loginHandler = (event) => {
    event.preventDefault();

    if (!username || !password) {
      alert("You must enter a username and password.");
      return;
    }

    console.log(
      `user attempting to login with username: ${username}, password: ${password}`
    );
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
