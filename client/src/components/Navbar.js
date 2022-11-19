import React from "react";
import { Link, useNavigate } from "react-router-dom";
import siteLogo from "./media/siteLogo.png";
import troText from "./media/troText.svg";

const Navbar = ({ userData, token, setToken, admin }) => {
  const navigate = useNavigate();

  const logoutHandler = (event) => {
    event.preventDefault();
    console.log(
      "Removing token from local storage, and setting token to empty string..."
    );
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const h6Style = {
    fontSize: "3rem",
  };

  return (
    <div className="nav-header">
      {!token ? (
        // <div className="nav-banner">
        //   <p className="banner-tagline">
        //     <span className="new-span">NEW!</span> Films now start at{" "}
        //     <span className="price-span">$0.99</span>.{" "}
        //     <span className="learn-more-span">Learn More &#x27A4;</span>
        //   </p>
        // </div>
        <></>
      ) : (
        <div className="site-nav-links">
          {/* <Link to="/">
            <h6 style={h6Style}>TRO</h6>
          </Link> */}
          <Link to="/films">Films</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/api/docs">API Docs</Link>
<<<<<<< Updated upstream
          {admin ? <Link to="/admin">Admin</Link> : <></>}
          {!token ? <Link to="/login">Login/Register</Link> : <></>}
          {token ? <Link onClick={logoutHandler}>Logout</Link> : <></>}
=======
          <Link onClick={logoutHandler}>Logout</Link>
        </div>
      )}

      <div className="navbar-token">
        <div className="site-nav-links">
          {/* {!token ? <Link to="/login">Login/Register</Link> : <></>} */}
>>>>>>> Stashed changes
        </div>
      </div>
    </div>
  );
};

export default Navbar;
