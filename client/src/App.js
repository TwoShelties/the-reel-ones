import { useEffect, useState } from "react";
import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Films from "./components/Films";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Cart from "./components/Cart";
import Docs from "./components/Docs";
import Film from "./components/Film";
import Admin from "./components/Admin";

const App = () => {
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState(0);
  const [admin, setAdmin] = useState(false);
  const [films, setFilms] = useState([]);

  const fetchFilms = async () => {
    const response = await fetch("/api/films");
    const data = await response.json();
    // console.log(data);
    setFilms(data.films);
  };

  const checkAdmin = async () => {
    const response = await fetch("/api/users/me");
    const data = await response.json();
    if (data.isAdmin) {
      setAdmin(true);
    }
  };

  const fetchUser = () => {
    const response = localStorage.getItem("token");
    // console.log(response);
    setToken(response);
  };

  useEffect(() => {
    fetchFilms();
    checkAdmin();
  }, [token, userData]);

  return (
    <div>
      <Navbar userData={userData} token={token} setToken={setToken} />

      <Routes>
        <Route path="/" element={<Home token={token} setToken={setToken} />} />

        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/films" element={<Films films={films} token={token} />} />
        <Route
          path="/films/:filmId"
          element={<Film films={films} userData={userData} token={token} />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/api/docs" element={<Docs />} />
        {admin ? (
          <Route path="/admin" element={<Admin admin={admin} />} />
        ) : (
          <></>
        )}
      </Routes>
    </div>
  );
};

export default App;
