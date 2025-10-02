import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import AllMovies from "./pages/all-movies/AllMovies";
import MovieDetail from "./pages/movie-detail/MovieDetail";
import Favorites from "./pages/favorites/Favorites";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allmovies" element={<AllMovies />} />
        {/* <Route path="/movie/:id" element={<MovieDetail />} /> */}
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
