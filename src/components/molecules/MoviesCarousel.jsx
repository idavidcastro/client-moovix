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
  variant = "vertical",
}) {
  const isHorizontal = variant === "horizontal";
  const swiperConfig = {
    slidesPerView: isHorizontal ? 2 : 3,
    breakpoints: isHorizontal
      ? {
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 4,
          },
        }
      : {
          640: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
          1280: {
            slidesPerView: 6,
          },
        },
  };

  if (loading) return <MoviesCarouselSkeleton variant={variant} />;
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
            Ver todos
          </a>
          <ChevronRight className="text-primary w-5 h-5 sm:w-8 sm:h-8 md:w-6 md:h-6" />
        </div>
      </div>
      <Swiper
        {...swiperConfig}
        navigation
        loop
        modules={[Navigation]}
        spaceBetween={8}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <CardMovie
              movie={movie}
              variant={variant}
              // className="lg:transition-transform lg:duration-300 lg:group-hover:scale-90 rounded-sm hover:rounded-sm"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
