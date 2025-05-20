import React, { useState, useEffect } from "react";
import './index.css'

const MovieSearchApp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  const API_KEY = "3c64a5a"; // Replace with your actual OMDB API key

  const fetchMovieData = async () => {
    if (!searchTerm.trim()) return;

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&page=${currentPage}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovieList(data.Search);
        setMaxPages(Math.ceil(data.totalResults / 10));
      } else {
        setMovieList([]);
        console.error("No movies found.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, [searchTerm, currentPage]);

  return (
    <div>
      <h1>Movie Search App</h1>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />

      <div style={{ marginTop: "1rem" }}>
        <button
          className="button1"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="button2"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage >= maxPages}
        >
          Next
        </button>
      </div>

      <ul>
        {movieList.map((movie) => (
          <li key={movie.imdbID}>{movie.Title}</li>
        ))}
      </ul>

      <p>
        Page {currentPage} of {maxPages}
      </p>
    </div>
  );
};

export default MovieSearchApp;
