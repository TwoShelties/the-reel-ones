import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ userData, token, setToken }) => {
  const navigate = useNavigate();

  const logoutHandler = (event) => {
    console.log(
      "Removing token from local storage, and setting token to empty string..."
    );
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <h1 id="site-title">The Reel Ones</h1>
      </Link>
      <div className="site-nav-links">
        <Link to="/films">Films</Link>
        {token ? <Link to="/profile">Profile</Link> : <></>}
        <Link to="/cart">Cart</Link>
        <Link to="/api/docs">API Docs</Link>
        {!token ? <Link to="/login">Login/Register</Link> : <></>}
        {token ? <Link onClick={logoutHandler}>Logout</Link> : <></>}
      </div>
    </div>
  );
};

export default Navbar;
