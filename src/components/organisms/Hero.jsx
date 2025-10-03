import { useQuery } from "@apollo/client/react";
import { GET_POPULAR_MOVIES } from "../../lib/queries";
import { Heart } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Btn from "../atoms/Btn";
import { useState } from "react";
import Modal from "../atoms/Modal";
import { Trash } from "lucide-react";

export default function Hero() {
  const { loading, error, data } = useQuery(GET_POPULAR_MOVIES);
  const [open, setOpen] = useState(false);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error 😢: {error.message}</p>;

  return (
    <section className="w-full h-screen">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        slidesPerView={1}
        mousewheel={true}
        cssMode={true}
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
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
                <div className="absolute left-0 right-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute left-0 right-0 bottom-0 h-1/3 bg-gradient-to-t from-black/100 to-transparent" />
              </div>
              <div className="absolute left-6 md:left-16 bottom-20 md:bottom-28 z-20 text-primary">
                <div className="flex items-center">
                  <div className="bg-primary/10 border border-secondary rounded px-1.5 flex items-center justify-center min-w-[24px] min-h-[20px]">
                    <span className="text-[10px] font-bold text-secondary text-center">
                      {movie.vote_average?.toFixed(1)}
                    </span>
                  </div>
                </div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
                  {movie.title}
                </h2>
                <p className="mt-4 text-sm md:text-base text-third/90 line-clamp-3 max-w-lg">
                  {movie.overview}
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <Btn
                    name="► Ver trailer"
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-3 bg-secondary text-primary px-5 py-3 rounded-md font-semibold shadow-md cursor-pointer hover:bg-secondary/90 transition"
                  />
                  <Btn
                    icon={<Heart size={20} className="text-secondary" />}
                    onClick={() => {}}
                    className="w-11 h-11 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="text-center w-56">
          <Trash size={56} className="mx-auto text-red-500" />
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this item?
            </p>
          </div>
          <div className="flex gap-4">
            <button className="btn btn-danger w-full">Delete</button>
            <button
              className="btn btn-light w-full"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
