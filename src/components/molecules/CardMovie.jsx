import { Link } from "react-router-dom";

export default function CardMovie({ movie, className = "" }) {
  return (
    <div className="relative w-full group">
      <Link to={`/movie/${movie.id}`}>
        <div className="relative overflow-hidden rounded-sm">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
            className={`w-full object-cover lg:transition-transform lg:duration-300 lg:group-hover:scale-110 ${className}`}
          />
        </div>
      </Link>
    </div>
  );
}
