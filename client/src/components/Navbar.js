import React from "react";
import { Link, useNavigate } from "react-router-dom";
import siteLogo from "./media/siteLogo.png";
import troText from "./media/troText.svg";

const Navbar = ({ userData, token, setToken, admin, guestData }) => {
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
        <></>
      ) : (
        <div className="site-nav-links">
          {/* <Link to="/">
            <h6 style={h6Style}>TRO</h6>
          </Link> */}
          <Link to="/films" className="add-review-btn">
            Films
          </Link>
          <Link to="/profile" className="add-review-btn">
            Profile
          </Link>
          <Link to="/cart" className="add-review-btn">
            Cart
          </Link>
          {/* <Link to="/api/docs" className="add-review-btn">
            API Docs
          </Link> */}
          {admin ? (
            <Link to="/admin" className="add-review-btn">
              Admin
            </Link>
          ) : (
            <></>
          )}
          {/* {!token || guestData.id ? (
            <Link to="/login" className="add-review-btn">
              Login/Register
            </Link>
          ) : (
            <></>
          )}
          {token && !guestData.id ? (
            <Link onClick={logoutHandler} className="add-review-btn">
              Logout
            </Link>
          ) : (
            <></>
          )} */}
          {guestData.id ? (
            <Link to="/login" className="add-review-btn">
              Login/Register
            </Link>
          ) : (
            <Link onClick={logoutHandler} className="add-review-btn">
              Logout
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
