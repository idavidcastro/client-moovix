import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import MovieInfo from "./MovieInfo";

export default function HeroCarousel({ movies, genreMap, onOpenTrailer }) {
  const navigate = useNavigate();

  const handleSlideClick = (movieId) => {
    if (window.innerWidth < 1024) {
      navigate(`/movie/${movieId}`);
    }
  };

  return (
    <section>
      <Swiper
        slidesPerView={1}
        centeredSlides
        loop={movies.length > 1}
        autoplay={{ delay: 100000, disableOnInteraction: false }}
        navigation
        modules={[Navigation, Autoplay]}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              className="flex items-end justify-start w-full h-[30vh] lg:h-screen px-[5%] lg:py-[10%] lg:cursor-default cursor-pointer"
              onClick={() => handleSlideClick(movie.id)}
            >
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

              <div className="z-20 w-auto text-primary lg:w-3/4">
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
