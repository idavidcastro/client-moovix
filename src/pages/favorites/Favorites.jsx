import React from "react";
import { Link } from "react-router-dom";
import AddListBtn from "../../components/atoms/AddListBtn";
import { useFavoriteMoviesStore } from "../../stores/favoriteMovies";

function Favorites() {
  const favorites = useFavoriteMoviesStore((state) => state.favoriteMovies);
  console.log("en mi lista", favorites);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold text-primary">Mis favoritos</h1>

      {favorites.length === 0 ? (
        <p className="text-secondary text-sm">
          No tienes películas favoritas aún.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-6 mt-4 mb-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {favorites.map((movie) => (
            <div
              key={movie.id}
              aria-label={`Movie: ${movie.title}`}
              className="flex flex-col overflow-hidden transition-transform duration-300 shadow-md cursor-pointer group bg-primary/10 rounded-md hover:scale-105 hover:shadow-lg"
            >
              <div className="relative w-full h-auto">
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.title}
                    className="object-cover w-auto block rounded-md h-[320px]"
                  />
                </Link>
                <div className="absolute z-10 top-2 right-2">
                  <AddListBtn movie={movie} isFavorite={true} />
                  {/* ✅ Siempre es favorito aquí */}
                </div>
              </div>

              <div className="flex flex-col justify-between flex-1 p-3">
                <h3 className="mb-1 text-base font-semibold transition-colors text-primary line-clamp-2 group-hover:text-primary/80">
                  {movie.title}
                </h3>
                <span className="text-xs text-secondary">
                  {movie.release_date}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
