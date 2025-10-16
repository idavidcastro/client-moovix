import { Link } from "react-router-dom";

export default function CardMovie({
  movie,
  className = "",
  variant = "vertical",
}) {
  const imagePath =
    variant === "horizontal" ? movie.backdrop_path : movie.poster_path;

  const heightClasses =
    variant === "horizontal" ? "aspect-[16/9]" : "aspect-[2/3]";

  return (
    <div className="relative w-full group">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/original${imagePath}`}
          alt={movie.title}
          className={`w-full object-cover rounded-xl ${heightClasses} ${className}`}
        />
      </Link>
    </div>
  );
}
