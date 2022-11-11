import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ userData, setToken }) => {
  return (
    <div className="navbar">
      <Link to="/">
        <h1 id="site-title">The Reel Ones</h1>
      </Link>
      <div className="site-nav-links">
        <Link to="/films">Films</Link>
        {/* include ternary when possible to below: */}
        <Link to="/login">Login/Register</Link>
        {/* include ternary when possible to below: */}
        <Link to="/profile">Profile</Link>
        <Link to="/cart">Cart</Link>
        {/* include ternary when possible to below: */}
        {/* <a href="">Logout</a> */}
        <Link to="/api/docs">API Docs</Link>
      </div>
    </div>
  );
};

export default Navbar;
