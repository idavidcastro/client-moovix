import { Check, Plus } from "lucide-react";
import { useFavoriteMoviesStore } from "../stores/favoriteMovies";

function AddListBtn({ movie, className = "", isFavorite }) {
  const addFavoriteMovie = useFavoriteMoviesStore(
    (state) => state.addFavoriteMovie
  );
  const removeFavoriteMovie = useFavoriteMoviesStore(
    (state) => state.removeFavoriteMovie
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteMovie(movie.id);
    } else {
      addFavoriteMovie(movie);
    }
  };

  return (
    <button
      className={`rounded-full p-2 text-primary hover:scale-110 transition-transform bg-primary/20 cursor-pointer ease-in-out duration-500 ${
        isFavorite
          ? "bg-primary text-bg hover:bg-primary hover:text-bg"
          : "hover:bg-primary hover:text-bg"
      } ${className}`}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Quitar de mi lista" : "Agregar a mi lista"}
      onClick={toggleFavorite}
      title={isFavorite ? "Quitar de mi lista" : "Agregar a mi lista"}
    >
      {isFavorite ? <Check /> : <Plus />}
    </button>
  );
}

export default AddListBtn;
