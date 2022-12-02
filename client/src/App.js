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
import EditFilm from "./components/editFilm";
import EditUser from "./components/editUser";
import Confirmation from "./components/Confirmation";

const App = () => {
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState(0);
  const [admin, setAdmin] = useState(false);
  const [films, setFilms] = useState([]);
  const [guest, setGuest] = useState(true);
  const [guestEmail, setGuestEmail] = useState("");
  // below here will be cart-related stuff:
  const [cartArray, setCartArray] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState({});
  const [selectedUser, setSelectedUser] = useState([]);

  const fetchFilms = async () => {
    const response = await fetch("/api/films");
    const data = await response.json();
    // console.log(data);
    setFilms(data.films);
  };

  const checkAdmin = async (userId) => {
    if (!userData.id) {
      return;
    }

    console.log("checking admin status for user ID: " + userData.id);

    userId = userData.id;

    const response = await fetch(`api/users/${userData.id}/checkAdmin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  const fetchUser = async () => {
    const response = localStorage.getItem("token");
    // console.log(response);
    setToken(response);
  };

  const fetchUserData = async () => {
    if (!token) {
      return;
    }

    const response = await fetch(`/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);

    if (data.id && data.username) {
      setUserData(data);
    }

    const checkAdminResponse = await fetch(`/api/users/${data.id}/checkAdmin`);
    const checkAdminResult = await checkAdminResponse.json();
    console.log(checkAdminResult);

    if (checkAdminResult.isAdmin) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  };

  useEffect(() => {
    fetchFilms();
    checkAdmin();
    fetchUser();
    fetchUserData();
  }, [token]);

  return (
    <div>
      <Navbar
        userData={userData}
        token={token}
        setToken={setToken}
        admin={admin}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              token={token}
              setToken={setToken}
              setGuestEmail={setGuestEmail}
              guestEmail={guestEmail}
            />
          }
        />

        <Route
          path="/login"
          element={
            <Login
              setToken={setToken}
              setUserData={setUserData}
              token={token}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              setToken={setToken}
              setUserData={setUserData}
              token={token}
              guestEmail={guestEmail}
            />
          }
        />
        <Route
          path="/films"
          element={
            <Films
              films={films}
              token={token}
              cartArray={cartArray}
              setCartArray={setCartArray}
              userData={userData}
            />
          }
        />
        <Route
          path="/films/:filmId"
          element={
            <Film
              films={films}
              userData={userData}
              token={token}
              cartArray={cartArray}
              setCartArray={setCartArray}
            />
          }
        />
        <Route
          path="/profile"
          element={<Profile userData={userData} films={films} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartArray={cartArray}
              setCartArray={setCartArray}
              films={films}
              userData={userData}
              token={token}
            />
          }
        />
        <Route path="/api/docs" element={<Docs />} />
        <Route path="/confirmation" element={<Confirmation />} />
        {admin ? (
          <Route
            path="/admin"
            element={
              <Admin
                admin={admin}
                films={films}
                token={token}
                selectedFilm={selectedFilm}
                setSelectedFilm={setSelectedFilm}
              />
            }
          />
        ) : (
          <></>
        )}
        {admin ? (
          <Route
            path="/editFilm/:filmId"
            element={
              <EditFilm
                admin={admin}
                films={films}
                token={token}
                selectedFilm={selectedFilm}
                setSelectedFilm={setSelectedFilm}
              />
            }
          />
        ) : (
          <></>
        )}
        {admin ? (
          <Route
            path="/editUser/:username"
            element={
              <EditUser
                admin={admin}
                films={films}
                token={token}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
              />
            }
          />
        ) : (
          <></>
        )}
      </Routes>
    </div>
  );
};

export default App;
