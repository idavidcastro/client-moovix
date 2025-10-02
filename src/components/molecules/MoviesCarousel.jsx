import { useQuery } from "@apollo/client/react";
import { ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import CardMovie from "./CardMovie";
export default function MoviesCarousel({ title, link, query }) {
  const { loading, error, data } = useQuery(query);
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error 😢: {error.message}</p>;
  return (
    <section id="rated" className="relative">
      <div className="flex items-center justify-between px-20 mt-12 mb-3">
        <h2 className="text-primary text-2xl font-bold">{title}</h2>
        <div className="flex items-end cursor-pointer">
          <a href={link} className="text-primary text-xl font-bold text-center">
            Ver más
          </a>
          <ChevronRight strokeWidth={2} className="text-primary" />
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
        className="cursor-pointer"
      >
        {data.popularMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <CardMovie
              img_path={movie.poster_path}
              title={movie.title}
              classname="h-[420px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
