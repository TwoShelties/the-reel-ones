import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import troText2 from "./media/troText2.png";

const Register = ({
  setToken,
  setUserData,
  guestEmail,
  token,
  guestData,
  setGuestData,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [securityMessage, setSecurityMessage] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(false);

  const navigate = useNavigate();

  const userRegister = async (event) => {
    // event.preventDefault();

    if (!username) {
      setUsernameMessage(!usernameMessage);
    }
    if (!password) {
      setPasswordMessage(!passwordMessage);
    }

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
    console.log(info);
    if (info.user) {
      if (guestData) {
        // console.log(guestData);
        localStorage.removeItem("token");
        setGuestData({});
      }

      localStorage.setItem("token", info.token);
      setToken(info.token);
      setUserData(info.user);
      navigate("/profile");
    }
  };

  const setGuestCreds = () => {
    if (!guestEmail) {
      return;
    }

    setUsername(guestEmail);
  };

  useEffect(() => {
    setGuestCreds();
  }, [guestEmail]);

  if (!guestData.id) {
    navigate("/profile");
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <img
        src="https://images8.alphacoders.com/445/445734.jpg"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: -2,
        }}
      />
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: -1,
        }}
      />
      <img
        src={troText2}
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      />
      <form onSubmit={userRegister} className="login-reg-form">
        <h1 style={{ margin: "2rem auto 1rem auto" }}>Sign Up</h1>
        {usernameMessage ? (
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="login-reg-username-2"
            placeholder="Username"
          />
        ) : (
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="login-reg-username"
            placeholder="Username"
          />
        )}

        {usernameMessage ? (
          <p className="login-reg-message">Please enter a valid username</p>
        ) : (
          <></>
        )}

        {passwordMessage ? (
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={"password"}
            type={"password"}
            className="login-reg-password-2"
          />
        ) : (
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={"password"}
            type={"password"}
            className="login-reg-password"
          />
        )}

        {passwordMessage ? (
          <p className="login-reg-message">
            Your password must contain at least 8 characters.
          </p>
        ) : (
          <></>
        )}
        <button
          className="login-reg-sign-in-btn"
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            userRegister();
          }}
        >
          Sign Up
        </button>
        <p style={{ margin: "1rem 0", fontSize: "1rem" }}>
          <span style={{ color: "#b3b3b3" }}>Already have an account? </span>
          <Link to="/login" className="login-reg-signup-link">
            Sign in now
          </Link>
          .
        </p>
        <p style={{ color: "#b3b3b3", fontSize: "0.75rem" }}>
          This page is protected by CamSense to ensure bots are not recording
          content.{" "}
          {securityMessage ? (
            <span
              onClick={() => {
                setSecurityMessage(!securityMessage);
              }}
              className="login-reg-learn-more"
            >
              Hide message
            </span>
          ) : (
            <span
              onClick={() => {
                setSecurityMessage(!securityMessage);
              }}
              className="login-reg-learn-more"
            >
              Learn more.
            </span>
          )}
        </p>
        {securityMessage ? (
          <p
            style={{
              fontSize: "0.75rem",
              width: "40vw",
              margin: "1rem 0rem 1rem 1rem",
              color: "#b3b3b3",
              textAlign: "left",
            }}
          >
            The information in this nonsense blurb is subject to TRO's Privacy
            Policy and Terms of Service, and is used for providing, maintaining,
            and improving the security service and for general security
            purposes.
          </p>
        ) : (
          <></>
        )}
      </form>
    </div>

    // <div>
    //   <form onSubmit={userRegister}>
    // <input
    //   value={username}
    //   onChange={(event) => setUsername(event.target.value)}
    //   placeholder="username"
    // />
    // <input
    //   value={password}
    //   onChange={(event) => setPassword(event.target.value)}
    //   placeholder={"password"}
    //   type={"password"}
    // />
    //     <button>Register</button>
    //     <p>
    //       <Link to="/login">Already have an account?</Link>
    //     </p>
    //   </form>
    // </div>
  );
};

export default Register;
