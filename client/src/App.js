import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Books from "./components/Books";

function App() {
  const [books, setBooks] = useState([]);
  // i want to fetch the actual books and save them in state
  const fetchBooks = async () => {
    const response = await fetch("/api/books");
    const data = await response.json();
    setBooks(data.books);
  };

  console.log(books);

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <Link to="/books">Books</Link>
      <Routes>
        <Route path="/books" element={<Books />} />
      </Routes>
    </div>
  );
}

export default App;
