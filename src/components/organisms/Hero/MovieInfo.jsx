import Btn from "../../atoms/Btn";
import AddListBtn from "../../atoms/AddListBtn";
import { FaStar } from "react-icons/fa";
import { IoIosPlay } from "react-icons/io";
import BtnInfo from "../../atoms/BtnInfo";
import { useFavoriteMoviesStore } from "../../../stores/favoriteMovies";
import { useQuery } from "@apollo/client/react";
import { GET_MOVIE_IMAGES } from "../../../lib/queries";

export default function MovieInfo({ movie, genreMap, onOpenTrailer }) {
  const favoriteMovies = useFavoriteMoviesStore(
    (state) => state.favoriteMovies
  );

  const isFavorite = favoriteMovies.some((fav) => fav.id === movie.id);

  // Obtener logos del TMDB para este movie.id
  const { data: imagesData } = useQuery(GET_MOVIE_IMAGES, {
    variables: { id: movie.id },
    skip: !movie?.id,
  });
  const logoPath = imagesData?.movieImages?.logos?.[0]?.file_path;

  return (
    <div>
      <div className="relative">
        <div className="w-60 h-30 md:w-96 md:h-70 flex items-end">
          <img
            src={`https://image.tmdb.org/t/p/w500${logoPath}`}
            alt={`${movie.title} logo`}
            className="w-auto max-h-full object-contain"
            loading="lazy"
          />
        </div>
        <div className="hidden lg:block max-w-xl">
          <p className="font-noto font-bold text-lg text-third/90 mt-4 line-clamp-4">
            {movie.overview}
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-wrap gap-1 sm:gap-2 items-center mt-3 sm:mt-5">
        <span className="text-xs sm:text-sm text-bg font-bold bg-primary rounded-sm px-2 uppercase">
          NUEVA PELÍCULA
        </span>
        {movie.genre_ids.map((id) => (
          <span
            key={id}
            className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-md uppercase bg-primary/10 text-primary "
          >
            {genreMap.get(id) || "Desconocido"}
          </span>
        ))}
        <span className="text-xs sm:text-sm text-primary font-extrabold">
          {movie.adult ? "+18" : ""}
        </span>
      </div>

      <div className="hidden lg:flex items-center gap-4 mt-6">
        <Btn
          name="Ver trailer"
          onClick={() => onOpenTrailer && onOpenTrailer(movie)}
          icon={<IoIosPlay size={24} />}
          className="px-3 py-4 text-xs sm:text-lg justify-center"
        />

        <AddListBtn movie={movie} isFavorite={isFavorite} />

        <BtnInfo movie={movie} />
      </div>
    </div>
  );
}
