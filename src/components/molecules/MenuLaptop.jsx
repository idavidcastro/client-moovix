import { Star, Calendar } from "lucide-react";
import { IoIosPlay } from "react-icons/io";
import Btn from "../atoms/Btn";
import AddListBtn from "../atoms/AddListBtn";
import BtnInfo from "../atoms/BtnInfo";
import { useFavoriteMoviesStore } from "../../stores/favoriteMovies";

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
            className="w-full lg:text-md justify-center"
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
    // <div
    //   className={`hidden lg:block absolute left-0 right-0 bg-gradient-to-b from-bg-secondary/95 to-bg-secondary w-full rounded-b-2xl shadow-2xl backdrop-blur-md transition-all duration-200 z-20 border-t border-white/10 ${
    //     isVisible
    //       ? "opacity-100 translate-y-0"
    //       : "opacity-0 translate-y-[-8px] pointer-events-none"
    //   }`}
    //   style={{ top: "calc(100% - 8px)" }}
    // >
    //   <div className="p-4 space-y-4">
    //     {/* Encabezado */}
    //     <div>
    //       <h3 className="text-white font-semibold text-base mb-1 truncate">
    //         {movie.title}
    //       </h3>

    //       <div className="flex flex-wrap items-center gap-3 text-xs text-gray-300">
    //         {/* Rating */}
    //         <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-lg">
    //           <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
    //           <span className="font-medium">
    //             {movie.vote_average?.toFixed(1)}
    //           </span>
    //           <span className="text-gray-400 text-[11px]">
    //             ({movie.vote_count} votos)
    //           </span>
    //         </div>

    //         {/* Fecha */}
    //         <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-lg">
    //           <Calendar className="w-3.5 h-3.5 text-gray-300" />
    //           <span className="text-gray-300">
    //             {formatDate(movie.release_date)}
    //           </span>
    //         </div>
    //       </div>

    //       {/* Descripción */}
    //       <p className="text-xs text-gray-400 mt-2 leading-snug line-clamp-2 cursor-default">
    //         {movie.overview}
    //       </p>
    //     </div>

    //     {/* Botones */}
    //     <div className="flex flex-wrap xl:flex-nowrap items-center gap-2 w-full">
    //       {/* Botón principal */}
    //       <Btn
    //         name="Ver trailer"
    //         onClick={() => onOpenTrailer?.(movie)}
    //         icon={<IoIosPlay />}
    //         className="w-full justify-center text-sm font-medium tracking-wide bg-primary hover:bg-primary/90 transition-all rounded-lg py-2"
    //       />

    //       {/* Botones secundarios */}
    //       <div className="flex items-center gap-2">
    //         <AddListBtn
    //           movie={movie}
    //           className="shrink-0 p-2 rounded-full transition-all hover:scale-110"
    //           isFavorite={isFavorite}
    //         />
    //         <BtnInfo
    //           movie={movie}
    //           className="shrink-0 p-2 rounded-full transition-all hover:scale-110"
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
