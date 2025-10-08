import { useQuery } from "@apollo/client/react";
import { ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import CardMovie from "./CardMovie";
import CardMovieHorizontal from "./CardMovieHorizontal";

export default function MoviesCarousel({
  title,
  link,
  query,
  variant = "vertical",
}) {
  const { loading, error, data } = useQuery(query);
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error 😢: {error.message}</p>;

  const isHorizontal = variant === "horizontal";
  const movies = data[Object.keys(data)[0]];

  const swiperConfig = {
    slidesPerView: isHorizontal ? 2 : 3,
    breakpoints: isHorizontal
      ? {
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }
      : {
          640: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        },
  };

  return (
    <section id="rated" className="relative">
      <div className="flex items-center justify-between px-[5%] mb-2 sm:mb-3">
        <h2 className="text-primary text-lg sm:text-xl md:text-2xl font-bold">
          {title}
        </h2>
        <div className="flex items-center cursor-pointer">
          <a
            href={link}
            className="text-primary text-base sm:text-lg md:text-xl font-bold text-center"
          >
            Ver más
          </a>
          <ChevronRight className="text-primary w-5 h-5 sm:w-8 sm:h-8 md:w-6 md:h-6" />
        </div>
      </div>
      <div className="pointer-events-none absolute top-0 left-0 h-full w-16 z-20 hidden md:block">
        <div className="h-full w-full bg-gradient-to-r from-black/100 to-transparent" />
      </div>
      <div className="pointer-events-none absolute top-0 right-0 h-full w-16 z-10 hidden md:block">
        <div className="h-full w-full bg-gradient-to-l from-black/60 to-transparent" />
      </div>
      <Swiper
        style={{
          "--swiper-navigation-color": "white",
          "--swiper-navigation-size": "20px",
        }}
        {...swiperConfig}
        navigation
        loop
        modules={[Navigation]}
        spaceBetween={10}
        className="cursor-pointer px-2 sm:px-4 md:px-6"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            {isHorizontal ? (
              <CardMovieHorizontal
                movie={movie}
                className="h-[110px] md:h-[150px] lg:h-[200px]"
              />
            ) : (
              <CardMovie
                movie={movie}
                className="h-[200px] md:h-[340px] lg:h-[520px]"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
