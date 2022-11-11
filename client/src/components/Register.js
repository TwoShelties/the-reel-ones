import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameInputHandler = (event) => {
    event.preventDefault();
  };

  const passwordInputHandler = (event) => {
    event.preventDefault();
  };

  const registerHandler = (event) => {
    event.preventDefault();

    if (!username && !password) {
      alert("You must enter a username and password");
      return;
    }

    console.log(
      `user attempting to register account: ${username}, password: ${password}`
    );
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
