import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import {
  GET_MOVIE_CREDITS,
  GET_MOVIE_DETAILS,
  GET_MOVIE_IMAGES,
  GET_MOVIE_REVIEWS,
  GET_MOVIE_SIMILAR,
} from "../../lib/queries";
import { IoIosPlay } from "react-icons/io";
import Btn from "../../components/Btn";
import AddListBtn from "../../components/AddListBtn";
import { useFavoriteMoviesStore } from "../../stores/favoriteMovies";
import { useModal } from "../../hooks/useModal";
import TrailerModal from "../home/components/TrailerModal";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import CardMovie from "../../components/CardMovie";

export default function MovieDetail() {
  const { id } = useParams();
  const { isOpen, openModal, closeModal } = useModal();
  const favoriteMovies = useFavoriteMoviesStore(
    (state) => state.favoriteMovies
  );

  const { data: detailsData, loading: loadingDetails } = useQuery(
    GET_MOVIE_DETAILS,
    { variables: { id } }
  );

  const { data: creditsData, loading: loadingCredits } = useQuery(
    GET_MOVIE_CREDITS,
    { variables: { id } }
  );

  const { data: imagesData } = useQuery(GET_MOVIE_IMAGES, {
    variables: { id },
  });

  const { data: similarData, loading: loadingSimilar } = useQuery(
    GET_MOVIE_SIMILAR,
    { variables: { id } }
  );

  const {
    data: reviewsData,
    loading: loadingReviews,
    error: errorReviews,
  } = useQuery(GET_MOVIE_REVIEWS, {
    variables: { id },
  });

  const similarMovies = similarData?.movieSimilar || [];

  const movie = detailsData?.movieDetails;
  const credits = creditsData?.movieCredits;
  const director = credits?.crew?.find((m) => m.job === "Director");
  const reviews = reviewsData?.movieReviews ?? [];

  const [activeTab, setActiveTab] = useState("similares");
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);

  if (loadingDetails || loadingCredits)
    return <div className="text-center py-8">Cargando...</div>;

  if (!movie)
    return <div className="text-center py-8">Película no encontrada.</div>;

  const isFavorite = favoriteMovies.some((fav) => fav.id === movie.id);

  const images = imagesData?.movieImages;
  const logo = images?.logos?.[0]?.file_path;

  return (
    <div>
      <div className="relative w-full h-[30vh] sm:h-[30vh]">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="h-full w-full object-cover filter brightness-60 lg:brightness-30"
        />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-bg-secondary/90 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-bg-secondary/90 to-transparent" />

        {logo ? (
          <div className="lg:hidden absolute inset-x-0 bottom-0 w-60 h-30 md:w-100 md:h-60 ml-[5%]">
            <img
              src={`https://image.tmdb.org/t/p/w500${logo}`}
              alt={movie.title}
              className="w-auto h-full object-contain"
              loading="lazy"
            />
          </div>
        ) : null}
      </div>

      {/* Contenido principal */}
      <div className="relative z-20 px-[5%] lg:px-[10%] pt-4 space-y-10">
        {/* Encabezado */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <div className="w-[300px] flex-shrink-0 hidden lg:block">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>

          {/* Info básica */}
          <div className="flex-1">
            {/* Título (si no hay logo) */}
            <h1 className="hidden lg:block text-5xl font-bold mb-6 cursor-default text-primary">
              {movie.title}
            </h1>

            <div className="flex items-center gap-3 mb-7">
              <Btn
                name="Ver tráiler"
                onClick={openModal}
                icon={<IoIosPlay size={20} />}
                className="px-10 py-3 w-full sm:w-auto"
              />
              <AddListBtn movie={movie} isFavorite={isFavorite} />
            </div>

            <div className="mb-8 space-y-6">
              <p
                className={`text-primary/90 font-bold text-sm md:text-lg leading-tight cursor-pointer transition-all ${
                  isOverviewExpanded ? "" : "line-clamp-4"
                }`}
                onClick={() => setIsOverviewExpanded(!isOverviewExpanded)}
              >
                {movie.overview}
              </p>
              <div className="flex items-center gap-6 text-primary text-xs md:text-sm cursor-default">
                <span className="px-1 border border-primary rounded-sm text-xs font-semibold">
                  {movie.adult ? "+18" : "TODOS"}
                </span>
                <span className="text-third font-bold">
                  {new Date(movie.release_date).getFullYear()}
                </span>
                <span className="text-third font-bold">
                  {movie.runtime} min
                </span>

                {/* Puntuación mejorada */}
                <div className="flex items-center bg-third/30 px-2 rounded-sm">
                  <span className="font-semibold text-primary">
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
                        className="text-xs md:text-sm text-bg-secondary font-bold bg-primary rounded-sm px-1 uppercase cursor-default"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Info adicional */}
            <div className="flex flex-wrap gap-4 text-primary text-sm md:text-base cursor-default">
              <span>
                <strong>Dirección: </strong> {director?.name || "No disponible"}
              </span>
              <span>
                <strong>Idioma: </strong>
                {movie.spoken_languages?.[0]?.name || "Desconocido"}
              </span>
            </div>

            <div className="mt-8">
              {/* Estado para controlar el tab activo */}
              <div className="flex gap-4">
                {["similares", "detalles", "reseñas"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 text-sm md:text-base font-semibold transition-colors cursor-pointer ${
                      activeTab === tab
                        ? "text-primary border-b-1 border-primary"
                        : "text-third hover:text-primary"
                    }`}
                  >
                    {tab === "similares"
                      ? "Similares"
                      : tab === "detalles"
                      ? "Detalles"
                      : "Reseñas"}
                  </button>
                ))}
              </div>
              <div className="mt-6">
                {activeTab === "similares" && (
                  <div className="">
                    <h2 className="text-xl  font-bold text-primary mb-4">
                      Películas Similares
                    </h2>

                    {loadingSimilar ? (
                      <p>Cargando...</p>
                    ) : similarMovies.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {similarMovies.slice(0, 10).map((movie) => (
                          <div key={movie.id} className="text-center">
                            <CardMovie key={movie.id} movie={movie} />

                            <p className="mt-2 text-base font-bold text-primary truncate cursor-default">
                              {movie.title}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No hay películas similares disponibles.</p>
                    )}
                  </div>
                )}

                {activeTab === "detalles" && (
                  <div className="space-y-8 cursor-default">
                    {/* Compañías de producción */}
                    {movie.production_companies?.length > 0 && (
                      <section>
                        <h2 className="text-lg font-bold text-primary mb-4 cursor-default">
                          Compañías de Producción
                        </h2>
                        <p className="text-third text-sm md:text-base cursor-default">
                          {movie.production_companies?.length > 0
                            ? movie.production_companies
                                .map((p) => p.name)
                                .join(", ")
                            : "No hay compañías registradas."}
                        </p>
                      </section>
                    )}
                    {/* Países de producción */}
                    {movie.production_countries?.length > 0 && (
                      <section>
                        <h2 className="text-lg font-bold text-primary mb-4">
                          Países de Producción
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          {movie.production_countries.map((p, i) => (
                            <span
                              key={i}
                              className="px-4 py-1.5 bg-bg rounded-sm text-primary text-xs"
                            >
                              {p.name}
                            </span>
                          ))}
                        </div>
                      </section>
                    )}
                    {/* Idiomas hablados */}
                    {movie.spoken_languages?.length > 0 && (
                      <section>
                        <h2 className="text-lg font-bold text-primary mb-4">
                          Idiomas Hablados
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          {movie.spoken_languages.map((lang, i) => (
                            <span
                              key={i}
                              className="px-4 py-1.5 bg-bg rounded-sm text-gray-300 text-xs"
                            >
                              {lang.name}
                            </span>
                          ))}
                        </div>
                      </section>
                    )}
                    <section>
                      {credits?.cast?.length > 0 ? (
                        <>
                          <h2 className="text-lg font-bold text-primary mb-4">
                            Reparto Principal
                          </h2>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {credits.cast.slice(0, 10).map((actor) => (
                              <div
                                key={actor.id}
                                className=" cursor-pointer flex flex-col items-center text-center bg-bg/60 p-4 rounded-2xl border border-transparent transition-all duration-300 hover:shadow-primary/10 hover:border-primary/40"
                              >
                                <img
                                  src={
                                    actor.profile_path
                                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                      : "/placeholder.jpg"
                                  }
                                  alt={actor.name}
                                  className="w-24 h-24 object-cover rounded-full mb-3 border border-gray-700/50"
                                />
                                <p className="font-semibold text-primary text-base">
                                  {actor.name}
                                </p>
                                <p className="text-sm text-third">
                                  {actor.character}
                                </p>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <p className="text-gray-400">
                          No hay datos del reparto.
                        </p>
                      )}
                    </section>
                  </div>
                )}

                {activeTab === "reseñas" && (
                  <div className="mt-12">
                    <h2 className="text-2xl font-semibold mb-4 text-white">
                      Reseñas
                    </h2>

                    {loadingReviews && (
                      <p className="text-gray-400">Cargando reseñas...</p>
                    )}
                    {errorReviews && (
                      <p className="text-red-500">
                        Error al cargar las reseñas.
                      </p>
                    )}

                    {reviews.length > 0 ? (
                      <div className="space-y-6">
                        {reviews.map((review) => {
                          const avatar =
                            review.author_details?.avatar_path &&
                            (review.author_details.avatar_path.startsWith(
                              "/https"
                            )
                              ? review.author_details.avatar_path.slice(1)
                              : `https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`);

                          return (
                            <div
                              key={review.id}
                              className="bg-gray-900/60 p-4 rounded-2xl border border-gray-800 shadow-md"
                            >
                              <div className="flex items-center gap-3 mb-3">
                                {avatar ? (
                                  <img
                                    src={avatar}
                                    alt={review.author}
                                    className="w-10 h-10 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm text-gray-300">
                                    {review.author[0]}
                                  </div>
                                )}

                                <div>
                                  <p className="font-semibold text-white">
                                    {review.author}
                                  </p>
                                  {review.author_details?.rating && (
                                    <p className="text-yellow-400 text-sm">
                                      ⭐ {review.author_details.rating}/10
                                    </p>
                                  )}
                                </div>
                              </div>

                              <p className="text-gray-300 text-sm leading-relaxed">
                                {review.content.length > 600
                                  ? review.content.slice(0, 600) + "..."
                                  : review.content}
                              </p>

                              <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                                <span>
                                  {new Date(
                                    review.created_at
                                  ).toLocaleDateString("es-ES", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                                <a
                                  href={review.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-secondary hover:underline"
                                >
                                  Ver más →
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-gray-400 text-center">
                        No hay reseñas disponibles para esta película.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <TrailerModal open={isOpen} onClose={closeModal} movie={movie} />
    </div>
  );
}
