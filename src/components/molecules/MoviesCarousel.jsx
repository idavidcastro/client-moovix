import { ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import CardMovie from "./CardMovie";
import MoviesCarouselSkeleton from "../skeletons/MoviesCarouselSkeleton";

export default function MoviesCarousel({
  title,
  link,
  movies = [],
  loading = false,
  error = null,
  variant = "vertical",
}) {
  const isHorizontal = variant === "horizontal";
  const swiperConfig = {
    slidesPerView: isHorizontal ? 2 : 3,
    breakpoints: isHorizontal
      ? {
          640: {
            // sm
            slidesPerView: 3,
          },
          768: {
            // md
            slidesPerView: 3,
          },
          1024: {
            // lg
            slidesPerView: 4,
          },
          1280: {
            // xl
            slidesPerView: 4,
          },
        }
      : {
          640: {
            // sm
            slidesPerView: 4,
          },
          768: {
            // md
            slidesPerView: 4,
          },
          1024: {
            // lg
            slidesPerView: 5,
          },
          1280: {
            // xl
            slidesPerView: 6,
          },
        },
  };

  if (loading) return <MoviesCarouselSkeleton variant={variant} />;
  if (error) return <p>Error 😢: {error.message || error}</p>;
  if (!movies || movies.length === 0) return null;

  return (
    <div className="relative">
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
      <Swiper
        {...swiperConfig}
        navigation
        loop
        modules={[Navigation]}
        spaceBetween={12}
        className="cursor-pointer px-2 sm:px-4 md:px-6"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <CardMovie
              movie={movie}
              variant={variant}
              className={
                isHorizontal
                  ? "h-[100px] xs:h-[120px] sm:h-[140px] md:h-[150px] lg:h-[160px] xl:h-[180px] 2xl:h-[200px]"
                  : "h-[200px] xs:h-[300px] sm:h-[300px] md:h-[350px] lg:h-[480px] xl:h-[480px] 2xl:h-[520px]"
              }
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
