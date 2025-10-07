import Btn from "../../atoms/Btn";
import AddListBtn from "../../atoms/AddListBtn";
import { FaStar } from "react-icons/fa";
import { IoIosPlay } from "react-icons/io";
import { AlertCircle } from "lucide-react";
import BtnInfo from "../../atoms/BtnInfo";

export default function MovieInfo({ movie, genreMap, onOpenTrailer }) {
  return (
    <div>
      <div className="flex items-center">
        <div className="flex items-center px-2 py-1 border rounded-md shadow-sm bg-primary/10 border-secondary">
          <FaStar className="w-3 h-3 mr-1 text-secondary" />
          <span className="text-xs font-semibold text-secondary">
            {movie.vote_average?.toFixed(1)}
          </span>
        </div>
        {/* 
        <div className="flex flex-col">
          <span className="text-xs tracking-wider uppercase text-secondary/80">
            {movie.release_date
              ? new Date(movie.release_date).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "Fecha N/A"}
          </span>
        </div> */}
      </div>

      <div className="relative group">
        <h2 className="text-3xl text-primary md:text-5xl lg:text-6xl font-medium leading-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] cursor-pointer">
          {movie.title}
        </h2>

        <p className="max-w-lg text-sm md:text-base text-third/90 opacity-0 translate-y-3 max-h-0 overflow-hidden transition-all duration-700 ease-in-out delay-100 group-hover:opacity-100 group-hover:translate-y-0 group-hover:max-h-[300px] group-hover:delay-0">
          {movie.overview}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {movie.genre_ids.map((id) => (
          <span
            key={id}
            className="px-3 py-1 text-xs border rounded-md uppercase bg-primary/10 text-primary border-primary/20 "
          >
            {" "}
            {genreMap.get(id) || "Desconocido"}{" "}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-6">
        <Btn
          name="Ver trailer"
          onClick={() => onOpenTrailer && onOpenTrailer(movie)}
          icon={<IoIosPlay size={24} />}
        />
        <AddListBtn movie={movie} />
        <BtnInfo movie={movie} />
      </div>
    </div>
  );
}
