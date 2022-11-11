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

const App = () => {
  const [userData, setUserData] = useState(false);
  const [token, setToken] = useState(0);

  const [films, setFilms] = useState([]);

  const fetchFilms = async () => {
    const response = await fetch("/api/films");
    const data = await response.json();
    // console.log(data);
    setFilms(data.films);
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  return (
    <div>
      <Navbar userData={userData} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/films" element={<Films films={films} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/api/docs" element={<Docs />} />
      </Routes>
    </div>
  );
};

export default App;
