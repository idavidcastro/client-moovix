import { useState } from "react";
import { Star, Calendar } from "lucide-react";
import { IoIosPlay } from "react-icons/io";
import Card from "./CardMovie";
import Btn from "../atoms/Btn";
import AddListBtn from "../atoms/AddListBtn";
import BtnInfo from "../atoms/BtnInfo";

export default function MovieCardWithHover({ movie, onOpenTrailer }) {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.getFullYear();
  };

  return (
    <div
      className="relative group transition-transform duration-300 lg:hover:scale-125 lg:hover:z-30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Card movie={movie} variant="horizontal" />
        <span className="absolute bottom-2 right-2 opacity-60 text-primary text-[10px] font-bold  px-2 py-0.5 z-10 no-underline select-none">
          moovix
        </span>
      </div>

      {/* Hover content - solo visible en desktop (lg+) */}
      <div
        className={`hidden lg:block absolute left-0 right-0 bg-bg-secondary rounded-b-lg shadow-2xl transition-all duration-100 z-20 ${
          isHovered
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-[-10px] pointer-events-none"
        }`}
        style={{ top: "100%" }}
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
          <div className="flex items-center gap-2 w-full">
            {/* Botón de trailer */}
            <Btn
              name="Ver Trailer"
              onClick={() => onOpenTrailer?.(movie)}
              icon={<IoIosPlay size={18} />}
              className="flex-1 px-3 py-1.5 text-xs sm:text-sm gap-1 justify-center w-full"
            />

            {/* Botones secundarios */}
            <div className="flex items-center gap-1">
              <AddListBtn
                movie={movie}
                className="p-1.5 sm:p-2 shrink-0 hover:scale-110 transition-transform"
              />
              <BtnInfo
                movie={movie}
                className="p-1.5 sm:p-2 shrink-0 hover:scale-110 transition-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
