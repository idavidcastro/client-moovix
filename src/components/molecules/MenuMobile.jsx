import { IoIosPlay } from "react-icons/io";
import { MoreVertical, Info, Plus, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useFavoriteMoviesStore } from "../../stores/favoriteMovies";

export default function MenuMobile({ movie, onOpenTrailer }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const favoriteMovies = useFavoriteMoviesStore(
    (state) => state.favoriteMovies
  );
  const addFavoriteMovie = useFavoriteMoviesStore(
    (state) => state.addFavoriteMovie
  );
  const removeFavoriteMovie = useFavoriteMoviesStore(
    (state) => state.removeFavoriteMovie
  );
  const isFavorite = favoriteMovies.some((fav) => fav.id === movie.id);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        event.preventDefault();
        event.stopPropagation();
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside, true);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside, true);
    }
  }, [isOpen]);

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFavoriteMovie(movie.id);
    } else {
      addFavoriteMovie(movie);
    }
  };

  return (
    <div className="lg:hidden relative flex-1 flex justify-between items-start w-full p-2">
      <div className="flex flex-col h-full justify-between">
        <h3 className="text-sm font-bold text-primary line-clamp-3">
          {movie.title}
        </h3>
        <span className="text-sm text-gray-600 font-bold">{year}</span>
      </div>

      {/* Menu desplegable */}
      <div className="relative" ref={menuRef}>
        <button
          className="text-primary p-2 cursor-pointer hover:bg-primary/10 rounded-full transition"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          <MoreVertical size={20} />
        </button>

        {isOpen && (
          <div
            className="fixed inset-0 z-50"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(false);
            }}
          />
        )}

        {/* Menú desplegable */}
        <div
          className={`absolute right-0 mt-1 w-48 rounded-md shadow-lg backdrop-blur-md bg-secondary/20 border border-secondary/20 transition-all duration-200 z-[51] ${
            isOpen
              ? "opacity-100 visible transform scale-100"
              : "opacity-0 invisible transform scale-95"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            {/* Ver trailer */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenTrailer?.(movie);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm text-primary hover:bg-primary/10 w-full text-left cursor-pointer transition-colors duration-200"
            >
              <IoIosPlay size={18} />
              Ver trailer
            </button>

            {/* Agregar/Quitar de mi lista */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFavoriteToggle(e);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm text-primary hover:bg-primary/10 w-full text-left cursor-pointer"
            >
              {isFavorite ? <Check size={18} /> : <Plus size={18} />}
              {isFavorite ? "Quitar de mi lista" : "Agregar a mi lista"}
            </button>

            {/* Ver más */}
            <Link
              to={`/movie/${movie.id}`}
              className="flex items-center gap-2 px-4 py-2 text-sm text-primary hover:bg-primary/10 w-full text-left"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              <Info size={18} />
              Más información
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
