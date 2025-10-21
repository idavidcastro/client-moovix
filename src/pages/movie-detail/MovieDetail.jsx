import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import {
  GET_MOVIE_CREDITS,
  GET_MOVIE_DETAILS,
  GET_MOVIE_IMAGES,
} from "../../lib/queries";
import { IoIosPlay } from "react-icons/io";
import Btn from "../../components/atoms/Btn";
import AddListBtn from "../../components/atoms/AddListBtn";
import { useFavoriteMoviesStore } from "../../stores/favoriteMovies";
import { useModal } from "../../hooks/useModal";
import TrailerModal from "../../components/organisms/Hero/TrailerModal";
import { useState } from "react";

export default function MovieDetail() {
  const [activeTab, setActiveTab] = useState("recomendados");

  const { id } = useParams();
  const { isOpen, openModal, closeModal } = useModal();
  const favoriteMovies = useFavoriteMoviesStore(
    (state) => state.favoriteMovies
  );

  console.log(isOpen, openModal, closeModal, favoriteMovies);

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

  const { data: imagesData } = useQuery(GET_MOVIE_IMAGES, {
    variables: { id },
  });

  const movie = detailsData?.movieDetails;
  const credits = creditsData?.movieCredits;
  const director = credits?.crew?.find((m) => m.job === "Director");
  console.log(director);

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

  const images = imagesData?.movieImages;
  const logo = images?.logos?.[0]?.file_path;
  console.log(logo);

  return (
    <div>
      <div className="relative w-full h-[30vh] sm:h-[40vh] lg:h-screen">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="h-full w-full object-cover"
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
      <div>
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
              {!logo ? (
                <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
              ) : null}

              <div className="flex items-center gap-3 mb-7">
                <Btn
                  name="Ver tráiler"
                  onClick={openModal}
                  icon={<IoIosPlay size={20} />}
                  className="px-4 py-3 w-full sm:w-auto"
                />
                <AddListBtn movie={movie} isFavorite={isFavorite} />
              </div>

              <div className="mb-8 space-y-4">
                <p className="text-third/90 leading-relaxed">
                  {movie.overview}
                </p>
                <div className="flex items-center gap-2 text-primary mb-6">
                  <span className="px-1 border border-gray-500/60 rounded-sm text-xs font-semibold">
                    {movie.adult ? "+18" : "TODOS"}
                  </span>
                  <span>·</span>
                  <span className="text-xs">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                  <span>·</span>
                  <span className="text-xs">{movie.runtime} min</span>
                  <span>·</span>

                  {/* Puntuación mejorada */}
                  <div className="flex items-center  bg-gray-500/60 px-2 rounded-sm">
                    <span className="text-xs font-semibold text-primary">
                      {movie.vote_average ? movie.vote_average : "N/A"}
                    </span>
                  </div>
                </div>
                {movie.genres && movie.genres.length > 0 && (
                  <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                      {movie.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="text-xs sm:text-sm text-bg font-bold bg-primary rounded-sm px-2 uppercase"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Info adicional */}
              <div className="flex flex-wrap gap-4 text-third/90 mb-6">
                <span>
                  <strong>Dirección: </strong>{" "}
                  {director?.name || "No disponible"}
                </span>
                <span>
                  <strong>Idioma: </strong>
                  {movie.spoken_languages?.[0]?.name || "Desconocido"}
                </span>
              </div>

              {/* Géneros */}

              <div className="mt-8">
                {/* Estado para controlar el tab activo */}
                <div className="flex border-b border-gray-700">
                  {["recomendados", "detalle", "reparto"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 text-sm font-semibold uppercase transition-colors ${
                        activeTab === tab
                          ? "text-primary border-b-2 border-primary"
                          : "text-gray-400 hover:text-primary"
                      }`}
                    >
                      {tab === "recomendados"
                        ? "Recomendados"
                        : tab === "detalle"
                        ? "Detalle"
                        : "Reparto"}
                    </button>
                  ))}
                </div>
                <div className="mt-6">
                  {activeTab === "recomendados" && (
                    <div>
                      <h1 className="text-2xl font-bold text-primary">
                        Recomendado
                      </h1>
                    </div>
                  )}

                  {activeTab === "detalle" && (
                    <div className="space-y-10">
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
                          <h2 className="text-2xl font-semibold mb-2">
                            Idiomas Hablados
                          </h2>
                          <ul className="list-disc ml-6 text-gray-300">
                            {movie.spoken_languages.map((lang, i) => (
                              <li key={i}>{lang.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "reparto" && (
                    <div>
                      {credits?.cast?.length > 0 ? (
                        <>
                          <h2 className="text-2xl font-semibold mb-4">
                            Reparto principal
                          </h2>
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
                                <p className="text-sm text-gray-400">
                                  {actor.character}
                                </p>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <p>No hay datos del reparto.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TrailerModal isOpen={isOpen} closeModal={closeModal} movie={movie} />
    </div>
    // <div className="relative text-white">
    //   {/* Imagen de fondo con overlay */}
    //   <div className="relative w-full h-[30vh] sm:h-[40vh] lg:h-screen">
    //     <img
    //       src={
    //         movie.backdrop_path
    //           ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    //           : "/vite.svg"
    //       }
    //       alt={movie.title}
    //       className="object-cover w-full h-full"
    //     />
    //     <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-bg-secondary/90 to-transparent" />
    //     <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-bg-secondary/90 to-transparent" />

    //     {/* Logo sobre el backdrop */}
    //     {logo ? (
    //       <div className="absolute inset-x-0 bottom-0 z-20 px-[5%] lg:px-[10%] pb-4 sm:pb-6 w-60 h-30 md:w-96 md:h-70 flex items-end">
    //         <img
    //           src={`https://image.tmdb.org/t/p/w500${logo}`}
    //           alt={movie.title}
    //           className="w-auto h-full object-contain"
    //           loading="lazy"
    //         />
    //       </div>
    //     ) : null}
    //   </div>

    // {/* Contenido principal */}
    // <div className="relative z-20 px-[5%] lg:px-[10%] pt-4 space-y-10">
    //   {/* Encabezado */}
    //   <div className="flex flex-col lg:flex-row gap-8">
    //     {/* Poster */}
    //     <div className="w-[300px] flex-shrink-0 hidden md:block">
    //       <img
    //         src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    //         alt={movie.title}
    //         className="w-full rounded-lg shadow-2xl"
    //       />
    //     </div>

    //     {/* Info básica */}
    //     <div className="flex-1">
    //       {/* Título (si no hay logo) */}
    //       {!logo ? (
    //         <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
    //       ) : null}

    //       <div className="flex items-center gap-3 mb-7">
    //         <Btn
    //           name="Ver tráiler"
    //           onClick={openModal}
    //           icon={<IoIosPlay size={20} />}
    //           className="px-4 py-3 w-full sm:w-auto"
    //         />
    //         <AddListBtn movie={movie} isFavorite={isFavorite} />
    //       </div>

    //       <div className="mb-8 space-y-4">
    //         <p className="text-third/90 leading-relaxed">{movie.overview}</p>
    //         <div className="flex items-center gap-2 text-primary mb-6">
    //           <span className="px-1 border border-gray-500/60 rounded-sm text-xs font-semibold">
    //             {movie.adult ? "+18" : "TODOS"}
    //           </span>
    //           <span>·</span>
    //           <span className="text-xs">
    //             {new Date(movie.release_date).getFullYear()}
    //           </span>
    //           <span>·</span>
    //           <span className="text-xs">{movie.runtime} min</span>
    //           <span>·</span>

    //           {/* Puntuación mejorada */}
    //           <div className="flex items-center  bg-gray-500/60 px-2 rounded-sm">
    //             <span className="text-xs font-semibold text-primary">
    //               {movie.vote_average ? movie.vote_average : "N/A"}
    //             </span>
    //           </div>
    //         </div>
    //         {movie.genres && movie.genres.length > 0 && (
    //           <div className="mb-8">
    //             <div className="flex flex-wrap gap-2">
    //               {movie.genres.map((genre) => (
    //                 <span
    //                   key={genre.id}
    //                   className="text-xs sm:text-sm text-bg font-bold bg-primary rounded-sm px-2 uppercase"
    //                 >
    //                   {genre.name}
    //                 </span>
    //               ))}
    //             </div>
    //           </div>
    //         )}
    //       </div>

    //       {/* Info adicional */}
    //       <div className="flex flex-wrap gap-4 text-third/90 mb-6">
    //         <span>
    //           <strong>Dirección: </strong> {director?.name || "No disponible"}
    //         </span>
    //         <span>
    //           <strong>Idioma: </strong>
    //           {movie.spoken_languages?.[0]?.name || "Desconocido"}
    //         </span>
    //       </div>

    //       {/* Géneros */}
    //     </div>
    //   </div>

    //   {/* Información extendida */}
    //   <div className="border-t border-gray-700 pt-8 space-y-10">
    //     {/* Datos financieros */}
    //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    //       <div>
    //         <h3 className="font-semibold text-lg mb-1">Presupuesto</h3>
    //         <p className="text-gray-300">
    //           ${movie.budget?.toLocaleString("en-US") || "N/D"}
    //         </p>
    //       </div>
    //       <div>
    //         <h3 className="font-semibold text-lg mb-1">Ingresos</h3>
    //         <p className="text-gray-300">
    //           ${movie.revenue?.toLocaleString("en-US") || "N/D"}
    //         </p>
    //       </div>
    //       <div>
    //         <h3 className="font-semibold text-lg mb-1">Popularidad</h3>
    //         <p className="text-gray-300">{movie.popularity}</p>
    //       </div>
    //     </div>

    //     {/* Compañías de producción */}
    //     {movie.production_companies?.length > 0 && (
    //       <div>
    //         <h2 className="text-2xl font-semibold mb-4">
    //           Compañías de Producción
    //         </h2>
    //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    //           {movie.production_companies.map((p) => (
    //             <div
    //               key={p.id}
    //               className="flex items-center gap-3 bg-gray-900 p-3 rounded-lg"
    //             >
    //               {p.logo_path && (
    //                 <img
    //                   src={`https://image.tmdb.org/t/p/w200${p.logo_path}`}
    //                   alt={p.name}
    //                   className="w-16 h-16 object-contain"
    //                 />
    //               )}
    //               <div>
    //                 <p className="font-semibold">{p.name}</p>
    //                 <p className="text-sm text-gray-400">
    //                   País: {p.origin_country}
    //                 </p>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     )}

    //     {/* Países de producción */}
    //     {movie.production_countries?.length > 0 && (
    //       <div>
    //         <h2 className="text-2xl font-semibold mb-2">
    //           Países de Producción
    //         </h2>
    //         <ul className="list-disc ml-6 text-gray-300">
    //           {movie.production_countries.map((p, i) => (
    //             <li key={i}>{p.name}</li>
    //           ))}
    //         </ul>
    //       </div>
    //     )}

    //     {/* Idiomas hablados */}
    //     {movie.spoken_languages?.length > 0 && (
    //       <div>
    //         <h2 className="text-2xl font-semibold mb-2">Idiomas Hablados</h2>
    //         <ul className="list-disc ml-6 text-gray-300">
    //           {movie.spoken_languages.map((lang, i) => (
    //             <li key={i}>{lang.name}</li>
    //           ))}
    //         </ul>
    //       </div>
    //     )}

    //     {/* Reparto principal */}
    //     {credits?.cast?.length > 0 && (
    //       <div>
    //         <h2 className="text-2xl font-semibold mb-4">Reparto principal</h2>
    //         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
    //           {credits.cast.slice(0, 10).map((actor) => (
    //             <div
    //               key={actor.id}
    //               className="flex flex-col items-center text-center"
    //             >
    //               <img
    //                 src={
    //                   actor.profile_path
    //                     ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
    //                     : "/placeholder.jpg"
    //                 }
    //                 alt={actor.name}
    //                 className="w-24 h-24 object-cover rounded-full mb-2"
    //               />
    //               <p className="font-semibold">{actor.name}</p>
    //               <p className="text-sm text-gray-400">{actor.character}</p>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>

    //   {/* Modal del tráiler */}
    //   <TrailerModal open={isOpen} onClose={closeModal} movie={movie} />
    // </div>
  );
}
