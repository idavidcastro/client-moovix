import { Link } from "react-router-dom";

export default function CardMovie({ movie, classname = "" }) {
  return (
    <div className="relative w-full h-auto">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
          className={
            `object-cover w-auto block rounded-md aspect-auto ` + classname
          }
        />
      </Link>
    </div>
  );
}
