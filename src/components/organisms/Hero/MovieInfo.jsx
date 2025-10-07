import Btn from "../../atoms/Btn";
import AddListBtn from "../../atoms/AddListBtn";
import { FaStar } from "react-icons/fa";
import { IoIosPlay } from "react-icons/io";
import BtnInfo from "../../atoms/BtnInfo";

export default function MovieInfo({ movie, genreMap, onOpenTrailer }) {
  return (
    <div>
      <div className="flex items-center">
        <div className="flex items-center">
          <FaStar className="w-3 h-3 mr-1 text-yellow-400" />
          <span className="text-sm font-semibold text-yellow-400">
            {movie.vote_average?.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="relative group space-y-4">
        <h2 className="text-3xl text-primary md:text-5xl lg:text-6xl font-medium leading-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] cursor-pointer">
          {movie.title}
        </h2>
        <p className="max-w-lg text-sm md:text-base text-third/90  ">
          {movie.overview}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 items-center mt-5">
        <span className="text-sm text-bg font-bold bg-primary rounded-sm px-2 upercase">
          NUEVA PELÍCULA
        </span>
        {movie.genre_ids.map((id) => (
          <span
            key={id}
            className="px-3 py-1 text-xs rounded-md uppercase bg-primary/10 text-primary "
          >
            {genreMap.get(id) || "Desconocido"}{" "}
          </span>
        ))}
        <span className="text-sm text-primary font-extrabold">
          {movie.vote_count ? "+18" : ""}
        </span>
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
