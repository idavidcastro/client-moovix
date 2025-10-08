import Btn from "../../atoms/Btn";
import AddListBtn from "../../atoms/AddListBtn";
import { FaStar } from "react-icons/fa";
import { IoIosPlay } from "react-icons/io";
import BtnInfo from "../../atoms/BtnInfo";

export default function MovieInfo({ movie, genreMap, onOpenTrailer }) {
  return (
    <>
      <div className="flex items-center">
        <div className="flex items-center">
          <FaStar className="w-2 h-2 sm:w-3 sm:h-3 mr-1 text-yellow-400" />
          <span className="text-xs sm:text-sm font-semibold text-yellow-400">
            {movie.vote_average?.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="relative group space-y-2 sm:space-y-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-primary font-medium leading-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] cursor-pointer">
          {movie.title}
        </h2>
        <p className="hidden lg:block max-w-lg text-xs sm:text-sm md:text-base lg:text-lg text-third/90 overflow-hidden">
          {movie.overview}
        </p>
      </div>
      <div className="flex flex-wrap gap-1 sm:gap-2 items-center mt-3 sm:mt-5">
        <span className="text-xs sm:text-sm text-bg font-bold bg-primary rounded-sm px-2 upercase">
          NUEVA PELÍCULA
        </span>
        {movie.genre_ids.map((id) => (
          <span
            key={id}
            className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-md uppercase bg-primary/10 text-primary "
          >
            {genreMap.get(id) || "Desconocido"}{" "}
          </span>
        ))}
        <span className="text-xs sm:text-sm text-primary font-extrabold">
          {movie.vote_count ? "+18" : ""}
        </span>
      </div>
      <div className="hidden lg:flex items-center gap-4 mt-6">
        <Btn
          name="Ver trailer"
          onClick={() => onOpenTrailer && onOpenTrailer(movie)}
          icon={<IoIosPlay size={24} />}
        />
        <AddListBtn movie={movie} />
        <BtnInfo movie={movie} />
      </div>
    </>
  );
}
