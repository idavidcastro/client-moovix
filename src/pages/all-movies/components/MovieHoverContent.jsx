import React from "react";
import { Star, Calendar } from "lucide-react";
import { IoIosPlay } from "react-icons/io";
import Btn from "../../../components/atoms/Btn";
import AddListBtn from "../../../components/atoms/AddListBtn";
import BtnInfo from "../../../components/atoms/BtnInfo";
import { useFavoriteMoviesStore } from "../../../stores/favoriteMovies";

export default function MovieHoverContent({ movie, isVisible, onOpenTrailer }) {
  const favoriteMovies = useFavoriteMoviesStore(
    (state) => state.favoriteMovies
  );

  const isFavorite = favoriteMovies.some((fav) => fav.id === movie.id);
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.getFullYear();
  };

  return (
    <div
      className={`hidden lg:block absolute left-0 right-0 bg-bg-secondary rounded-b-lg shadow-2xl transition-all duration-100 z-20 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-[-8px] pointer-events-none"
      }`}
      style={{ top: "calc(100% - 8px)" }}
    >
      <div className="p-3 space-y-2">
        {/* Título y rating */}
        <div>
          <h3 className="text-white font-bold text-sm mb-1 line-clamp-1">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">
                {movie.vote_average?.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(movie.release_date)}</span>
            </div>
          </div>
        </div>
        {/* Grupo de botones - versión mejorada y responsiva */}
        <div className="flex flex-col items-start gap-2 w-full">
          {/* Botón de trailer */}
          <Btn
            name="Ver trailer"
            onClick={() => onOpenTrailer?.(movie)}
            icon={<IoIosPlay size={24} />}
            className="w-full px-3 py-1.5 text-xs sm:text-lg gap-1 justify-center"
          />

          {/* Botones secundarios */}
          <div className="flex items-center gap-2">
            <AddListBtn
              movie={movie}
              className="shrink-0 hover:scale-110 transition-transform"
              isFavorite={isFavorite}
            />
            <BtnInfo
              movie={movie}
              className="shrink-0 hover:scale-110 transition-transform"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
