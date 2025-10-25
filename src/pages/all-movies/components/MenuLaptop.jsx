import { Star, Calendar } from "lucide-react";
import { IoIosPlay } from "react-icons/io";
import Btn from "../../../components/Btn";
import AddListBtn from "../../../components/AddListBtn";
import BtnInfo from "../../../components/BtnInfo";
import { useFavoriteMoviesStore } from "../../../stores/favoriteMovies";

export default function MenuLaptop({ movie, isVisible, onOpenTrailer }) {
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
      className={`hidden lg:block absolute left-0 right-0 bg-bg-secondary w-full rounded-b-lg shadow-2xl transition-all duration-100 z-20 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-[-8px] pointer-events-none"
      }`}
      style={{ top: "calc(100% - 8px)" }}
    >
      <div className="p-2 lg:p-3 space-y-4">
        <div>
          <h3 className="text-white font-bold text-xs lg:text-lg mb-0.5 lg:mb-1 line-clamp-1">
            {movie.title}
          </h3>
          <div className="flex items-center gap-1 lg:gap-2 text-[10px] lg:text-xs text-gray-300">
            <div className="flex items-center gap-0.5 lg:gap-1">
              <Star className="w-2.5 h-2.5 lg:w-3 lg:h-3 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">
                {movie.vote_average?.toFixed(1)}
              </span>
              <span className="text-gray-400">({movie.vote_count} votos)</span>
            </div>
            <div className="flex items-center gap-0.5 lg:gap-1">
              <Calendar className="w-2.5 h-2.5 lg:w-3 lg:h-3" />
              <span>{formatDate(movie.release_date)}</span>
            </div>
          </div>
          {/* Descripción corta */}
          <p className="text-[10px] lg:text-xs text-gray-300 mt-1 lg:mt-2 line-clamp-2 cursor-default">
            {movie.overview}
          </p>
        </div>
        {/* Grupo de botones - versión mejorada y responsiva */}
        <div className="flex flex-wrap 2xl:flex-nowrap items-center gap-2 w-full">
          {/* Botón de trailer */}
          <Btn
            name="Ver trailer"
            onClick={() => onOpenTrailer?.(movie)}
            icon={<IoIosPlay size={20} />}
            className="w-full lg:text-base justify-center"
          />

          {/* Botones secundarios */}
          <div className="flex items-center gap-1.5 lg:gap-2">
            <AddListBtn
              movie={movie}
              className="shrink-0 hover:scale-105 lg:hover:scale-110 transition-transform"
              isFavorite={isFavorite}
            />
            <BtnInfo
              movie={movie}
              className="shrink-0 hover:scale-105 lg:hover:scale-110 transition-transform"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
