import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import MovieInfo from "./MovieInfo";

export default function HeroCarousel({ movies, genreMap, onOpenTrailer }) {
  return (
    <section>
      <Swiper
        slidesPerView={1}
        centeredSlides
        loop={movies.length > 1}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        modules={[Pagination, Navigation, Autoplay]}
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="flex items-end justify-start w-full h-[40vh] sm:h-[40vh] lg:h-screen px-[5%] py-[10%] ">
              <img
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                    : "/vite.svg"
                }
                alt={movie.title}
                className="absolute inset-0 object-cover w-full h-full"
              />
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/100 to-transparent" />
              </div>

              <div className="z-20 w-full left-0 bottom-0 text-primary md:w-3/4">
                <MovieInfo
                  movie={movie}
                  genreMap={genreMap}
                  onOpenTrailer={onOpenTrailer}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
