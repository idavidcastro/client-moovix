import { Link } from "react-router-dom";

export default function CardMovie({ movie, classname = "" }) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="h-auto w-full">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
          className={
            `object-cover w-auto block rounded-md aspect-auto ` + classname
          }
        />
      </div>
    </Link>
  );
}
