import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { GET_MOVIE_CREDITS, GET_MOVIE_DETAILS } from "../../lib/queries";
import { IoIosPlay } from "react-icons/io";
import Btn from "../../components/atoms/Btn";
import AddListBtn from "../../components/atoms/AddListBtn";
import { useFavoriteMoviesStore } from "../../stores/favoriteMovies";
import { useModal } from "../../hooks/useModal";
import TrailerModal from "../../components/organisms/Hero/TrailerModal";

export default function MovieDetail() {
  const { id } = useParams();
  const { isOpen, openModal, closeModal } = useModal();
  const favoriteMovies = useFavoriteMoviesStore(
    (state) => state.favoriteMovies
  );

  const {
    data: detailsData,
    loading: loadingDetails,
    error: errorDetails,
  } = useQuery(GET_MOVIE_DETAILS, { variables: { id } });

  const {
    data: creditsData,
    loading: loadingCredits,
    error: errorCredits,
  } = useQuery(GET_MOVIE_CREDITS, { variables: { id } });

  const movie = detailsData?.movieDetails;
  const credits = creditsData?.movieCredits;
  const director = credits?.crew?.find((m) => m.job === "Director");

  if (loadingDetails || loadingCredits)
    return <div className="text-center py-8">Cargando...</div>;

  if (errorDetails || errorCredits)
    return (
      <div className="text-center py-8 text-red-500">
        Error al cargar la película.
      </div>
    );

  if (!movie)
    return <div className="text-center py-8">Película no encontrada.</div>;

  const isFavorite = favoriteMovies.some((fav) => fav.id === movie.id);

  return (
    <div className="relative min-h-screen text-white">
      {/* Imagen de fondo con overlay */}
      <div className="relative w-full h-[30vh] sm:h-[40vh] lg:h-screen">
        <img
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : "/vite.svg"
          }
          alt={movie.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-bg-secondary/90 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-bg-secondary/90 to-transparent" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-20 px-[5%] lg:px-[10%] pt-4 space-y-10">
        {/* Encabezado */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <div className="w-[300px] flex-shrink-0 hidden md:block">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>

          {/* Info básica */}
          <div className="flex-1">
            {/* Título */}
            <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>

            <div className="flex items-center gap-4 text-gray-300 mb-6">
              <span className="px-2 py-1 border border-gray-600 rounded text-sm font-semibold">
                {movie.adult ? "+18" : "TP"}
              </span>

              <span className="text-sm">
                {new Date(movie.release_date).getFullYear()}
              </span>
              <span>·</span>
              <span className="text-sm">{movie.runtime} min</span>
              <span>·</span>

              {/* Puntuación mejorada */}
              <div className="flex items-center gap-2 bg-gray-800/60 px-2.5 py-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#facc15"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="none"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.347l5.518.4a.563.563 0 01.318.987l-4.193 3.74a.563.563 0 00-.182.557l1.248 5.37a.563.563 0 01-.834.61l-4.708-2.803a.563.563 0 00-.586 0l-4.708 2.803a.563.563 0 01-.834-.61l1.248-5.37a.563.563 0 00-.182-.557L3.044 10.34a.563.563 0 01.318-.987l5.518-.4a.563.563 0 00.475-.347L11.48 3.5z"
                  />
                </svg>

                <span className="text-sm font-semibold text-primary">
                  {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                </span>
              </div>
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="text-sm sm:text-sm text-bg font-bold bg-primary rounded-sm px-2 uppercase"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 mb-8">
              <Btn
                name="Ver tráiler"
                onClick={openModal}
                icon={<IoIosPlay size={20} />}
                className="px-4 py-3 w-full sm:w-auto"
              />
              <AddListBtn movie={movie} isFavorite={isFavorite} />
            </div>

            <div className="mb-8 space-y-2  ">
              <p className="text-third/90 leading-relaxed">{movie.overview}</p>
            </div>

            {/* Info adicional */}
            <div className="flex flex-wrap gap-4 text-third/90 mb-6">
              <span>
                <strong>Dirección: </strong> {director?.name || "No disponible"}
              </span>
              <span>
                <strong>Idioma: </strong>
                {movie.spoken_languages?.[0]?.name || "Desconocido"}
              </span>
            </div>

            {/* Géneros */}
          </div>
        </div>

        {/* Información extendida */}
        <div className="border-t border-gray-700 pt-8 space-y-10">
          {/* Datos financieros */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-1">Presupuesto</h3>
              <p className="text-gray-300">
                ${movie.budget?.toLocaleString("en-US") || "N/D"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Ingresos</h3>
              <p className="text-gray-300">
                ${movie.revenue?.toLocaleString("en-US") || "N/D"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Popularidad</h3>
              <p className="text-gray-300">{movie.popularity}</p>
            </div>
          </div>

          {/* Compañías de producción */}
          {movie.production_companies?.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Compañías de Producción
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {movie.production_companies.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 bg-gray-900 p-3 rounded-lg"
                  >
                    {p.logo_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${p.logo_path}`}
                        alt={p.name}
                        className="w-16 h-16 object-contain"
                      />
                    )}
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-sm text-gray-400">
                        País: {p.origin_country}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Países de producción */}
          {movie.production_countries?.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Países de Producción
              </h2>
              <ul className="list-disc ml-6 text-gray-300">
                {movie.production_countries.map((p, i) => (
                  <li key={i}>{p.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Idiomas hablados */}
          {movie.spoken_languages?.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-2">Idiomas Hablados</h2>
              <ul className="list-disc ml-6 text-gray-300">
                {movie.spoken_languages.map((lang, i) => (
                  <li key={i}>{lang.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Reparto principal */}
          {credits?.cast?.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Reparto principal</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {credits.cast.slice(0, 10).map((actor) => (
                  <div
                    key={actor.id}
                    className="flex flex-col items-center text-center"
                  >
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                          : "/placeholder.jpg"
                      }
                      alt={actor.name}
                      className="w-24 h-24 object-cover rounded-full mb-2"
                    />
                    <p className="font-semibold">{actor.name}</p>
                    <p className="text-sm text-gray-400">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal del tráiler */}
      <TrailerModal open={isOpen} onClose={closeModal} movie={movie} />
    </div>
  );
}
