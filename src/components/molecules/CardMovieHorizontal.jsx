import { Link } from "react-router-dom";
import AddListBtn from "../atoms/AddListBtn";
import { FaStar } from "react-icons/fa";

export default function CardMovieHorizontal({ movie, className = "" }) {
  return (
    <div className="relative w-full group">
      <Link to={`/movie/${movie.id}`}>
        <div className="relative overflow-hidden rounded-sm">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className={`w-full object-cover lg:transition-transform lg:duration-300 lg:group-hover:scale-110 ${className}`}
          />
        </div>
      </Link>
    </div>
  );
}
