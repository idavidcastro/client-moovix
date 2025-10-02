import { useQuery } from "@apollo/client/react";
import { GET_POPULAR_MOVIES } from "../../lib/queries";
import { ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "./custom.css";
export default function Rated() {
  const { loading, error, data } = useQuery(GET_POPULAR_MOVIES);
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error 😢: {error.message}</p>;
  return (
    <section id="rated" className="relative">
      <div className="flex  items-center justify-between px-20 mt-12 mb-2">
        <h2 className="text-primary text-xl font-bold text-center">
          Rated movies
        </h2>
        <div className="flex    ">
          <a href="#" className="text-primary text-xl font-bold text-center">
            Ver más
          </a>
          <ChevronRight strokeWidth={1} />
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
          "--swiper-navigation-size": "30px",
        }}
        slidesPerView={6}
        navigation
        loop
        modules={[Navigation]}
        spaceBetween={10}
        className="cursor-pointer z-50"
      >
        {data.popularMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                className="object-cover h-full w-full rounded-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
