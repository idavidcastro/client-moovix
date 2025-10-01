import { useQuery } from "@apollo/client/react";
import { GET_POPULAR_MOVIES } from "../../lib/queries";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

export default function Hero() {
  const { loading, error, data } = useQuery(GET_POPULAR_MOVIES);
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error 😢: {error.message}</p>;

  return (
    <div>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        slidesPerView={1}
        centeredSlides
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        loop
        pagination={{ clickable: true }}
        navigation
        modules={[Pagination, Navigation, Autoplay]}
      >
        {data.popularMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative h-screen w-full">
              {/* Imagen de fondo */}
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
                <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

              {/* CONTENIDO (titulo, botones) */}
              <div className="absolute left-6 md:left-16 bottom-20 md:bottom-28 z-20 text-white max-w-xl">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
                  {movie.title}
                </h2>
                <p className="mt-4 text-sm md:text-base text-white/90 line-clamp-3 max-w-lg">
                  {movie.overview}
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <button className="flex items-center gap-3 bg-white text-black px-5 py-3 rounded-md font-semibold shadow-md">
                    ► Ver ahora
                  </button>
                  <button className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                    +
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
