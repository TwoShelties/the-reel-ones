import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Films from "./components/Films";

function App() {
  const [films, setFilms] = useState([]);
  // i want to fetch the actual books and save them in state
  const fetchFilms = async () => {
    const response = await fetch("/api/films");
    const data = await response.json();
    setFilms(data.films);
  };

  console.log(films);

  useEffect(() => {
    fetchFilms();
  }, []);

  return (
    <div>
      <Link to="/films">Films</Link>
      <Routes>
        <Route path="/films" element={<Films />} />
      </Routes>
    </div>
  );
}

export default App;
